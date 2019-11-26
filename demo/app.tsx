import React from 'react';
import ReactDOM from 'react-dom';
import "../src/assets/table.less";
import { RTable } from '../src/index';

var columns2 = [
  { title: '表头1', dataIndex: 'a', colSpan: 2, key: 'a', width: 100 },
  {
    id: '123', title: '表头2', dataIndex: 'b', colSpan: 0, key: 'b', width: 100, render: function (o: any, row: any, index: number) {
      let obj: any = {
        children: o,
        props: {}
      }
      if (index === 0) {
        obj.props.rowSpan = 2;
      }
      if (index === 1) {
        obj.props.rowSpan = 0;
      }
      return obj;
    }
  },
  { title: '表头3', dataIndex: 'c', key: 'c', width: 200 },
  {
    title: '操作', dataIndex: '', key: 'd', render: function () {
      return <a href="#">操作</a>
    }
  }
];
var data2 = [{ a: '123', key: '1' }, { a: 'cdd', b: 'edd', key: '2' }, { a: '1333', c: 'eee', d: 2, key: '3' }];
class App extends React.Component {

  render() {
    return (
      <div>
        demo
        <RTable columns={columns2}
          data={data2}
          className="rc-table"></RTable>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root')); //app即为挂载点，在模板html中
