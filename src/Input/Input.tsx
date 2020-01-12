import React, { useState, useRef, useCallback, useEffect } from "react";
import classNames from "classnames";
import { omit } from '../Tools/index';

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
  formatCode?: 'count' | '$' | 'zip' | 'tel';

}
/**
  * Add a comma
  *
  * @param {*} nStr
  * @returns
  * @memberof InputItemComponent
  */
const addCommas = (nStr: string) => {
  nStr += '';
  const comma = /,/g;
  nStr = nStr.replace(comma, '');
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
export const Input = (props: InputProps) => {
  const {
    // shape,
    className,
    size = 'default',
    formatCode,
    value,
    type,
    // icon,
    // ghost,
    // block,
    ...rest
  } = props;

  // const size = props.size || 'default';
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
  const [formatValue, setFormatValue] = useState((props.value as string))
  const [initFormat, setInitFormat] = useState(false)
  const OnClick = (e: any) => {
    if (props.onClick) {
      props.onClick(e)
    }
  }

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${size}`]: size,
    // [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    // [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
    // [`${prefixCls}-loading`]: !!loading,
    // [`${prefixCls}-background-ghost`]: ghost,
    // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
    // [`${prefixCls}-block`]: block,
  });

  const handleChange = (value: any) => {
    // console.error(value, 'pasete.........')
    let newValue: any = value;
    if (formatCode) {
      newValue = handleFormatValue(value)
    }
    if (type === 'password') {
      const propsValue = props.value + ''
      const length = propsValue.length
      // console.log(value, 'value.......', length, value.length)
      if (length < value.length) {
        newValue = props.value + value.replace(/\*/g, '');
      } else if (length > value.length) {
        newValue = propsValue.substring(0, value.length)
      }
    }
    if (props.onChange) {
      // props.onChange(value)
      props.onChange(newValue)
    }

  }
  const handleFormatValue = (value: any) => {
    let newValue: any = value;
    if (!newValue) {
      newValue = null;
      setFormatValue(``)
    } else {
      newValue = newValue + ''
      newValue = newValue.replace(/,/g, '');
      let reg = /^[0-9]*$/;
      switch (formatCode) {
        case '$':
        case 'count':
          newValue = newValue ? newValue.replace('$', '') : newValue;
          let reg2 = /^(([0-9])|(\-[0-9]))+\.([0-9]{0,2})$|^[0-9]*$|^\-[0-9]*$/; //
          // reg = /^(([0-9])+\.([1-9]{1,2})$)|^[0-9]*$/;
          // console.error('number', reg.test(newValue))
          let reg3 = /^(([0-9])|(\-[0-9]))+\.([0-9]{3,10})$|^[0-9]*$|^\-[0-9]*$/;  //Keep two decimal places
          if (reg2.test(newValue)) {
            newValue = newValue;
          } else if (reg3.test(newValue)) {
            newValue = Number(newValue).toFixed(2);
          } else {
            // console.warn(newValue, formatValue, 'else')
            if (formatValue) {
              newValue = formatValue.replace(/,/g, '').replace('$', '')
            } else {
              newValue = null;
            }
          }
          if (newValue !== null) {
            if (formatCode === 'count') {
              setFormatValue(`${addCommas(newValue)}`)
            } else {
              setFormatValue(`$${addCommas(newValue)}`)
            }
          }
          break;
        case 'zip':
        default:
          if (reg.test(newValue)) {
            newValue = newValue;
            setFormatValue(`${newValue}`)
          } else {
            if (formatValue) {
              newValue = formatValue
              setFormatValue(`${newValue}`)
            } else {
              newValue = null;
            }
          }
          break;
      }
    }
    // console.log(newValue, 'after')
    return newValue;
  }


  const handleKeyDown = (e: any) => {

  }
  const handleOnBlur = (e?: any) => {
    if (formatValue) {
      if (formatCode === 'count') {
        setFormatValue(Number(props.value).toFixed(2))
      } else if (formatCode === '$') {
        setFormatValue(`$${addCommas(Number(props.value).toFixed(2) + '')}`)
      }
    }
  }

  useEffect(() => {
    handleOnBlur();
  }, [initFormat])

  const removeProps = [
    'prefixCls',
    'onPressEnter',
    'addonBefore',
    'addonAfter',
    'prefix',
    'suffix',
    'allowClear',
    'formatCode',
    // 'id',
    // Input elements must be either controlled or uncontrolled,
    // specify either the value prop, or the defaultValue prop, but not both.
    'defaultValue',
    'size',
  ]
  const onpaste = (e: any) => {
    console.log('onpaste', onpaste)
    if (type === 'password') {
      return false;
    }
  }
  let otherProps = omit(props, removeProps);
  const renderFormatInput = () => {
    // if (!formatCode) { return null }
    if (formatCode && props.value && !formatValue) {
      handleChange(props.value);
      setInitFormat(true)
    }
    let showValue = value;
    if (type === 'password') {
      otherProps = omit(props, [...removeProps, ...['type']]);
      if (showValue) {
        console.error(showValue, 'showvalue')
        showValue = Array.from({ length: showValue.toString().length }, () => '*').join('')
      }
    }
    return <input
      {...otherProps}
      onpaste={(e: any) => onpaste(e)}
      autoComplete={props.autoComplete || 'off'}
      value={formatCode ? formatValue : showValue}
      onChange={(e: any) => handleChange(e.target.value)}
      className={classes}
      onKeyDown={handleKeyDown}
      onBlur={handleOnBlur}
    // ref={this.saveInput}
    />
  }
  const renderInput = () => {

    return <div>
      {/* {!formatCode && false && <input
        {...otherProps}
        autoComplete={props.autoComplete || 'off'}
        value={props.value}
        onChange={(e: any) => handleChange(e.target.value)}
        className={classes}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
      />} */}
      {renderFormatInput()}
    </div>
  }

  // console.log(props, otherProps, 'other>>>>>>>>>')
  return (renderInput());
};
