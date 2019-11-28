"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var RTableRow_1 = __importDefault(require("./RTableRow"));
var RTable = function (props) {
    var _a = react_1.useState(0), currentColumnsPage = _a[0], setCurrentColumnsPage = _a[1];
    var _b = react_1.useState(props.data), data = _b[0], setData = _b[1];
    var _c = react_1.useState([]), expandedRowKeys = _c[0], setExpandedRowKeys = _c[1];
    var _d = react_1.useState(5), columnsPageSize = _d[0], setColumnsPageSize = _d[1];
    var indentSize = react_1.useState(props.indentSize || 15)[0];
    var _e = react_1.useState('children' || props.childrenColumnName), childrenColumnName = _e[0], setChildrenColumnName = _e[1];
    var useFixedHeader = react_1.useState(false || props.useFixedHeader)[0];
    var expandIconAsCell = react_1.useState(false || props.expandIconAsCell)[0];
    // const [columns] = useState([] || props.columns)
    var defaultExpandedRowKeys = react_1.useState([] || props.defaultExpandedRowKeys)[0];
    var prefixCls = react_1.useState(props.prefixCls || 'RTable')[0];
    var columnsPageRange = react_1.useState(0 || props.columnsPageRange)[0];
    var rowKey = function (o, i) {
        return o.key || o.Id;
    };
    var keyFn = rowKey || rowKey;
    var getDefaultProps = function () {
        return {
            data: [],
            useFixedHeader: false,
            expandIconAsCell: false,
            columns: [],
            defaultExpandedRowKeys: [],
            rowKey: function (o) {
                return o.key;
            },
            rowClassName: function () {
                return '';
            },
            expandedRowClassName: function () {
                return '';
            },
            onExpandedRowsChange: function () {
            },
            prefixCls: 'rc-table',
            bodyStyle: {},
            style: {},
            childrenColumnName: 'children',
            indentSize: 15,
            columnsPageSize: 5,
        };
    };
    var getInitialState = function () {
        // return {
        //   expandedRowKeys: expandedRowKeys || props.defaultExpandedRowKeys,
        //   data: props.data,
        //   currentColumnsPage: 0,
        // };
    };
    var onExpandedRowsChange = function (keys) {
        console.log('getExpandedRows', getExpandedRows(), expandedRowKeys, keys);
        // if (expandedRowKeys.length < 1) {
        setExpandedRowKeys(keys);
        console.log('getExpandedRows', getExpandedRows(), expandedRowKeys, keys);
        // } else {
        //   setExpandedRowKeys([])
        // }
        getRows();
        if (props.onExpandedRowsChange) {
            props.onExpandedRowsChange(keys);
        }
    };
    var onExpanded = function (expanded, record) {
        var info = findExpandedRow(record);
        console.log(expanded, record, 'onExpanded>>>>>>>', info);
        if (info && !expanded) {
            onRowDestroy(record);
        }
        else if (!info && expanded) {
            var expandedRows = getExpandedRows().concat();
            expandedRows.push(rowKey(record));
            onExpandedRowsChange(expandedRows);
        }
    };
    var onRowDestroy = function (record) {
        var expandedRows = getExpandedRows().concat();
        var index = -1;
        expandedRows.forEach(function (r, i) {
            if (r === rowKey(record)) {
                index = i;
            }
        });
        if (index !== -1) {
            expandedRows.splice(index, 1);
        }
        onExpandedRowsChange(expandedRows);
    };
    var getExpandedRows = function () {
        return expandedRowKeys;
    };
    var getThs = function () {
        var ths = [];
        if (props.expandIconAsCell) {
            ths.push({
                key: 'rc-table-expandIconAsCell',
                className: prefixCls + "-expand-icon-th",
                title: '',
            });
        }
        ths = ths.concat(getCurrentColumns());
        return ths.map(function (c) {
            if (c.colSpan !== 0) {
                return react_1.default.createElement("th", { key: c.key || c.Id, colSpan: c.colSpan, className: c.className || '' }, c.title);
            }
        });
    };
    var getExpandedRow = function (key, content, visible, className) {
        return (react_1.default.createElement("tr", { key: key + '-extra-row', style: { display: visible ? '' : 'none' }, className: prefixCls + "-expanded-row " + className },
            props.expandIconAsCell ? react_1.default.createElement("td", { key: "rc-table-expand-icon-placeholder" }) : '',
            react_1.default.createElement("td", { colSpan: props.columns.length }, content)));
    };
    var getRowsByData = function (data, visible, indent) {
        var columns = getCurrentColumns();
        var childrenColumnName = props.childrenColumnName;
        var expandedRowRender = props.expandedRowRender;
        var expandIconAsCell = props.expandIconAsCell;
        var rst = [];
        // const keyFn = rowKey;
        var rowClassName = props.rowClassName;
        var expandedRowClassName = props.expandedRowClassName;
        var needIndentSpaced = props.data.some(function (record) { if (childrenColumnName) {
            return record[childrenColumnName] && record[childrenColumnName].length > 0;
        } });
        var onRowClick = props.onRowClick;
        // console.log(data, 'data.>>....')
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            var key = record.Id;
            console.log('rescord,key', key, record);
            // const key: string | number | undefined = keyFn(record, i);
            var childrenColumn = data[i].children;
            // const childrenColumn = childrenColumnName ? record[childrenColumnName] : '';
            var isRowExpanded = RowExpanded(record);
            // console.log(isRowExpanded, 'isRowExpanded》》》》》》》》》》》改')
            var expandedRowContent = void 0;
            if (expandedRowRender && isRowExpanded) {
                expandedRowContent = expandedRowRender(record, i);
            }
            var className_1 = rowClassName ? rowClassName(record, i) : '';
            rst.push(react_1.default.createElement(RTableRow_1.default, { indent: indent, indentSize: indentSize, needIndentSpaced: needIndentSpaced, className: className_1, record: record, expandIconAsCell: expandIconAsCell, onDestroy: onRowDestroy, index: i, visible: visible, onExpand: onExpanded, expandable: childrenColumn || expandedRowRender, expanded: isRowExpanded, prefixCls: prefixCls + "-row", childrenColumnName: childrenColumnName, columns: columns, onRowClick: onRowClick, key: key }));
            var subVisible = visible && isRowExpanded;
            if (expandedRowContent && isRowExpanded) {
                rst.push(getExpandedRow(key, expandedRowContent, subVisible, (expandedRowClassName ? expandedRowClassName(record, i) : '')));
            }
            if (childrenColumn) {
                rst = rst.concat(getRowsByData(childrenColumn, subVisible, indent + 1));
            }
        }
        // console.log(rst, ">>>>>>>>>>>>>>>>>>>>LLLL")
        return rst;
    };
    var getRows = function () {
        return getRowsByData(data, true, 0);
    };
    var getColGroup = function () {
        var cols = [];
        if (props.expandIconAsCell) {
            cols.push(react_1.default.createElement("col", { className: prefixCls + "-expand-icon-col", key: "rc-table-expand-icon-col" }));
        }
        cols = cols.concat(props.columns.map(function (c) {
            return react_1.default.createElement("col", { key: c.key || c.Id, style: { width: c.width } });
        }));
        return react_1.default.createElement("colgroup", null, cols);
    };
    var getCurrentColumns = function () {
        var columns = props.columns, prefixCls = props.prefixCls;
        // const { currentColumnsPage } = state;
        if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
            return columns;
        }
        return columns.map(function (column, i) {
            var newColumn = Object.assign({}, column);
            if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
                var pageIndexStart = columnsPageRange[0] + currentColumnsPage * columnsPageSize;
                var pageIndexEnd = columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
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
    };
    var getMaxColumnsPage = function () {
        var columnsPageRange = props.columnsPageRange;
        return Math.floor((columnsPageRange[1] - columnsPageRange[0] - 1) / columnsPageSize);
    };
    var goToColumnsPage = function (currentColumnsPage) {
        var maxColumnsPage = getMaxColumnsPage();
        var page = currentColumnsPage;
        if (page < 0) {
            page = 0;
        }
        if (page > maxColumnsPage) {
            page = maxColumnsPage;
        }
        setCurrentColumnsPage(page);
    };
    var prevColumnsPage = function () {
        goToColumnsPage(currentColumnsPage - 1);
    };
    var nextColumnsPage = function () {
        goToColumnsPage(currentColumnsPage + 1);
    };
    var wrapPageColumn = function (column, hasPrev, hasNext) {
        // const { prefixCls } = props;
        var maxColumnsPage = getMaxColumnsPage();
        var prevHandlerCls = prefixCls + "-prev-columns-page";
        if (currentColumnsPage === 0) {
            prevHandlerCls += " " + prefixCls + "-prev-columns-page-disabled";
        }
        var prevHandler = react_1.default.createElement("span", { className: prevHandlerCls, onClick: prevColumnsPage });
        var nextHandlerCls = prefixCls + "-next-columns-page";
        if (currentColumnsPage === maxColumnsPage) {
            nextHandlerCls += " " + prefixCls + "-next-columns-page-disabled";
        }
        var nextHandler = react_1.default.createElement("span", { className: nextHandlerCls, onClick: nextColumnsPage });
        if (hasPrev) {
            column.title = react_1.default.createElement("span", null,
                prevHandler,
                column.title);
            column.className = (column.className || '') + (" " + prefixCls + "-column-has-prev");
        }
        if (hasNext) {
            column.title = react_1.default.createElement("span", null,
                column.title,
                nextHandler);
            column.className = (column.className || '') + (" " + prefixCls + "-column-has-next");
        }
        return column;
    };
    var findExpandedRow = function (record) {
        // const keyFn = rowKey;
        var currentRowKey = keyFn(record);
        console.log(getExpandedRows(), 'getExpandedRows...');
        var rows = getExpandedRows().filter(function (i) {
            return i === currentRowKey;
        });
        return rows[0] || null;
    };
    var RowExpanded = function (record) {
        return !!findExpandedRow(record);
    };
    // const prefixCls = prefixCls;
    var columns = getThs();
    var rows = getRows();
    var className = prefixCls;
    if (props.className) {
        className += ' ' + props.className;
    }
    if (props.columnsPageRange) {
        className += " " + prefixCls + "-columns-paging";
    }
    var headerTable;
    var thead = (react_1.default.createElement("thead", { className: prefixCls + "-thead" },
        react_1.default.createElement("tr", null, columns)));
    if (props.useFixedHeader) {
        headerTable = (react_1.default.createElement("div", { className: prefixCls + "-header" },
            react_1.default.createElement("table", null,
                getColGroup(),
                thead)));
        thead = null;
    }
    return (react_1.default.createElement("div", { className: className, style: props.style },
        react_1.default.createElement("div", { className: prefixCls + "-body", style: props.bodyStyle },
            react_1.default.createElement("table", null,
                thead,
                react_1.default.createElement("tbody", { className: prefixCls + "-tbody" }, rows)))));
};
exports.default = RTable;
