import React, { useEffect, useState } from "react";
import "./App.css";

import { Space } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import { Table, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useDebouncedCallback } from "use-debounce";

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

const initalSearchText: string = "Search vehicles";
const countPerPage: number = 10;

const App: React.FC = () => {
  const [data, setData] = useState<VehicleType[]>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");
  const [searchText, setSearchText] = useState(initalSearchText);
  const [pagination, setPagination] = useState<number[]>([]);

  const debounce = useDebouncedCallback((newText) => {
    setSearchText(newText);
  }, 500); //500ms wait

  function fetchData(url: string) {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(({ count, next, previous, results }) => {
        setTotalCount(count);
        setNextUrl(next);
        setPrevUrl(previous);
        setData(results);
        setPagination(extractPageCount(previous, next, count));

        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData("https://swapi.dev/api/vehicles/?page=1");
  }, []);

  useEffect(() => {
    fetchData("https://swapi.dev/api/vehicles/?search=" + searchText);
  }, [searchText]);

  return (
    <div className="App">
      <h2>Vehicles</h2>

      <input
        placeholder={initalSearchText}
        onChange={(e) => debounce(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
        loading={{ indicator: <div><Spin /></div>, spinning:loading}}
      />

      <Space>
        {pagination[0]} - {pagination[1]} of {totalCount}
        <LeftOutlined onClick={() => fetchData(prevUrl)} style={(prevUrl != null) ? {color: "#0000FF"} : {color: "#808080"}} />
        <RightOutlined onClick={() => fetchData(nextUrl)} style={(nextUrl != null) ? {color: "#0000FF"} : {color: "#808080"}} />
      </Space>
    </div>
  );
};

function extractPageCount(prevUrl: string|null, nextUrl: string|null, count: number) {
  if(prevUrl == null && nextUrl == null) {
    return [0, count]; //no records found
  }

  if (prevUrl == null) {
    //first page
    return [1, 10];
  }
  let prevPage: number = parseInt(prevUrl.substring(prevUrl.length - 1));

  if (nextUrl == null) {
    //last page
    return [prevPage * countPerPage, count];
  }
  let nextPage: number = parseInt(nextUrl.substring(prevUrl.length - 1));

  return [prevPage * countPerPage, (nextPage - 1) * countPerPage];
}

export default App;
export const ExtractPageCount = extractPageCount;