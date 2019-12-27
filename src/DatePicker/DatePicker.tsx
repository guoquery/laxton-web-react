import * as React from 'react';
import { useEffect } from 'react';
//@ts-ignore
import { DatePicker as SODatePicker } from 'shineout'





export interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface OptGroupProps {
  label?: React.ReactNode;
}

export interface SelectLocale {
  notFoundContent?: string;
}

export const DatePicker = (props: any): any => {
  const onChange = (e: any) => {
    if (e) {
      // const year = new Date(e).getFullYear();
      const arr = e.split('/')
      const year = arr[arr.length - 1]
      if (Number(year) < 1900) { return }
    }
    if (props.onChange && typeof props.onChange === 'function') {
      console.error(e, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', e === '01/01/1980')
      if (e !== '01/01/1980') {
        props.onChange(e)
      }
    }
  }
  const pre = 'laxton'
  const renderPicker = () => {

    return <SODatePicker {...props} onChange={onChange} style={{ width: '100%' }} formatResult=""></SODatePicker>

  }
  return (renderPicker());

}

