import Value from "./value";

export default class ScopeModule {
  imports: Record<string, Set<string>> = {};
  props: Record<string, { type: string; initialValue: string }> = {};
  scope: Record<string, { type: string; initialValue?: string }> = {};
  childrenContent: string = "";

  code() {
    return `
import * as React from 'react';
${this.parseImports()}

export default () => {
  ${this.parseScope()}

  return (<>
    ${this.childrenContent}
  </>);
}
    `;
  }

  addVariable(name: string, type: string, initialValue?: string) {
    this.scope[name] = {
      type,
      initialValue,
    };
  }

  addImports(from: string, component: string) {
    const set = (this.imports[from] = this.imports[from] || new Set());
    set.add(component);
  }

  private parseScope() {
    let code = "";
    Object.entries(this.scope).forEach(([name, { type, initialValue }]) => {
      initialValue = new Value(initialValue).toString();
      code += `
const [${name}, set${name.replace(
        name[0],
        name[0].toUpperCase()
      )}] = React.useState<${type}>(${initialValue});\n
      `;
    });
    return code;
  }

  private parseImports() {
    const imports = Object.entries(this.imports).map(([from, keysSet]) => {
      let items: string[] = [];
      keysSet.forEach((item) => items.push(item));
      let itemsStr = items.join(", ");
      return `import {${itemsStr}} from '${from}'\n`;
    });
    return imports;
  }
}
