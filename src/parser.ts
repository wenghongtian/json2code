import { IComponent } from "./types";
import Module from "./scope-module";
import * as prettier from "prettier";

export default function parser(sourceJson: IComponent) {
  const module = new Module();
  if (sourceJson.scope) {
    Object.entries(sourceJson.scope).map(([key, value]) => {
      module.addVariable(key, value.type, value.initialValue);
    });
  }
  return prettier.format(module.code(), { semi: false, parser: "babel-ts" });
}
