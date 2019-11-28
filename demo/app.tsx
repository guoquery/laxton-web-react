import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import "../dist/index";
// import { Rt } from "../lib/index";
import "../src/assets/table.less";
import { Rt } from "../src/index";
import { api } from "./api.service";

var columns = [
  {
    title: "Role Name",
    key: "Name",
    width: 100
  },
  {
    title: "Description",
    key: "Description",
    width: 100
  },
  {
    title: "Action",
    render: function(props: any) {
      return (
        <span onClick={() => console.log(props, "sese>55666>>>>>>>>")}>
          action
        </span>
      );
    }
  }
];
const App = (props: any) => {
  let dataType: any[] = [];
  const [data, setData] = useState(dataType);
  const [haveMoreData, setMoreData] = useState(true);
  const [pagination, setPagination] = useState();
  const [q, setQ] = useState({
    CurrentPage: 1,
    Filters: { Name: null },
    PageSize: 10
  });
  // const q = {
  //   CurrentPage: 1,
  //   Filters: { Name: null },
  //   PageSize: 10
  // };
  const getPageList = async (action: "concat" | "replace" = "concat") => {
    console.log("qqqqq>>>>>>>>>", q.CurrentPage);
    const res = await api.post(`api/Role/GetPageList`, q);
    if (res.Result) {
      const Data = res.Data.Items;
      if (action === "replace") {
        setData(Data);
      } else {
        setData([...data, ...Data]);
      }
      if (Data.length < q.PageSize) {
        setMoreData(false);
      }
      setPagination({ total: res.Data.TotalRecord });
    }
  };
  useEffect(() => {
    getPageList();
    return () => {};
  }, [q]);

  const OnTableChange = (e: any) => {
    console.log(e, "e>>>>>>>>>", q.CurrentPage);
    if (haveMoreData) {
      const CurrentPage = q.CurrentPage + 1;
      setQ({
        CurrentPage,
        Filters: { Name: null },
        PageSize: 10
      });
      // getPageList("concat");
      setTimeout(() => {}, 2000);
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

  return (
    <div>
      {/* <RTable columns={columns}
        data={data}
        className="RTable"></RTable> */}
      <Rt
        columns={columns}
        dataSource={data}
        className="RTable"
        pagination={pagination}
        onChange={e => OnTableChange(e)}
        onRow={(record: any, index?: number) => OnRow(record, index)}
      ></Rt>
    </div>
  );
};
// class App2 extends React.Component {

//   async componentDidMount() {
//     const res = await api.post(`api/Role/GetPageList`, q);
//     if (res.Result) {
//       setData(res.Data.Items);
//     }
//   }

//   render() {
//     return (
//       <div>
//         demo
//         <RTable columns={columns2}
//           data={data2}
//           className="RTable"></RTable>
//         <Rt columns={columns2}
//           dataSource={data2}
//           className="RTable"></Rt>
//       </div>
//     );
//   }

// }

ReactDOM.render(<App />, document.getElementById("root")); //app即为挂载点，在模板html中
