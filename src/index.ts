import { data } from "./input";
import parser from "./parser";
import * as fs from "fs";
import * as path from "path";
import Value from "./value";

const root = process.cwd();
const dist = path.join(root, "dist");

data.forEach(async (src) => {
  const code = await parser(src);
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
  fs.writeFile(`${dist}/${src.id}.ts`, code, (err) => {
    console.log(err);
  });
});

console.log(new Value({ a: { c: 1, d: ["1", "2", "3"] }, b: 2 }).toString());
