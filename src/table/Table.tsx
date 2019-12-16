/* eslint-disable prefer-spread */
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import { RTable } from ".";
import { Pagination } from "../Pagination/Pagination";
import { render } from "react-dom";
import { Checkbox } from "../index";
// import { TableProps } from './interface';
import { useEffect } from 'react';

function noop() { }

function stopPropagation(e: React.SyntheticEvent<any>) {
  e.stopPropagation();
}


export interface TableStateFilters {
  [key: string]: string[];
}

// export interface TableState<T> {
//   pagination: PaginationConfig;
//   filters: TableStateFilters;
//   sortColumn: ColumnProps<T> | null;
//   sortOrder?: SortOrder;
//   pivot?: number;
//   prevProps: TableProps<T>;
//   components: TableComponents;
//   columns: ColumnProps<T>[];
// }
export interface TableEventListeners {
  onClick?: (arg: React.MouseEvent) => void;
  onDoubleClick?: (arg: React.MouseEvent) => void;
  onContextMenu?: (arg: React.MouseEvent) => void;
  onMouseEnter?: (arg: React.MouseEvent) => void;
  onMouseLeave?: (arg: React.MouseEvent) => void;
  [name: string]: any;
}

interface TableProps {
  title?: any;
  pagination?: any;
  paginationType?: "scroll" | "common";
  dataSource: any[];
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
  onRow?: (record: any, index: number) => any;
  columnsPageRange?: any;
  columnsPageSize?: number;
  expandedRowRender?: any;
  className?: string;
  showHeader?: boolean;
  customColumn?: any[];
  onChange?: (value: any) => any;
}

export type onChangeType = 'sorter' | 'scroll' | 'pagination' | 'row'

