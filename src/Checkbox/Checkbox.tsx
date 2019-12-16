
import React, { useState } from "react";
import classNames from "classnames";

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

export const Checkbox = (props: CheckboxProps) => {

  const { className, style, onMouseEnter, onMouseLeave, children } = props
  const [id] = useState(props.id || 'checkbox')
  const [prefixCls] = useState(props.prefixCls || 'checkbox')
  const classString = classNames(className, {
    [`${prefixCls}-wrapper`]: true,
    // [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
    // [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
  });

  const onChange = (e: any) => {
    // console.log(e, e.checked)
    if (props.onChange) {
      props.onChange(e.checked)
    }
  }

  return (
    <label
      className={classString}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <RcCheckbox
        // {...checkboxProps}
        prefixCls={prefixCls}
        className={checkboxClass}
        ref={this.saveCheckbox}
      /> */}
      <input type="checkbox" id={id} defaultChecked={props.defaultChecked} onChange={(e: any) => onChange(e.target)} checked={props.checked} />
      {children !== undefined && <span id={`lbl${id}`}>{children}</span>}
    </label>
  );
}