import React from 'react';
import ReactDOM from 'react-dom';
import { RTable } from '../lib/index';
import "../src/assets/table.less";

var columns2 = [
  { title: '表头1', dataIndex: 'a', colSpan: 1, key: 'a', width: 100 },
  {
    id: '123', title: '表头2', dataIndex: 'b', colSpan: 1, key: 'b', width: 100, render: function (o: any, row: any, index: number) {
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
  { title: '表头3', dataIndex: 'c', key: 'c', width: 200, },
  {
    title: '操作', dataIndex: '', key: 'd', render: function () {
      return <a href="#">操作</a>
    }
  }
];
var data2 = [{ a: '123', key: '1' }, {
  a: 'cdd', b: 'edd', key: '2',
  children: [
    {
      key: 11,
      a: 'John Brown',
      b: 42,
      address: 'New York No. 2 Lake Park',
    },
    {
      key: 12,
      a: 'John Brown jr.',
      b: 30,
      c: 'New York No. 3 Lake Park',
      children: [
        {
          key: 121,
          a: 'Jimmy Brown',
          b: 16,
          c: 'New York No. 3 Lake Park',
        },
      ],
    },
    {
      key: 13,
      a: 'Jim Green sr.',
      b: 72,
      c: 'London No. 1 Lake Park',
      children: [
        {
          key: 131,
          a: 'Jim Green',
          b: 42,
          c: 'London No. 2 Lake Park',
          children: [
            {
              key: 1311,
              a: 'Jim Green jr.',
              b: 25,
              c: 'London No. 3 Lake Park',
            },
            {
              key: 1312,
              a: 'Jimmy Green sr.',
              b: 18,
              c: 'London No. 4 Lake Park',
            },
          ],
        },
      ],
    },
  ],
}, { a: '1333', c: 'eee', d: 2, key: '3' }];
class App extends React.Component {

  render() {
    return (
      <div>
        demo
        <RTable columns={columns2}
          data={data2}
          className="RTable"></RTable>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root')); //app即为挂载点，在模板html中
