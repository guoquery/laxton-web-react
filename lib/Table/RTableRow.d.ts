/// <reference types="react" />
interface TableRowProps {
    columns: any;
    index: any;
    expanded: any;
    expandable: any;
    expandIconAsCell: any;
    indentSize: any;
    indent: any;
    needIndentSpaced: any;
    onRowClick: any;
    className?: any;
    visible?: any;
    onDestroy: (value: any) => void;
    onExpand: (expanded: any, record: any) => void;
    record: any;
    prefixCls: string;
    childrenColumnName?: any;
}
declare const RTableRow: (props: TableRowProps) => JSX.Element;
export default RTableRow;
