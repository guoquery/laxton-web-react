import React from 'react';
import ReactDOM from 'react-dom';
import "../src/assets/table.less";
import { RTable } from '../src/index';

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
      name: 'John Brown',
      age: 42,
      address: 'New York No. 2 Lake Park',
    },
    {
      key: 12,
      name: 'John Brown jr.',
      age: 30,
      address: 'New York No. 3 Lake Park',
      children: [
        {
          key: 121,
          name: 'Jimmy Brown',
          age: 16,
          address: 'New York No. 3 Lake Park',
        },
      ],
    },
    {
      key: 13,
      name: 'Jim Green sr.',
      age: 72,
      address: 'London No. 1 Lake Park',
      children: [
        {
          key: 131,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park',
          children: [
            {
              key: 1311,
              name: 'Jim Green jr.',
              age: 25,
              address: 'London No. 3 Lake Park',
            },
            {
              key: 1312,
              name: 'Jimmy Green sr.',
              age: 18,
              address: 'London No. 4 Lake Park',
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
