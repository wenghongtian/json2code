import axios from "axios";

export function getDataSource(data: any) {
  return axios("url", {
    method: "POST",
    data,
  });
}
