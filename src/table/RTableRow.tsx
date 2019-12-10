import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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

// const actionIcon: any[] = [
//   {
//     icon: faPencilAlt,
//     action: "Edit"
//   },
//   {
//     icon: faTrashAlt,
//     action: "Delete"
//   }
// ];
const actionIcon: any = {
  delete: faTrashAlt,
  edit: faPencilAlt,
}


const RTableRow = (props: TableRowProps) => {
  const componentWillUnmount = () => {
    props.onDestroy(props.record);
  };
  // render() {
  const prefixCls = props.prefixCls;
  const columns = props.columns;
  const record = props.record;
  const index = props.index;
  const cells = [];
  const expanded = props.expanded;
  const expandable = props.expandable;
  const expandIconAsCell = props.expandIconAsCell;
  const indent = props.indent;
  const indentSize = props.indentSize;
  const needIndentSpaced = props.needIndentSpaced;
  const onRowClick = props.onRowClick;


  /******render button icon*****/
  const renderButtonIcon = (col: any) => {

    console.log(col, '>>>>>>>>>>>', col.buttonIcons)

    return <div style={{ flexDirection: "row", justifyContent: "center" }}>
      {col.buttonIcons.map((item: any, index: number) => (
        <FontAwesomeIcon
          key={`${item.icon}${index}`}
          icon={actionIcon[item.type]}
          size={'lg'}
          style={{
            marginLeft: 6,
            marginRight: 6
          }}
          // onClick={(e) => { e.stopPropagation(); Action(item.action, props) }}
          onClick={(e) => { e.stopPropagation(); item.click(props.record) }}
        />
      ))}
    </div>

  }
  /******end*****/

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const colClassName = col.className || "";
    const render = col.render;
    const buttonIcons = col.buttonIcons;
    let text = record[col.dataIndex];

    let expandIcon = null;
    let tdProps;
    let colSpan;
    let rowSpan;
    let notRender = false;
    let indentText;

    if (i === 0 && expandable) {
      expandIcon = (
        <span
          className={`${prefixCls}-expand-icon ${prefixCls}-${
            expanded ? "expanded" : "collapsed"
            }`}
          onClick={props.onExpand.bind(null, !expanded, record)}
        />
      );
    } else if (i === 0 && needIndentSpaced) {
      expandIcon = (
        <span className={`${prefixCls}-expand-icon ${prefixCls}-spaced`} />
      );
    }

    if (expandIconAsCell && i === 0) {
      cells.push(
        <td
          className={`${prefixCls}-expand-icon-cell`}
          key="rc-table-expand-icon-cell"
        >
          {expandIcon}
        </td>
      );
      expandIcon = null;
    }

    if (buttonIcons && buttonIcons.length > 0) {
      text = renderButtonIcon(col)

    }

    if (render) {
      // console.log(render, "render>>>>>>>")
      text = render({ text, record, index }) || {};
      tdProps = text.props || {};
      // console.log(tdProps.rowSpan, "render>>>>>>>", text.props)

      if (
        typeof text !== "string" &&
        !React.isValidElement(text) &&
        "children" in text
      ) {
        text = text.children;
      }
      rowSpan = tdProps.rowSpan;
      colSpan = tdProps.colSpan;
    }

    if (rowSpan === 0 || colSpan === 0) {
      notRender = true;
    }

    indentText =
      i === 0 ? (
        <span
          style={{ paddingLeft: indentSize * indent + "px" }}
          className={`${prefixCls}-indent indent-level-${indent}`}
        ></span>
      ) : null;

    if (!notRender) {
      // console.log('key', col)
      cells.push(
        <td
          key={`${col.dataIndex}${index}`}
          colSpan={colSpan}
          rowSpan={rowSpan}
          className={`${colClassName}`}
        >
          {indentText}
          {expandIcon}
          {text}
        </td>
      );
    }
  }
  return (
    <tr
      onClick={onRowClick ? onRowClick.bind(null, record, index) : null}
      className={`${prefixCls} ${props.className}`}
      style={{ display: props.visible ? "" : "none" }}
    >
      {cells}
    </tr>
  );
};

export default RTableRow;
