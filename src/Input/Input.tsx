import React, { useState } from "react";
import classNames from "classnames";
import { omit } from '../Tools/index';
import { Omit } from '../Tools/type';

type InputTypes = 'primary' | 'default' | 'dashed' | 'danger' | 'link';
type sizeTypes = 'small' | 'large';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  prefixCls?: string;
  size?: sizeTypes;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
}
export const Input = (props: InputProps) => {
  const {
    // shape,
    className,
    size,
    // icon,
    // ghost,
    // block,
    ...rest
  } = props;

  const type = props.size || 'default';
  const prefixCls = props.prefixCls || 'laxton-input';

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

  const handleChange = (value: any) => {
    // console.log(value, 'value.......')
    if (props.onChange) {
      props.onChange(value)
    }

  }
  const handleKeyDown = () => {

  }


  const otherProps = omit(props, [
    'prefixCls',
    'onPressEnter',
    'addonBefore',
    'addonAfter',
    'prefix',
    'suffix',
    'allowClear',
    'id',
    // Input elements must be either controlled or uncontrolled,
    // specify either the value prop, or the defaultValue prop, but not both.
    'defaultValue',
    'size',
  ]);
  console.log(props, otherProps, 'other>>>>>>>>>')
  return (

    <input
      {...otherProps}
      value={props.value}
      // onChange={handleChange}
      onChange={(e: any) => handleChange(e.target.value)}
      className={classes}
      // className={classNames(this.getInputClassName(prefixCls), {
      //   [className!]: className && !addonBefore && !addonAfter,
      // })}
      onKeyDown={handleKeyDown}
    // ref={this.saveInput}
    />

  );
};
