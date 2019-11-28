"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var RTableRow = function (props) {
    var componentWillUnmount = function () {
        props.onDestroy(props.record);
    };
    // render() {
    var prefixCls = props.prefixCls;
    var columns = props.columns;
    var record = props.record;
    var index = props.index;
    var cells = [];
    var expanded = props.expanded;
    var expandable = props.expandable;
    var expandIconAsCell = props.expandIconAsCell;
    var indent = props.indent;
    var indentSize = props.indentSize;
    var needIndentSpaced = props.needIndentSpaced;
    var onRowClick = props.onRowClick;
    for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var colClassName = col.className || '';
        var render = col.render;
        var text = record[col.dataIndex];
        var expandIcon = null;
        var tdProps = void 0;
        var colSpan = void 0;
        var rowSpan = void 0;
        var notRender = false;
        var indentText = void 0;
        if (i === 0 && expandable) {
            expandIcon = (react_1.default.createElement("span", { className: prefixCls + "-expand-icon " + prefixCls + "-" + (expanded ? 'expanded' : 'collapsed'), onClick: props.onExpand.bind(null, !expanded, record) }));
        }
        else if (i === 0 && needIndentSpaced) {
            expandIcon = (react_1.default.createElement("span", { className: prefixCls + "-expand-icon " + prefixCls + "-spaced" }));
        }
        if (expandIconAsCell && i === 0) {
            cells.push(react_1.default.createElement("td", { className: prefixCls + "-expand-icon-cell", key: "rc-table-expand-icon-cell" }, expandIcon));
            expandIcon = null;
        }
        if (render) {
            text = render(text, record, index) || {};
            tdProps = text.props || {};
            if (typeof text !== 'string' && !react_1.default.isValidElement(text) && 'children' in text) {
                text = text.children;
            }
            rowSpan = tdProps.rowSpan;
            colSpan = tdProps.colSpan;
        }
        if (rowSpan === 0 || colSpan === 0) {
            notRender = true;
        }
        indentText = i === 0 ? (react_1.default.createElement("span", { style: { paddingLeft: indentSize * indent + 'px' }, className: prefixCls + "-indent indent-level-" + indent })) : null;
        if (!notRender) {
            cells.push(react_1.default.createElement("td", { key: col.key || col.Id, colSpan: colSpan, rowSpan: rowSpan, className: "" + colClassName },
                indentText,
                expandIcon,
                text));
        }
    }
    return (react_1.default.createElement("tr", { onClick: onRowClick ? onRowClick.bind(null, record, index) : null, className: prefixCls + " " + props.className, style: { display: props.visible ? '' : 'none' } }, cells));
};
exports.default = RTableRow;
