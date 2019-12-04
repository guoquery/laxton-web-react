import React, { useEffect, useState } from "react";
// import "../dist/index";
// import { Rt, Pagination ,Search} from "../lib/index";
import "../src/assets/index";
import { Rt, Pagination, Search } from "../src/index";
import { api } from "./api.service";
var columns = [
  {
    title: "Role Name",
    dataIndex: "Name",
    width: 100
  },
  {
    title: "Description",
    dataIndex: "Description",
    width: 100
  },
  {
    title: "Action",
    render: function (props: any) {
      return (
        <span onClick={() => console.log(props, "sese>55666>>>>>>>>")}>
          action
        </span>
      );
    }
  }
];
export const TableDemo = (props: any) => {
  let dataType: any[] = [];
  const [data, setData] = useState(dataType);
  const [loadMoreType, setLoadMoreType] = useState('replace');
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10
  });
  const [q, setQ] = useState({
    CurrentPage: 1,
    Filters: { Name: null },
    PageSize: 10
  });
  const getPageList = async (action: "concat" | "replace" = "replace") => {
    console.log("qqqqq>>>>>>>>>", q.CurrentPage);
    const res = await api.post(`api/Role/GetPageList`, q);
    if (res.Result) {
      const Data = res.Data.Items;
      if (action === "replace") {
        setData(Data);
      } else {
        setData([...data, ...Data]);

      }
      setPagination({ total: res.Data.TotalRecord, pageSize: q.PageSize, current: q.CurrentPage });
    }
  };
  useEffect(() => {
    getPageList((loadMoreType as ('concat' | 'replace')));
    return () => { };
  }, [q]);

  const OnTableChange = (e: any) => {
    console.log(e, "e>>>>>>>>>", q.CurrentPage);
    const CurrentPage = e.data.page;
    switch (e.type) {
      case 'pagination':
        setQ({
          CurrentPage,
          Filters: q.Filters,
          PageSize: e.data.pageSize
        });
        break;
      case 'scroll':
        setLoadMoreType('concat')
        setQ({
          CurrentPage,
          Filters: q.Filters,
          PageSize: e.data.pageSize
        });
        break;
    }

  };
  const OnRow = (record: any, index?: number) => {
    console.log(record, index, "demo....");
    // return {
    //   onClick: event:any => {}, // 点击行
    //   onDoubleClick: event => {},
    //   onContextMenu: event => {},
    //   onMouseEnter: event => {}, // 鼠标移入行
    //   onMouseLeave: event => {}
    // };
  };
  const OnChange = (e: any) => {
    switch (e.type) {
      case 'reset':
        // setLoadMoreType('replace')
        break;
      case 'search':

        break;
    }
    setLoadMoreType('replace')
    setQ({ ...q, ...{ CurrentPage: 1, Filters: e.data } })
  }

  const searchConfig: object[] = [
    {
      label: ' Role Name',
      value: 'Name'
    },
    {
      label: 'Status',
      value: 'Status'
    },
    {
      label: ' Role Name',
      value: 'Name'
    },
    {
      label: 'Status',
      value: 'Status'
    },
    {
      label: ' Role Name',
      value: 'Name'
    },
    {
      label: 'Status',
      value: 'Status'
    },
    {
      label: ' Role Name',
      value: 'Name'
    },
    {
      label: 'Status',
      value: 'Status'
    }
  ]

  return (
    <div
      style={{ height: "500px", overflowY: "scroll" }}
      data-testid="scrollMain"
    >
      {/* <RTable columns={columns}
        data={data}
        className="RTable"></RTable> */}
      <Search onChange={(e: any) => OnChange(e)} searchConfig={searchConfig}></Search>

      <Rt
        columns={columns}
        dataSource={data}
        className="RTable"
        pagination={pagination}
        // paginationType={"common"}
        onChange={(e: any) => OnTableChange(e)}
        onRow={(record: any, index?: number) => OnRow(record, index)}
      ></Rt>
    </div>
  );
};
