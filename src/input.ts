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
    tag: "Layout",
    $$type: ComponentType.Layout,
    props: {
      className: { staticValue: "container" },
      count: { dynamicValue: "count" },
    },
    children: [
      {
        tag: "ProTable",
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