const Table = (props: TableProps) => {
  // console.log(props.pagination, "分页器");
  const { title } = props;
  const [showHeader] = useState(true);
  const [MousewheelLimit, setMousewheelLimit] = useState(false);
  const [paginationType] = useState(props.paginationType || "scroll");
  const defaultPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
  };
  // const [pagination] = useState({ ...defaultPagination, ...props.pagination });
  const pagination = props.pagination ? { ...defaultPagination, ...props.pagination } : defaultPagination
  const current = pagination.current;
  const pageSize = pagination.pageSize;

  const { dataSource, ...restTableProps } = props;

  const [columns, setColumns] = useState(props.columns)
  const [customColumn, setCustomColumn] = useState(props.customColumn || [])

  /**CheckAll */
  const [checkAll, setCheckAll] = useState(true)
  /**CheckAll ed */


  if (columns) {

  }

  const onChange = (data: any, type: onChangeType) => {
    if (props.onChange) {
      // props.onChange(data);
      props.onChange({ type, data })
    }
  }

  const onRTableChange = (e: any) => {
    // console.log(e, "abcdeedd>>>>>>>>>>")
    onChange(e, 'sorter')
  }
  const OnRowClick = (record: any, index: number) => {
    // console.log(record, index, "onrowclick");
    const { onRow } = props;
    const custom = onRow ? onRow(record, index) : {};
    onChange({ record, index }, 'row')

  };
  const table = (
    <RTable
      // ref={this.setTableRef}
      key="table"
      // expandIcon={this.renderExpandIcon(prefixCls)}
      // {...restProps}
      onRowClick={(record: any, index: number) => OnRowClick(record, index)}
      // components={this.state.components}
      // prefixCls={prefixCls}
      data={props.dataSource}
      columns={columns}
      onChange={onRTableChange}
    // showHeader={showHeader}
    // className={classString}
    // expandIconColumnIndex={expandIconColumnIndex}
    // expandIconAsCell={expandIconAsCell}
    // emptyText={mergedLocale.emptyText}
    />
  );
  const renderPagination = () => {
    if (!props.pagination || !props.pagination.total) {
      return;
    }
    if (paginationType === "scroll") {
      return (
        <span>{`1 -${props.dataSource.length} of ${props.pagination.total}`}</span>
      );
    } else {
      return <Pagination total={props.pagination.total} pageSize={pageSize} onChange={OnPaginationChange} ></Pagination >
      // return <Pagination total={500 || props.pagination.total} pageSize={pageSize} onChange={OnPaginationChange} ></Pagination >
    }
  };
  const renderLoadMore = () => {
    if (!props.pagination || paginationType === 'common') {
      return;
    }
    if (props.dataSource.length < props.pagination.total) {
      return (
        <div className="more" onClick={() => LoadMore()}>
          <FontAwesomeIcon icon={faAngleDoubleDown} size="lg" />
        </div>
      );
    }
  };
  const OnPaginationChange = (data: any) => {
    // console.log(params, current, 'OnPaginationChange')
    onChange(data, 'pagination')
  }
  const LoadMore = () => {
    // console.log(current, 'loadmore', { page: current + 1, pageSize: pageSize }, Math.ceil(props.pagination.total / pageSize))
    if (current >= Math.ceil(props.pagination.total / pageSize)) { return }
    onChange({ page: current + 1, pageSize: pageSize }, 'scroll')
  };

  const onMousewheel = (e: any) => {
    if (paginationType === 'common') { return }
    const event = e["nativeEvent"];
    if (props.dataSource.length < 10) {
      return;
    }
    const scrollDiv = document.querySelectorAll('[data-testid="scrollMain"]')[0];
    if (!scrollDiv) {
      return;
    }
    if (event["wheelDelta"] > 0) {
      return;
    }
    const whetherLoadMore = (precision: number, ...arr: any): boolean => {
      const [a, b, c] = arr;
      const result = Math.abs(a - b - Math.ceil(c));
      return result <= 1;
    };
    if (
      whetherLoadMore(
        1,
        scrollDiv.scrollHeight,
        scrollDiv.clientHeight,
        scrollDiv.scrollTop
      )
    ) {
      if (scrollDiv.scrollHeight === scrollDiv.scrollTop + scrollDiv.clientHeight) {
        if (!MousewheelLimit) {
          setMousewheelLimit(true);
        } else {
          return;
        }
        setTimeout(() => {
          setMousewheelLimit(false);
        }, 1000);
        LoadMore();
      }
    }
  };
  useEffect(() => {
    let columnsArr: any[] = []
    if (customColumn.length === 0) { return }
    customColumn.forEach(el => {
      props.columns.forEach(c => {
        if (el.title === c.title) {
          if (el.checked) {
            columnsArr.push(c)
          }
        }
      })
    });
    setColumns(columnsArr)
  }, [customColumn])

  const onCustomColumnChange = (e: any, item?: any) => {
    if (customColumn) {
      // console.log(e, 'onCustomColumnChange', item)
      if (item) {
        setCustomColumn(
          customColumn.map(el => {
            if (el.title === item.title) {
              el.checked = e
            }
            return el
          }
          )
        )
      } else {
        setCheckAll(e)
        setCustomColumn(
          customColumn.map(el => {
            el.checked = e
            return el
          }
          )
        )
      }

      // )
    }

    // if (!e) {
    //   setColumns(columns.filter((el) => el.dataIndex === item.dataIndex))
    // } else {

    // }

  }

  const renderHeard = () => {
    if (title || (props.customColumn && props.customColumn.length > 0)) {
      // if(props.showCustomColumn){

      // }
      return (
        <div className={`table-header`}>
          <span>{title}</span>

          <div className={`customColumn`}>
            {customColumn.length > 2 && <Checkbox key={'checkAll'} checked={checkAll} onChange={(e) => onCustomColumnChange(e)}>{'CheckAll'}</Checkbox>}
            {customColumn.length > 0 && customColumn.map((item: any, index: number) =>
              <Checkbox key={item.title + index} checked={item.checked} onChange={(e) => onCustomColumnChange(e, item)}>{item.title}</Checkbox>
            )}
          </div>
        </div>
      )
    }
  }
  return (
    <div className="RTableBox" onWheel={(e: any) => onMousewheel(e)}>
      {renderHeard()}
      {table}
      {renderLoadMore()}
      <div className={"paginationBox"}>{renderPagination()}</div>
    </div>
  );
};
export default Table;
