import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "../dist/index";
import { Rt } from '../lib/index';
// import '../src/assets/table.less';
// import { Rt } from '../src/index';
import { api } from './api.service';

var columns2 = [
  { title: '表头1', dataIndex: 'a', colSpan: 1, Id: 'a', width: 100 },
  {
    id: '123', title: '表头2', dataIndex: 'b', colSpan: 1, Id: 'b', width: 100, render: function (o: any, row: any, index: number) {
      let obj: any = {
        children: o,
        props: {}
      }
      if (index === 0) {
        obj.props.rowSpan = 1;
      }
      if (index === 1) {
        obj.props.rowSpan = 1;
      }
      return obj;
    }
  },
  { title: '表头3', dataIndex: 'c', Id: 'c', width: 200, },
  {
    title: '操作', dataIndex: '', Id: 'd', render: function () {
      return <a href="#">操作</a>
    }
  }
];
var data2 = [{ a: '123', Id: '1' }, {
  a: 'cdd', b: 'edd', Id: '2',
  children: [
    {
      Id: 11,
      a: 'John Brown',
      b: 42,
      address: 'New York No. 2 Lake Park',
    },
    {
      Id: 12,
      a: 'John Brown jr.',
      b: 30,
      c: 'New York No. 3 Lake Park',
      children: [
        {
          Id: 121,
          a: 'Jimmy Brown',
          b: 16,
          c: 'New York No. 3 Lake Park',
        },
      ],
    },
    {
      Id: 13,
      a: 'Jim Green sr.',
      b: 72,
      c: 'London No. 1 Lake Park',
      children: [
        {
          Id: 131,
          a: 'Jim Green',
          b: 42,
          c: 'London No. 2 Lake Park',
          children: [
            {
              Id: 1311,
              a: 'Jim Green jr.',
              b: 25,
              c: 'London No. 3 Lake Park',
            },
            {
              Id: 1312,
              a: 'Jimmy Green sr.',
              b: 18,
              c: 'London No. 4 Lake Park',
            },
          ],
        },
      ],
    },
  ],
}, { a: '1333', c: 'eee', d: 2, Id: '3' }];

var columns = [
  {
    title: 'Role Name', key: 'Name', width: 100
  },
  {
    title: 'Description', key: 'Description', width: 100
  },
  {
    title: 'Action', render: function (props: any) {
      return <span onClick={() => console.log(props, 'sese>55666>>>>>>>>')}>action</span>
    }
  }
];
const App = (props: any) => {

  const [data, setData] = useState([])
  const q = {
    CurrentPage: 1,
    Filters: { Name: null },
    PageSize: 10
  };
  const getPageList = async () => {
    const res = await api.post(`api/Role/GetPageList`, q);
    if (res.Result) {
      setData(res.Data.Items);
    }
  }
  useEffect(() => {
    getPageList();
    return () => {

    };
  }, [])
  return (
    <div>
      demo
      {/* <RTable columns={columns}
        data={data}
        className="RTable"></RTable> */}
      <Rt columns={columns}
        dataSource={data}
        className="RTable"></Rt>
    </div>
  );
}
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

ReactDOM.render(<App />, document.getElementById('root')); //app即为挂载点，在模板html中
