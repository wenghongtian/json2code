import { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import styles from "./index.less";
import { getDataSource } from "./service";
import { Layout } from "antd";

export default () => {
  const [num, setNum] = useState<number>();

  return (
    <Layout className={styles.container}>
      <ProTable
        columns={[
          {
            title: "列1",
            dataIndex: "col1",
          },
        ]}
        options={false}
        request={async (data) => {
          const rsp = await getDataSource(data);
          return {
            success: true,
            data: rsp.data,
            total: rsp.data.total
          }
        }}
      />
    </Layout>
  );
};
