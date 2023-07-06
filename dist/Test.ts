import * as React from "react"
import { Layout } from "antd"
import { ProTable } from "@ant-design/pro-components"

export default () => {
  const [count, setCount] = React.useState<number>({ val: 0 })

  return (
    <>
      <Layout className={"container"} count={count}>
        <ProTable columns={[{ title: "列1", dataIndex: "col1" }]} />
      </Layout>
    </>
  )
}
