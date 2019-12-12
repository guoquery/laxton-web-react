import * as React from 'react';
import { useEffect } from 'react';




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
  const onChange = (value: any) => {
    // console.log(value)
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(value)
    }
  }
  const pre = 'laxton'
  const renderPicker = () => {

    return <select name="select" id={`ddl${props.value}`} onChange={e => onChange(e.target.value)} className={`${pre}-datePicker`}>
      {dropdownData && dropdownData.length > 0 &&
        dropdownData.map((label: any) => (
          <option
            key={label.AreaId || label.Id}
            value={label.AreaId || label.Id}
          >{label.Name}</option>
        ))}
    </select>

  }
  return (renderPicker());

}

