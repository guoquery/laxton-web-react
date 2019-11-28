/// <reference types="react" />
export interface TableStateFilters {
    [key: string]: string[];
}
interface TableProps {
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
    onRowClick?: (value: any) => void;
    columnsPageRange?: any;
    columnsPageSize?: number;
    expandedRowRender?: any;
    className?: string;
    showHeader?: boolean;
}
declare const Table: (props: TableProps) => JSX.Element;
export default Table;
