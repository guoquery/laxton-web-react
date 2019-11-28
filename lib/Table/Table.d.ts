import * as React from "react";
export interface TableStateFilters {
    [key: string]: string[];
}
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
    onRow?: (record: any, index?: number) => any;
    columnsPageRange?: any;
    columnsPageSize?: number;
    expandedRowRender?: any;
    className?: string;
    showHeader?: boolean;
    onChange?: (value: any) => any;
}
declare const Table: (props: TableProps) => JSX.Element;
export default Table;
