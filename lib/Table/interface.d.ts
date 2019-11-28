/// <reference types="react" />
declare let ColumnFixedPlacements: any;
export declare type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;
export declare type ColumnFilterItem = {
    text: React.ReactNode;
    value: string;
    children?: ColumnFilterItem[];
};
export interface FilterDropdownProps {
    prefixCls?: string;
    setSelectedKeys?: (selectedKeys: string[]) => void;
    selectedKeys?: React.Key[];
    confirm?: () => void;
    clearFilters?: (selectedKeys: string[]) => void;
    filters?: ColumnFilterItem[];
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    visible?: boolean;
}
export interface ColumnProps<T> {
    title?: React.ReactNode | ((options: {
        filters: any;
        sortOrder?: SortOrder;
        sortColumn?: ColumnProps<T> | null;
    }) => React.ReactNode);
    key?: React.Key;
    dataIndex?: string;
    render?: (text: any, record: T, index: number) => React.ReactNode;
    align?: 'left' | 'right' | 'center';
    ellipsis?: boolean;
    filters?: ColumnFilterItem[];
    onFilter?: (value: any, record: T) => boolean;
    filterMultiple?: boolean;
    filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
    filterDropdownVisible?: boolean;
    onFilterDropdownVisibleChange?: (visible: boolean) => void;
    sorter?: boolean | CompareFn<T>;
    defaultSortOrder?: SortOrder;
    colSpan?: number;
    width?: string | number;
    className?: string;
    fixed?: boolean | (typeof ColumnFixedPlacements)[number];
    filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
    filteredValue?: any[];
    sortOrder?: SortOrder | boolean;
    children?: ColumnProps<T>[];
    onCellClick?: (record: T, event: Event) => void;
    onCell?: (record: T, rowIndex: number) => TableEventListeners;
    onHeaderCell?: (props: ColumnProps<T>) => TableEventListeners;
    sortDirections?: SortOrder[];
}
export interface AdditionalCellProps {
    onClick?: React.MouseEventHandler<HTMLElement>;
    [name: string]: any;
}
export interface TableComponents {
    table?: React.ReactType;
    header?: {
        wrapper?: React.ReactType;
        row?: React.ReactType;
        cell?: React.ReactType;
    };
    body?: {
        wrapper?: React.ReactType;
        row?: React.ReactType;
        cell?: React.ReactType;
    };
}
export interface TableLocale {
    filterTitle?: string;
    filterConfirm?: React.ReactNode;
    filterReset?: React.ReactNode;
    emptyText?: React.ReactNode | (() => React.ReactNode);
    selectAll?: React.ReactNode;
    selectInvert?: React.ReactNode;
    sortTitle?: string;
    expand?: string;
    collapse?: string;
}
export declare type RowSelectionType = 'checkbox' | 'radio';
export declare type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => void;
export declare type TableSelectWay = 'onSelect' | 'onSelectMultiple' | 'onSelectAll' | 'onSelectInvert';
export interface TableRowSelection<T> {
    type?: RowSelectionType;
    selectedRowKeys?: string[] | number[];
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => Object;
    onSelect?: SelectionSelectFn<T>;
    onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    onSelectInvert?: (selectedRowKeys: string[] | number[]) => void;
    selections?: boolean;
    hideDefaultSelections?: boolean;
    fixed?: boolean;
    columnWidth?: string | number;
    selectWay?: TableSelectWay;
    columnTitle?: string | React.ReactNode;
}
export declare type SortOrder = 'descend' | 'ascend';
export interface SorterResult<T> {
    column: ColumnProps<T>;
    order: SortOrder;
    field: string;
    columnKey: string;
}
export declare type TableSize = 'default' | 'middle' | 'small';
export interface ExpandIconProps<T> {
    prefixCls: string;
    expanded: boolean;
    record: T;
    needIndentSpaced: boolean;
    expandable: boolean;
    onExpand: (record: T, event?: React.MouseEvent) => void;
}
export interface TableCurrentDataSource<T> {
    currentDataSource: T[];
}
export interface TableEventListeners {
    onClick?: (arg: React.MouseEvent) => void;
    onDoubleClick?: (arg: React.MouseEvent) => void;
    onContextMenu?: (arg: React.MouseEvent) => void;
    onMouseEnter?: (arg: React.MouseEvent) => void;
    onMouseLeave?: (arg: React.MouseEvent) => void;
    [name: string]: any;
}
export interface CheckboxPropsCache {
    [key: string]: any;
}
export interface TableProps<T> {
    prefixCls?: string;
    dropdownPrefixCls?: string;
    rowSelection?: TableRowSelection<T>;
    pagination?: false;
    size?: TableSize;
    dataSource?: T[];
    components?: TableComponents;
    columns?: ColumnProps<T>[];
    rowKey?: string | ((record: T, index: number) => string);
    rowClassName?: (record: T, index: number) => string;
    expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => React.ReactNode;
    defaultExpandAllRows?: boolean;
    defaultExpandedRowKeys?: string[] | number[];
    expandedRowKeys?: string[] | number[];
    expandIcon?: (props: ExpandIconProps<T>) => React.ReactNode;
    expandIconAsCell?: boolean;
    expandIconColumnIndex?: number;
    expandRowByClick?: boolean;
    onExpandedRowsChange?: (expandedRowKeys: string[] | number[]) => void;
    onExpand?: (expanded: boolean, record: T) => void;
    onChange?: (pagination: any, filters: Record<keyof T, string[]>, sorter: SorterResult<T>, extra: TableCurrentDataSource<T>) => void;
    loading?: boolean;
    locale?: TableLocale;
    indentSize?: number;
    onRowClick?: (record: T, index: number, event: Event) => void;
    onRow?: (record: T, index: number) => TableEventListeners;
    onHeaderRow?: (columns: ColumnProps<T>[]) => TableEventListeners;
    useFixedHeader?: boolean;
    bordered?: boolean;
    showHeader?: boolean;
    footer?: (currentPageData: T[]) => React.ReactNode;
    title?: (currentPageData: T[]) => React.ReactNode;
    scroll?: {
        x?: boolean | number | string;
        y?: boolean | number | string;
        scrollToFirstRowOnChange?: boolean;
    };
    childrenColumnName?: string;
    bodyStyle?: React.CSSProperties;
    className?: string;
    style?: React.CSSProperties;
    tableLayout?: React.CSSProperties['tableLayout'];
    children?: React.ReactNode;
    sortDirections?: SortOrder[];
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}
export {};
