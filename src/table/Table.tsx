
import React, { useState } from 'react';
import TableRow from './TableRow';
interface TableProps {
  data: any[],
  columns: any[],
  expandIconAsCell?: boolean,
  expandedRowKeys?: any[],
  defaultExpandedRowKeys?: any[],
  useFixedHeader?: boolean,
  prefixCls?: string,
  bodyStyle?: any,
  style?: any,
  rowKey?: (value: any, i?: any) => string,
  rowClassName?: (value: any, i?: any) => void,
  expandedRowClassName?: (value: any, i?: any) => any,
  childrenColumnName?: string,
  onExpandedRowsChange?: (value: any) => void,
  indentSize?: number,
  onRowClick?: (value: any) => void,
  columnsPageRange?: any,
  columnsPageSize?: number,
  expandedRowRender?: any,
  className?: string
}

const RTable = (props: TableProps) => {
  const [currentColumnsPage, setCurrentColumnsPage] = useState(0)
  const [data, setData] = useState(props.data)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [columnsPageSize, setColumnsPageSize] = useState(5)
  const [indentSize] = useState(15)
  const [childrenColumnName, setChildrenColumnName] = useState('children' || props.childrenColumnName)
  const [useFixedHeader] = useState(false || props.useFixedHeader)
  const [expandIconAsCell] = useState(false || props.expandIconAsCell)
  // const [columns] = useState([] || props.columns)
  const [defaultExpandedRowKeys] = useState([] || props.defaultExpandedRowKeys)
  // const [prefixCls] = useState('rc-table' || props.prefixCls)
  const [columnsPageRange] = useState(0 || props.columnsPageRange)
  const rowKey = (o: { key: any; }, i?: any) => {
    return o.key;
  }

  const keyFn = rowKey || props.rowKey

  const getDefaultProps = () => {
    return {
      data: [],
      useFixedHeader: false,
      expandIconAsCell: false,
      columns: [],
      defaultExpandedRowKeys: [],
      rowKey(o: { key: any; }) {
        return o.key;
      },
      rowClassName() {
        return '';
      },
      expandedRowClassName() {
        return '';
      },
      onExpandedRowsChange() {
      },
      prefixCls: 'rc-table',
      bodyStyle: {},
      style: {},
      childrenColumnName: 'children',
      indentSize: 15,
      columnsPageSize: 5,
    };
  }

  const getInitialState = () => {
    // return {
    //   expandedRowKeys: expandedRowKeys || props.defaultExpandedRowKeys,
    //   data: props.data,
    //   currentColumnsPage: 0,
    // };
  }

  const componentWillReceiveProps = (nextProps: { data: any; expandedRowKeys: any; }) => {
    if ('data' in nextProps) {
      setData(nextProps.data)
    }
    if ('expandedRowKeys' in nextProps) {
      setExpandedRowKeys(nextProps.expandedRowKeys)
    }
  }

  const onExpandedRowsChange = (expandedRowKeys: any[]) => {
    if (!expandedRowKeys) {
      setExpandedRowKeys(expandedRowKeys)
    }
    if (props.onExpandedRowsChange) {
      props.onExpandedRowsChange(expandedRowKeys);
    }
  }

  const onExpanded = (expanded: any, record: any) => {
    const info = findExpandedRow(record);
    if (info && !expanded) {
      onRowDestroy(record);
    } else if (!info && expanded) {
      const expandedRows: any = getExpandedRows().concat();
      if (props.rowKey) {
        expandedRows.push(props.rowKey(record));
      }
      onExpandedRowsChange(expandedRows);
    }
  }

  const onRowDestroy = (record: any) => {
    const expandedRows = getExpandedRows().concat();
    const rowKey = props.rowKey ? props.rowKey(record) : undefined;
    let index = -1;
    expandedRows.forEach((r, i) => {
      if (r === rowKey) {
        index = i;
      }
    });
    if (index !== -1) {
      expandedRows.splice(index, 1);
    }
    onExpandedRowsChange(expandedRows);
  }

  const getExpandedRows = () => {
    return expandedRowKeys;
  }

  const getThs = () => {
    let ths = [];
    if (props.expandIconAsCell) {
      ths.push({
        key: 'rc-table-expandIconAsCell',
        className: `${props.prefixCls}-expand-icon-th`,
        title: '',
      });
    }
    console.log(ths, props.columns, '>>>>>>>>>>>>>>>>D')
    ths = ths.concat(getCurrentColumns());
    console.log(ths, columns, '>>>>>>>>>>>>>>>>D')
    return ths.map((c: any) => {
      if (c.colSpan !== 0) {
        return <th key={c.key} colSpan={c.colSpan} className={c.className || ''}>{c.title}</th>;
      }
    });
  }

  const getExpandedRow = (key: string | any, content: React.ReactNode, visible: any, className: void) => {
    const prefixCls = props.prefixCls;
    return (<tr key={key + '-extra-row'} style={{ display: visible ? '' : 'none' }} className={`${prefixCls}-expanded-row ${className}`}>
      {props.expandIconAsCell ? <td key="rc-table-expand-icon-placeholder"></td> : ''}
      <td colSpan={props.columns.length}>
        {content}
      </td>
    </tr>);
  }

  const getRowsByData = (data: any[], visible: boolean, indent: number) => {

    const columns = getCurrentColumns();
    const childrenColumnName = props.childrenColumnName;
    const expandedRowRender = props.expandedRowRender;
    const expandIconAsCell = props.expandIconAsCell;
    let rst: any[] = [];
    // const keyFn = props.rowKey;
    const rowClassName = props.rowClassName;
    const expandedRowClassName = props.expandedRowClassName;
    const needIndentSpaced = props.data.some(record => { if (childrenColumnName) { return record[childrenColumnName] && record[childrenColumnName].length > 0 } });
    const onRowClick = props.onRowClick;
    console.log(data, 'data.>>....')
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      const key: string | number | undefined = keyFn(record, i);
      const childrenColumn = childrenColumnName ? record[childrenColumnName] : '';
      const isRowExpanded: any = RowExpanded(record);
      let expandedRowContent;
      if (expandedRowRender && isRowExpanded) {
        expandedRowContent = expandedRowRender(record, i);
      }
      const className = rowClassName ? rowClassName(record, i) : '';
      rst.push(<TableRow
        indent={indent}
        indentSize={props.indentSize}
        needIndentSpaced={needIndentSpaced}
        className={className}
        record={record}
        expandIconAsCell={expandIconAsCell}
        onDestroy={onRowDestroy}
        index={i}
        visible={visible}
        onExpand={onExpanded}
        expandable={childrenColumn || expandedRowRender}
        expanded={isRowExpanded}
        prefixCls={`${props.prefixCls}-row`}
        childrenColumnName={childrenColumnName}
        columns={columns}
        onRowClick={onRowClick}
        key={key} />);

      const subVisible = visible && isRowExpanded;

      if (expandedRowContent && isRowExpanded) {
        rst.push(getExpandedRow(key, expandedRowContent, subVisible, (expandedRowClassName ? expandedRowClassName(record, i) : '')));
      }
      if (childrenColumn) {
        rst = rst.concat(getRowsByData(childrenColumn, subVisible, indent + 1));
      }
    }
    console.log(rst, ">>>>>>>>>>>>>>>>>>>>LLLL")
    return rst;
  }

  const getRows = () => {
    return getRowsByData(data, true, 0);
  }
  const getColGroup = () => {
    let cols = [];
    if (props.expandIconAsCell) {
      cols.push(<col className={`${props.prefixCls}-expand-icon-col`} key="rc-table-expand-icon-col"></col>);
    }
    cols = cols.concat(props.columns.map((c) => {
      return <col key={c.key} style={{ width: c.width }}></col>;
    }));
    return <colgroup>{cols}</colgroup>;
  }

  const getCurrentColumns = () => {
    const { columns, prefixCls } = props;
    // const { currentColumnsPage } = state;
    if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
      return columns;
    }
    return columns.map((column: any, i: number) => {
      let newColumn = Object.assign({}, column);
      if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
        const pageIndexStart = columnsPageRange[0] + currentColumnsPage * columnsPageSize;
        let pageIndexEnd = columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
        if (pageIndexEnd > columnsPageRange[1]) {
          pageIndexEnd = columnsPageRange[1];
        }
        if (i < pageIndexStart || i > pageIndexEnd) {
          newColumn.className = newColumn.className || '';
          newColumn.className += ' ' + prefixCls + '-column-hidden';
        }
        newColumn = wrapPageColumn(newColumn, (i === pageIndexStart), (i === pageIndexEnd));
      }
      return newColumn;
    });
  }

  const getMaxColumnsPage = () => {
    const { columnsPageRange } = props;
    return Math.floor((columnsPageRange[1] - columnsPageRange[0] - 1) / columnsPageSize);
  }

  const goToColumnsPage = (currentColumnsPage: number) => {
    const maxColumnsPage = getMaxColumnsPage();
    let page = currentColumnsPage;
    if (page < 0) {
      page = 0;
    }
    if (page > maxColumnsPage) {
      page = maxColumnsPage;
    }
    setCurrentColumnsPage(page)
  }

  const prevColumnsPage = () => {
    goToColumnsPage(currentColumnsPage - 1);
  }

  const nextColumnsPage = () => {
    goToColumnsPage(currentColumnsPage + 1);
  }

  const wrapPageColumn = (column: any, hasPrev: any, hasNext: any) => {
    // const { prefixCls } = props;
    const maxColumnsPage = getMaxColumnsPage();
    let prevHandlerCls = `${prefixCls}-prev-columns-page`;
    if (currentColumnsPage === 0) {
      prevHandlerCls += ` ${prefixCls}-prev-columns-page-disabled`;
    }
    const prevHandler = <span className={prevHandlerCls} onClick={prevColumnsPage}></span>;
    let nextHandlerCls = `${prefixCls}-next-columns-page`;
    if (currentColumnsPage === maxColumnsPage) {
      nextHandlerCls += ` ${prefixCls}-next-columns-page-disabled`;
    }
    const nextHandler = <span className={nextHandlerCls} onClick={nextColumnsPage}></span>;
    if (hasPrev) {
      column.title = <span>{prevHandler}{column.title}</span>;
      column.className = (column.className || '') + ` ${prefixCls}-column-has-prev`;
    }
    if (hasNext) {
      column.title = <span>{column.title}{nextHandler}</span>;
      column.className = (column.className || '') + ` ${prefixCls}-column-has-next`;
    }
    return column;
  }

  const findExpandedRow = (record: any) => {
    // const keyFn = props.rowKey;
    const currentRowKey = keyFn(record);
    const rows = getExpandedRows().filter((i) => {
      return i === currentRowKey;
    });
    return rows[0] || null;
  }

  const RowExpanded = (record: any) => {
    return !!findExpandedRow(record);
  }



  const prefixCls = props.prefixCls;
  const columns: any = getThs();
  const rows = getRows();
  let className = props.prefixCls;
  if (props.className) {
    className += ' ' + props.className;
  }
  if (props.columnsPageRange) {
    className += ` ${prefixCls}-columns-paging`;
  }
  let headerTable;
  let thead: any = (<thead className={`${prefixCls}-thead`}>
    <tr>
      {columns}
    </tr>
  </thead>);
  if (props.useFixedHeader) {
    headerTable = (<div className={`${prefixCls}-header`}>
      <table>
        {getColGroup()}
        {thead}
      </table>
    </div>);
    thead = null;
  }
  return (
    <div className={className} style={props.style}>
      {headerTable}
      <div className={`${prefixCls}-body`} style={props.bodyStyle}>
        <table>
          {getColGroup()}
          {thead}
          <tbody className={`${prefixCls}-tbody`}>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default RTable;
