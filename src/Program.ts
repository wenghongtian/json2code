import ReactComponent from "./ReactComponent";
import { IReactComponent, IReactProgram } from "./types";
import Value from "./value";

export default class Program {
  imports: Record<string, string[]> = {};
  props: Record<string, { type: string; initialValue: string }> = {};
  variables: Record<string, { type: string; initialValue: Value }> = {};
  return: IReactComponent;
  constructor(private ast: IReactProgram) {
    if (ast.states) {
      Object.entries(ast.states!).forEach(([stateName, stateValue]) => {
        this.addVariable(
          stateName,
          stateValue.type,
          new Value(stateValue.initialValue)
        );
      });
    }
    if (ast.imports) {
      Object.entries(ast.imports!).forEach(([from, values]) => {
        this.addImports(from, ...values);
      });
    }
    this.return = ast.return;
  }

  code() {
    return `
import * as React from 'react';
${this.imports2Code()}

export default () => {
  ${this.variables2Code()}

  return (<>
    ${this.return2Code()}
  </>);
}
    `;
  }

  addVariable(name: string, type: string, initialValue: Value) {
    if (this.variables[name]) {
      throw Error("不能重复定义变量");
    }
    this.variables[name] = {
      type,
      initialValue,
    };
  }

  addImports(from: string, ...component: string[]) {
    const imports = (this.imports[from] = this.imports[from] || []);
    imports.push(...component);
  }

  private variables2Code() {
    let code = "";
    Object.entries(this.variables).forEach(([name, { type, initialValue }]) => {
      initialValue = initialValue!.toString();
      code += `
const [${name}, set${name.replace(
        name[0],
        name[0].toUpperCase()
      )}] = React.useState<${type}>(${initialValue});\n
      `;
    });
    return code;
  }

  private imports2Code() {
    const imports = Object.entries(this.imports).map(([from, keysSet]) => {
      let items: string[] = [];
      keysSet.forEach((item) => items.push(item));
      let itemsStr = items.join(", ");
      return `import {${itemsStr}} from '${from}';\n`;
    });
    return imports.join("");
  }

  private return2Code() {
    const returnCode = new ReactComponent(this.return).code();
    return returnCode;
  }
}
