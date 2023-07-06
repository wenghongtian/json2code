export default class Value {
  constructor(private val: any) {}
  toString() {
    switch (typeof this.val) {
      case "string":
        return `'${this.val}'`;
      case "number":
        return `${this.val}`;
      case "bigint":
        return `${this.val}`;
      case "boolean":
        return `${this.val ? "true" : "false"}`;
      case "undefined":
        return "";
      case "object": {
        if (this.val === null) {
          return "null";
        } else if (Array.isArray(this.val)) {
          return this.parseArr();
        } else {
          return this.parseObj();
        }
      }

      case "function":
        return this.val.toString();
    }
  }

  private parseArr() {
    let str = "[";
    this.val.forEach((item: any) => {
      str += new Value(item).toString() + ",";
    });
    str += "]";
    return str;
  }

  private parseObj() {
    let str = "{";
    Object.keys(this.val).forEach((key) => {
      str += `"${key}": `;
      str += new Value(this.val[key]).toString();
      str += ",\n";
    });
    str += "}";
    return str;
  }
}
