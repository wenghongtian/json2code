import { ComponentType, IReactProgram } from "./types";

export const program: IReactProgram = {
  name: "Test",
  states: {
    count: {
      type: "number",
      initialValue: 0,
    },
  },
  imports: {
    antd: ["Layout"],
    "@ant-design/pro-components": ["ProTable"],
  },
  return: {
    name: "Layout",
    $$type: ComponentType.Layout,
    props: {
      className: { staticValue: "container" },
      count: { dynamicValue: "num" },
    },
    children: [
      {
        name: "ProTable",
        $$type: ComponentType.Atomic,
        props: {
          columns: {
            staticValue: [
              {
                title: "列1",
                dataIndex: "col1",
              },
            ],
          },
        },
      },
    ],
  },
};
