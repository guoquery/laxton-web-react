/* eslint-disable prefer-spread */
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import { RTable } from ".";
import { Pagination } from "../Pagination/Pagination";
// import { TableProps } from './interface';

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
  onChange?: (value: any) => any;
}
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

  const { dataSource, columns, ...restTableProps } = props;

  if (columns) {

  }

  const onChange = (data: any) => {
    if (props.onChange) {
      props.onChange(data);
    }
  }

  const onRTableChange = (e: any) => {
    // console.log(e, "abcdeedd>>>>>>>>>>")
    onChange({ type: "sorter", data: e })
  }
  const OnRowClick = (record: any, index: number) => {
    console.log(record, index, "onrowclick");
    const { onRow } = props;
    const custom = onRow ? onRow(record, index) : {};
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
      return <Pagination total={500 || props.pagination.total} pageSize={pageSize} onChange={OnPaginationChange} ></Pagination >
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
  const OnPaginationChange = (params: any) => {
    console.log(params, current, 'OnPaginationChange')
    onChange({ type: "pagination", data: params })
  }
  const LoadMore = () => {
    console.log(current, 'loadmore', { page: current + 1, pageSize: pageSize }, Math.ceil(props.pagination.total / pageSize))
    if (current >= Math.ceil(props.pagination.total / pageSize)) { return }
    if (props.onChange) {
      props.onChange({ type: "scroll", data: { page: current + 1, pageSize: pageSize } });
    }
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

  return (
    <div className="RTableBox" onWheel={(e: any) => onMousewheel(e)}>
      {title}
      {table}
      {renderLoadMore()}
      <div className={"paginationBox"}>{renderPagination()}</div>
    </div>
  );
};
export default Table;
