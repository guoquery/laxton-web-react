import React, { useState } from "react";
import TableRow from "./RTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
interface TableProps {
  data: any[];
  columns: any[];
  expandIconAsCell?: boolean;
  expandedRowKeys?: any[];
  defaultExpandedRowKeys?: any[];
  useFixedHeader?: boolean;
  prefixCls?: string;
  bodyStyle?: any;
  style?: any;
  rowKey?: (value: any, i?: any) => string;
  rowClassName?: (value: any, i?: any) => void;
  expandedRowClassName?: (value: any, i?: any) => any;
  childrenColumnName?: string;
  onExpandedRowsChange?: (value: any) => void;
  indentSize?: number;
  onRowClick?: (record: any, index: number) => any;
  columnsPageRange?: any;
  columnsPageSize?: number;
  expandedRowRender?: any;
  className?: string;
  onChange?: (value: any) => any;
}

const RTable = (props: TableProps) => {

  const [sortColumn, setSortColumn] = useState()
  const [sortOrder, setSortOrder] = useState()
  const [currentColumnsPage, setCurrentColumnsPage] = useState(0);
  // const [data, setData] = useState(props.data)
  const data = props.data;
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [columnsPageSize, setColumnsPageSize] = useState(5);
  const [indentSize] = useState(props.indentSize || 15);
  const [childrenColumnName, setChildrenColumnName] = useState(
    "children" || props.childrenColumnName
  );
  const [useFixedHeader] = useState(
    props.useFixedHeader ? props.useFixedHeader : false
  );
  const [expandIconAsCell] = useState(false || props.expandIconAsCell);
  // const [columns] = useState([] || props.columns)
  const [defaultExpandedRowKeys] = useState([] || props.defaultExpandedRowKeys);
  const [prefixCls] = useState(props.prefixCls || "RTable");
  const [columnsPageRange] = useState(0 || props.columnsPageRange);
  const rowKey = (o: { key: any; Id: any }, i?: any) => {
    return o.key || o.Id;
  };

  const keyFn = rowKey || rowKey;

  const getDefaultProps = () => {
    return {
      data: [],
      useFixedHeader: false,
      expandIconAsCell: false,
      columns: [],
      defaultExpandedRowKeys: [],
      rowKey(o: { key: any }) {
        return o.key;
      },
      rowClassName() {
        return "";
      },
      expandedRowClassName() {
        return "";
      },
      onExpandedRowsChange() { },
      prefixCls: "rc-table",
      bodyStyle: {},
      style: {},
      childrenColumnName: "children",
      indentSize: 15,
      columnsPageSize: 5
    };
  };

  const getInitialState = () => {
    // return {
    //   expandedRowKeys: expandedRowKeys || props.defaultExpandedRowKeys,
    //   data: props.data,
    //   currentColumnsPage: 0,
    // };
  };

  const onExpandedRowsChange = (keys: []) => {
    // console.log("getExpandedRows", getExpandedRows(), expandedRowKeys, keys);
    // if (expandedRowKeys.length < 1) {
    setExpandedRowKeys(keys);
    // console.log("getExpandedRows", getExpandedRows(), expandedRowKeys, keys);
    // } else {
    //   setExpandedRowKeys([])
    // }
    getRows();
    if (props.onExpandedRowsChange) {
      props.onExpandedRowsChange(keys);
    }
  };
  const onExpanded = (expanded: any, record: any) => {
    const info = findExpandedRow(record);
    console.log(expanded, record, "onExpanded>>>>>>>", info);
    if (info && !expanded) {
      onRowDestroy(record);
    } else if (!info && expanded) {
      const expandedRows: any = getExpandedRows().concat();
      expandedRows.push(rowKey(record));
      onExpandedRowsChange(expandedRows);
    }
  };
  const onRowDestroy = (record: any) => {
    const expandedRows: any = getExpandedRows().concat();
    let index = -1;
    expandedRows.forEach((r: any, i: number) => {
      if (r === rowKey(record)) {
        index = i;
      }
    });
    if (index !== -1) {
      expandedRows.splice(index, 1);
    }
    onExpandedRowsChange(expandedRows);
  };
  const getExpandedRows = () => {
    return expandedRowKeys;
  };

  /********** thead sort  ********/
  const sortButton = (c: any) => {

    const isAscend = isSortColumn(c) && sortOrder === 'ascend';
    const isDescend = isSortColumn(c) && sortOrder === 'descend';
    const ascend = (
      <span className={`${prefixCls}-column-sorter-up ${isAscend ? 'on' : 'off'}`}>
        <FontAwesomeIcon icon={faCaretUp} size="lg" />
      </span>

    );
    const descend = (
      <span className={`${prefixCls}-column-sorter-down ${isDescend ? 'on' : 'off'}`}>
        <FontAwesomeIcon icon={faCaretDown} size="lg" />
      </span>
    );


    return (
      // className={`${prefixCls}-column-sorter`}
      <div className={classNames(
        `${prefixCls}-column-sorter-inner`,
        ascend && descend && `${prefixCls}-column-sorter-inner-full`,
      )}>
        {ascend}
        {descend}
      </div>
    )
  }

  const isSortColumn = (c: any) => {
    if (!c || !sortColumn) {
      return false;
    }
    return c.title === sortColumn.title
  }
  const onSortClick = (c: any) => {
    if (c.sorter) {
      setSortColumn(c)
      if (isSortColumn(c)) {
        if (!sortOrder) {
          onChange({ dataIndex: c.dataIndex, orderBy: 'ascend' }, 'ascend')
        } else if (sortOrder === 'ascend') {
          onChange({ dataIndex: c.dataIndex, orderBy: 'descend' }, 'descend')
        } else if (sortOrder === 'descend') {
          setSortColumn(undefined)
          onChange({ dataIndex: c.dataIndex, orderBy: undefined })
        }
      } else {
        onChange({ dataIndex: c.dataIndex, orderBy: 'ascend' }, 'ascend')
      }
    }
  }
  const onChange = (obj: any, orderBy?: 'ascend' | 'descend' | undefined) => {
    setSortOrder(orderBy)
    if (props.onChange) {
      props.onChange(obj)
    }
  }
  const renderColumnTitle = (c: any) => {
    const prefixClsClassName: any = classNames(c.className, `${prefixCls}-column`, {
      // [`${prefixCls}-column-has-actions`]: isSortColumn(c),
      // [`${prefixCls}-column-has-actions`]: sortButton || filterDropdown,
      // [`${prefixCls}-column-has-filters`]: filterDropdown,
      [`${prefixCls}-column-has-sorters-active`]: isSortColumn(c) && sortOrder,
      [`${prefixCls}-column-has-sorters`]: c.sorter,
      // [`${prefixCls}-column-sort`]: isSortColumn && sortOrder,
    })

    return (
      <div className={prefixClsClassName} onClick={() => onSortClick(c)} >
        <span>{c.title}</span>
        {c.sorter && < span className={`${prefixCls}-column-sorter`} > {sortButton(c)}</span>}
        {/* {c.sorter && <span>{sortButton}</span>} */}
      </div >
    )

  }
  /********** thead end ********/

  const getThs = () => {
    let ths = [];
    if (props.expandIconAsCell) {
      ths.push({
        key: "rc-table-expandIconAsCell",
        className: `${prefixCls}-expand-icon-th`,
        title: ""
      });
    }
    ths = ths.concat(getCurrentColumns());
    // console.log(ths, '222222')
    return ths.map((c: any, index: number) => {
      if (c.colSpan !== 0) {
        return (
          <th
            key={`${c.key}${index}`}
            colSpan={c.colSpan}
            className={`RTable-thead`}
          >
            {renderColumnTitle(c)}
          </th>
        );
      }
    });
  };

  const getExpandedRow = (
    key: string | any,
    content: React.ReactNode,
    visible: any,
    className: void
  ) => {
    return (
      <tr
        key={key + "-extra-row"}
        style={{ display: visible ? "" : "none" }}
        className={`${prefixCls}-expanded-row ${className}`}
      >
        {props.expandIconAsCell ? (
          <td key="rc-table-expand-icon-placeholder"></td>
        ) : (
            ""
          )}
        <td colSpan={props.columns.length}>{content}</td>
      </tr>
    );
  };

  const getRowsByData = (data: any[], visible: boolean, indent: number) => {
    const columns = getCurrentColumns();
    const propsData = props.data || [];
    const childrenColumnName = props.childrenColumnName;
    const expandedRowRender = props.expandedRowRender;
    const expandIconAsCell = props.expandIconAsCell;
    let rst: any[] = [];
    // const keyFn = rowKey;
    const rowClassName = props.rowClassName;
    const expandedRowClassName = props.expandedRowClassName;
    const needIndentSpaced = propsData.some(record => {
      if (childrenColumnName) {
        return (
          record[childrenColumnName] && record[childrenColumnName].length > 0
        );
      }
    });
    const onRowClick = props.onRowClick;
    // console.log(data, 'data.>>....')
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      const key: string | number | undefined = `${record.Id}-${i}`;
      // console.log("rescord,key", key, record);
      // const key: string | number | undefined = keyFn(record, i);
      const childrenColumn = data[i].children;
      // const childrenColumn = childrenColumnName ? record[childrenColumnName] : '';
      const isRowExpanded: any = RowExpanded(record);
      // console.log(isRowExpanded, 'isRowExpanded》》》》》》》》》》》改')
      let expandedRowContent;
      if (expandedRowRender && isRowExpanded) {
        expandedRowContent = expandedRowRender(record, i);
      }
      const className = rowClassName ? rowClassName(record, i) : "";
      rst.push(
        <TableRow
          indent={indent}
          indentSize={indentSize}
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
          prefixCls={`${prefixCls}-row`}
          childrenColumnName={childrenColumnName}
          columns={columns}
          onRowClick={onRowClick}
          key={key}
        />
      );

      const subVisible = visible && isRowExpanded;

      if (expandedRowContent && isRowExpanded) {
        rst.push(
          getExpandedRow(
            key,
            expandedRowContent,
            subVisible,
            expandedRowClassName ? expandedRowClassName(record, i) : ""
          )
        );
      }
      if (childrenColumn) {
        rst = rst.concat(getRowsByData(childrenColumn, subVisible, indent + 1));
      }
    }
    // console.log(rst, ">>>>>>>>>>>>>>>>>>>>LLLL")
    return rst;
  };

  const getRows = () => {
    return getRowsByData(data, true, 0);
  };
  const getColGroup = () => {
    let cols = [];
    if (props.expandIconAsCell) {
      cols.push(
        <col
          className={`${prefixCls}-expand-icon-col`}
          key="rc-table-expand-icon-col"
        ></col>
      );
    }
    cols = cols.concat(
      props.columns.map(c => {
        return <col key={c.key || c.Id} style={{ width: c.width }}></col>;
      })
    );
    return <colgroup>{cols}</colgroup>;
  };

  const getCurrentColumns = () => {
    const { columns, prefixCls } = props;
    // const { currentColumnsPage } = state;
    if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
      return columns;
    }
    console.log("columns>>>>>>", columns);
    return columns.map((column: any, i: number) => {
      let newColumn = Object.assign({}, column);
      if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
        const pageIndexStart =
          columnsPageRange[0] + currentColumnsPage * columnsPageSize;
        let pageIndexEnd =
          columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
        if (pageIndexEnd > columnsPageRange[1]) {
          pageIndexEnd = columnsPageRange[1];
        }
        if (i < pageIndexStart || i > pageIndexEnd) {
          newColumn.className = newColumn.className || "";
          newColumn.className += " " + prefixCls + "-column-hidden";
        }
        newColumn = wrapPageColumn(
          newColumn,
          i === pageIndexStart,
          i === pageIndexEnd
        );
      }
      return newColumn;
    });
  };

  const getMaxColumnsPage = () => {
    const { columnsPageRange } = props;
    return Math.floor(
      (columnsPageRange[1] - columnsPageRange[0] - 1) / columnsPageSize
    );
  };

  const goToColumnsPage = (currentColumnsPage: number) => {
    const maxColumnsPage = getMaxColumnsPage();
    let page = currentColumnsPage;
    if (page < 0) {
      page = 0;
    }
    if (page > maxColumnsPage) {
      page = maxColumnsPage;
    }
    setCurrentColumnsPage(page);
  };

  const prevColumnsPage = () => {
    goToColumnsPage(currentColumnsPage - 1);
  };

  const nextColumnsPage = () => {
    goToColumnsPage(currentColumnsPage + 1);
  };

  const wrapPageColumn = (column: any, hasPrev: any, hasNext: any) => {
    // const { prefixCls } = props;
    const maxColumnsPage = getMaxColumnsPage();
    let prevHandlerCls = `${prefixCls}-prev-columns-page`;
    if (currentColumnsPage === 0) {
      prevHandlerCls += ` ${prefixCls}-prev-columns-page-disabled`;
    }
    const prevHandler = (
      <span className={prevHandlerCls} onClick={prevColumnsPage}></span>
    );
    let nextHandlerCls = `${prefixCls}-next-columns-page`;
    if (currentColumnsPage === maxColumnsPage) {
      nextHandlerCls += ` ${prefixCls}-next-columns-page-disabled`;
    }
    const nextHandler = (
      <span className={nextHandlerCls} onClick={nextColumnsPage}></span>
    );
    if (hasPrev) {
      column.title = (
        <span>
          {prevHandler}
          {column.title}
        </span>
      );
      column.className =
        (column.className || "") + ` ${prefixCls}-column-has-prev`;
    }
    if (hasNext) {
      column.title = (
        <span>
          {column.title}
          {nextHandler}
        </span>
      );
      column.className =
        (column.className || "") + ` ${prefixCls}-column-has-next`;
    }
    return column;
  };

  const findExpandedRow = (record: any) => {
    // const keyFn = rowKey;
    const currentRowKey = keyFn(record);
    // console.log(getExpandedRows(), "getExpandedRows...");
    const rows = getExpandedRows().filter((i: any) => {
      return i === currentRowKey;
    });
    return rows[0] || null;
  };
  const RowExpanded = (record: any) => {
    return !!findExpandedRow(record);
  };
  // const prefixCls = prefixCls;
  const columns: any = getThs();
  const rows = getRows();
  let className = prefixCls;
  if (props.className) {
    className += " " + props.className;
  }
  if (props.columnsPageRange) {
    className += ` ${prefixCls}-columns-paging`;
  }
  let headerTable;
  let thead: any = (
    <thead className={`${prefixCls}-thead`}>
      <tr>{columns}</tr>
    </thead>
  );
  if (useFixedHeader) {
    headerTable = (
      <div className={`${prefixCls}-header`}>
        <table>
          {getColGroup()}
          {thead}
        </table>
      </div>
    );
    thead = null;
  }
  return (
    <div className={className} style={props.style}>
      {headerTable}
      <div className={`${prefixCls}-body`} style={props.bodyStyle}>
        <table>
          {/* {getColGroup()} */}
          {thead}
          <tbody className={`${prefixCls}-tbody`}>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default RTable;
