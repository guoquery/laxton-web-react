/* eslint-disable prefer-spread */
// import RcTable, { INTERNAL_COL_DEFINE } from 'rc-table';
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
// import SelectionBox from './SelectionBox';
// import SelectionCheckboxAll from './SelectionCheckboxAll';
// import { flatArray, flatFilter, normalizeColumns, treeMap } from './util';
import { useState } from "react";
import { RTable } from ".";
import { Pagination } from "../Pagination/Pagination";
// import { TableProps } from './interface';

function noop() { }

function stopPropagation(e: React.SyntheticEvent<any>) {
  e.stopPropagation();
}

// function getRowSelection<T>(props: TableProps<T>): TableRowSelection<T> {
//   return props.rowSelection || {};
// }

// function getColumnKey<T>(column: ColumnProps<T>, index?: number) {
//   return column.key || column.dataIndex || index;
// }

// function isSameColumn<T>(a: ColumnProps<T> | null, b: ColumnProps<T> | null) {
//   if (a && b && a.key && a.key === b.key) {
//     return true;
//   }
//   return (
//     a === b ||
//     shallowEqual(a, b, (value: any, other: any) => {
//       if (typeof value === 'function' && typeof other === 'function') {
//         return value === other || value.toString() === other.toString();
//       }
//     })
//   );
// }

// const defaultPagination = {
//   onChange: noop,
//   onShowSizeChange: noop,
// };

/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
const emptyObject = {};

// const createComponents = (components: TableComponents = {}) => {
//   const bodyRow = components && components.body && components.body.row;
//   return {
//     ...components,
//     body: {
//       ...components.body,
//       row: createBodyRow(bodyRow),
//     },
//   };
// };

// function isTheSameComponents(components1: TableComponents = {}, components2: TableComponents = {}) {
//   return (
//     components1 === components2 ||
//     ['table', 'header', 'body'].every((key: keyof TableComponents) =>
//       shallowEqual(components1[key], components2[key]),
//     )
//   );
// }

// function getFilteredValueColumns<T>(state: TableState<T>, columns?: ColumnProps<T>[]) {
//   return flatFilter(
//     columns || (state || {}).columns || [],
//     (column: ColumnProps<T>) => typeof column.filteredValue !== 'undefined',
//   );
// }

// function getFiltersFromColumns<T>(
//   state: TableState<T> = {} as TableState<T>,
//   columns?: ColumnProps<T>[],
// ) {
//   const filters: any = {};
//   getFilteredValueColumns<T>(state, columns).forEach((col: ColumnProps<T>) => {
//     const colKey = getColumnKey(col) as string;
//     filters[colKey] = col.filteredValue;
//   });
//   return filters;
// }

// function isFiltersChanged<T>(state: TableState<T>, filters: TableStateFilters): boolean {
//   if (Object.keys(filters).length !== Object.keys(state.filters).length) {
//     return true;
//   }
//   return Object.keys(filters).some(columnKey => filters[columnKey] !== state.filters[columnKey]);
// }

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
  [name: string]: any; // https://github.com/ant-design/ant-design/issues/17245#issuecomment-504807714
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

  // const Table =<T extends {}>(props: TableProps<T>)=> {
  const [showHeader] = useState(true);
  const [MousewheelLimit, setMousewheelLimit] = useState(false);
  const [paginationType] = useState(props.paginationType || "scroll");
  const defaultPagination = {
    total: 0,
    current: 1,
    pageSize: 10
  };
  const [pagination] = useState({ ...defaultPagination, ...props.pagination });
  const [current, setCurrent] = useState(pagination.current);
  const [pageSize] = useState(pagination.pageSize);
  // const [pagination, setPagination] = useState(props.pagination);
  // if (props.pagination) {
  //   setPagination({ ...pagination, ...props.pagination });
  // }
  // console.log(props.pagination, pagination, "se>>>>>");
  const { dataSource, columns, ...restTableProps } = props;
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
    // showHeader={showHeader}
    // className={classString}
    // expandIconColumnIndex={expandIconColumnIndex}
    // expandIconAsCell={expandIconAsCell}
    // emptyText={mergedLocale.emptyText}
    />
  );
  const renderPagination = () => {
    if (!props.pagination) {
      return;
    }
    if (paginationType === "scroll") {
      return (
        <span>{`1 -${props.dataSource.length} of ${props.pagination.total}`}</span>
      );
    } else {
      const pageSize = props.pagination.pageSize ? props.pagination.pageSize : defaultPagination.pageSize
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
    if (props.onChange) {
      props.onChange({ type: "pagination", data: params });
    }
  }
  const LoadMore = () => {
    // console.log(current, 'loadmore', { page: current + 1, pageSize: pageSize }, Math.ceil(props.pagination.total / pageSize))
    // setPagination({ page: 1, pageSize: 10, action: "add" });
    if (current > Math.ceil(props.pagination.total / pageSize)) { return }
    if (props.onChange) {
      props.onChange({ type: "scroll", data: { page: current + 1, pageSize: pageSize } });
      setCurrent(current + 1)
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
