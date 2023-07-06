import { ComponentType, IReactComponent } from "./types";
import Value from "./value";

export default class ReactComponent {
  tag: string;
  props: Record<string, Value> = {};
  constructor(private ast: IReactComponent) {
    this.tag = ast.tag;
    if (ast.props) {
      Object.entries(ast.props).forEach(([key, prop]) => {
        this.props[key] =
          "staticValue" in prop
            ? new Value(prop.staticValue)
            : Value.raw(prop.dynamicValue);
      });
    }
  }

  private props2Code() {
    let code = "";
    Object.entries(this.props).forEach(([key, prop]) => {
      code += `${key}={${prop.toString()}}\n`;
    });
    return code;
  }

  code() {
    const { tag, $$type, children } = this.ast;
    const propsCode = this.props2Code();

    if ($$type === ComponentType.Atomic) {
      return `<${tag} ${propsCode} />`;
    }

    let childrenCode = "";
    if (children) {
      children.forEach((child) => {
        const childCode = new ReactComponent(child).code();
        childrenCode += childCode + "\n";
      });
    }

    return `
    <${tag} ${propsCode}>
      ${childrenCode}
    </${tag}>
    `;
  }
}
