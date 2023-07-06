import { program } from "./input";
import parser from "./parser";
import * as fs from "fs";
import * as path from "path";

const root = process.cwd();
const dist = path.join(root, "dist");

async function main() {
  const code = await parser(program);
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
  fs.writeFile(`${dist}/${program.name}.tsx`, code, (err) => {});
}
main();
