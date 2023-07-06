import { IReactProgram } from "./types";
import Module from "./Program";
import * as prettier from "prettier";

export default function parser(programAst: IReactProgram) {
  const module = new Module(programAst);
  
  return prettier.format(module.code(), { semi: false, parser: "babel-ts" });
}
