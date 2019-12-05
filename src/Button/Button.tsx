import React, { useState } from "react";
import classNames from "classnames";

type ButtonTypes = 'primary' | 'default' | 'dashed' | 'danger' | 'link';
type sizeTypes = 'small' | 'large';

interface ButtonProps {
  children: any;
  onClick?: (action: any) => any;
  prefixCls?: string;
  type?: ButtonTypes
  id?: string;
  size?: sizeTypes;
  className?: string;
}
export const Button = (props: ButtonProps) => {
  const {
    // shape,
    size,
    className,
    children,
    // icon,
    // ghost,
    // block,
    ...rest
  } = props;

  const type = props.type || 'default';
  const prefixCls = props.prefixCls || 'laxton-btn';

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }

  const OnClick = (e: any) => {
    if (props.onClick) {
      props.onClick(e)
    }
  }

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    // [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    // [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
    // [`${prefixCls}-loading`]: !!loading,
    // [`${prefixCls}-background-ghost`]: ghost,
    // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
    // [`${prefixCls}-block`]: block,
  });

  return (

    <button className={classes} id={`btn_${props.children}`} onClick={(e: any) => OnClick(e)}><span>{props.children}</span></button>

  );
};
