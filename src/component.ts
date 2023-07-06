import ScopeModule from "./scope-module";

interface ComponentOptions {
  from?: string;
  props?: Record<string, any>;
  type: string;
}

export default class Component {
  props: Record<string, any> = {};
  constructor(module: ScopeModule, options: Partial<ComponentOptions>) {
    if (options.from) {
      module.addImports(options.from, options.type!);
    }
    this.props = options.props || {};
  }
}
