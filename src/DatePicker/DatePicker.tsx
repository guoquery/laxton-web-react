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
  const dropdownData = props.data
  const onChange = (e: any) => {
    console.log(e)
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(e)
    }
  }
  const pre = 'laxton'
  const renderPicker = () => {

    return <SODatePicker type="date" onChange={onChange} style={{ width: '100%' }} placeholder="Choose Date"></SODatePicker>

  }
  return (renderPicker());

}

