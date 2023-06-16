import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { extractPageCount } from "../../services/Utils";
import DataTablePaginationFooter from "./DataTablePaginationFooter";

interface Props {
  countPerPage: number;
  searchText: String;
}

interface VehicleType {
  key: React.Key;
  name: string;
  cost_in_credits: number;
  length: number;
}

const columns: ColumnsType<VehicleType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "Cost in credits",
    dataIndex: "cost_in_credits",
    width: 150,
  },
  {
    title: "Length",
    dataIndex: "length",
    width: 100,
  },
];

const initialLoadUrl = "https://swapi.dev/api/vehicles/?page=1";
const searchUrl = "https://swapi.dev/api/vehicles/?search=";

const DataTable: React.FC<Props> = (props) => {
  const [data, setData] = useState<VehicleType[]>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [pagination, setPagination] = useState<number[]>([]);

  function fetchData(url: string) {
    setLoading(true); //mark start loading
    fetch(url)
      .then((res) => res.json())
      .then(({ count, next, previous, results }) => {
        setTotalCount(count);
        setNextUrl(next);
        setPrevUrl(previous);
        setData(results);
        setPagination(
          extractPageCount(previous, next, count, props.countPerPage)
        );

        setLoading(false); //mark finish loading
      });
  }

  useEffect(() => {
    fetchData(initialLoadUrl);
  }, []);

  useEffect(() => {
    fetchData(searchUrl + props.searchText);
  }, [props.searchText]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: loading,
        }}
      />

      <DataTablePaginationFooter
        {...{
          pagination: pagination,
          totalCount: totalCount,
          prevUrl: prevUrl,
          nextUrl: nextUrl,
          fetchData: fetchData,
        }}
      />
    </div>
  );
};

export default DataTable;
