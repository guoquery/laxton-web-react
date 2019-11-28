/// <reference types="react" />
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
}
declare const RTable: (props: TableProps) => JSX.Element;
export default RTable;
