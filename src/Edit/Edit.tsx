import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { ChamInputItem } from "../index";

type EditTypes = 'primary' | 'default' | 'dashed' | 'danger' | 'link';
type sizeTypes = 'small' | 'large';

interface EditProps {
  children: any;
  onClick?: (action: any) => any;
  prefixCls?: string;
  type?: EditTypes;
  id?: string;
  size?: sizeTypes;
  className?: string;
  value?: string;
  validateValue: string;
  pattern?: string;
  item: ChamInputItem;
  onValidateChange: (e: boolean) => void
}
export const Edit = (props: EditProps) => {
  // console.log(props, props.children, ',,,,,,,,,,,,,,,')
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(props.item.error || 'input error')
  const [ediActive, setEdiActive] = useState(false)
  const {
    // shape,
    size,
    className,
    children,
    // icon,
    // ghost,
    // block,
    value,
    validateValue,
    item,
    ...rest
  } = props;
  useEffect(() => {
    if (validateValue) {
      console.log('validateValue', validateValue)
      if (!ediActive) {
        setEdiActive(true)
        setError(props.item.error || `The input is not valid ${item.label}.`)
      }
      // if (ediActive) {
      if (props.item.pattern) {
        // console.log(value, props.item, value.match(props.item.pattern))
        if (!validateValue.match(props.item.pattern)) {
          if (!hasError) {
            props.onValidateChange(false)
            setHasError(true)
          }
        } else {
          if (hasError) {
            setHasError(false)
          }
          props.onValidateChange(true)
        }
      } else {
        if (hasError) {
          setHasError(false)
        }
        props.onValidateChange(true)
      }
      // }
    } else {
      if (ediActive) {
        if (item.require) {
          // if (ediActive) {
          setEdiActive(false)
          // }
          setError(`${item.label} is require!`)
          if (!hasError) {
            props.onValidateChange(false)
            setHasError(true)
          }
        }
      }
    }

  }, [validateValue])
  const type = props.type || 'default';
  const prefixCls = props.prefixCls || 'laxton-edit';

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
    // [`${prefixCls}-${type}`]: type,
    // // [`${prefixCls}-${shape}`]: shape,
    // [`${prefixCls}-${sizeCls}`]: sizeCls,
    // [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
    // [`${prefixCls}-loading`]: !!loading,
    // [`${prefixCls}-background-ghost`]: ghost,
    // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
    // [`${prefixCls}-block`]: block,
  });

  return (

    <div className={classes}>
      <div>{props.children}</div>
      <div className={`${prefixCls}-has-error`}>{hasError && error}</div>
    </div>

  );
};
