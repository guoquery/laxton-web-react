import * as React from 'react';
import { useState,Children,useEffect } from 'react';

interface SwitchProps {
    checked: boolean, // 指定当前是否选中
    checkedChildren?: string | React.ReactNode, // 选中时的内容
    unCheckedChildren?: string | React.ReactNode, // 非选中时的内容
    checkedColor?: string, // 设置switch背景颜色
    defaultChecked?: boolean, //  初始是否选中
    disabled?: boolean, // 是否禁止使用
    size?: 'default' | 'small', // 开关大小,可选值: default small
    onChange?: ( e?: any ) => any,  // 变化时调用函数
    onClick?: ( e?: any ) => any, // 点击时回调函数
    prefixCls?: string, // Switch 器类名
}

export const Switch = (props: SwitchProps) => {
  const prefixCls = props.prefixCls === undefined ? 'laxton' : props.prefixCls;
  const { checked, onChange, onClick, disabled, checkedChildren, unCheckedChildren } = props;
  const size = props.size === 'small' ? true : false;
  const checkedColor = props.checkedColor === undefined ? '#1890FF' : props.checkedColor;
  console.log(disabled)

    const LeftChildren = () => {
        if (checked) {
            return (
                <span className={ size ? `${prefixCls}-Switch-small-checkedChildrenLeft` : `${prefixCls}-Switch-checkedChildrenLeft` } >{checkedChildren}</span> 
            )
        }
    }
    const RightChildren = () => {
        if (!checked) {
            return (
                <span className={ size ? `${prefixCls}-Switch-small-checkedChildrenRight` : `${prefixCls}-Switch-checkedChildrenRight`}>{unCheckedChildren}</span>
            )
        }
    }


  return (
      <div className={`${prefixCls}-Switch`}>
          <input
            disabled={disabled}
            onChange={onChange}
            onClick={onClick}
            checked={checked}
            type="checkbox" 
            id={'switch-input'} 
            className={`${prefixCls}-Switch-input`} 
          />
          <label
            style={{ backgroundColor: checked ? checkedColor : undefined }}
            className={ size ? (disabled ? `${prefixCls}-Switch-small-disabled-label` : `${prefixCls}-Switch-small-label`) 
            : disabled ? `${prefixCls}-Switch-label` : `${prefixCls}-Switch-label`}
            // className={`${size?`${prefixCls}-Switch-small-label`:`${prefixCls}-Switch-label`}
            //  ${disabled?`${prefixCls}-Switch-small-disabled-label`:`${prefixCls}-Switch-ladis`} `}
            htmlFor="switch-input" 
          >   
              {LeftChildren()}
              <span className={ size ? `${prefixCls}-Switch-small-button` : `${prefixCls}-Switch-button` }></span>
              {RightChildren()}
          </label>
      </div>
  )
}