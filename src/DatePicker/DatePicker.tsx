import * as React from 'react';
import { useEffect } from 'react';
//@ts-ignore
import { DatePicker as SODatePicker } from 'shineout'
import { useState } from 'react';





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
  const [openYearPicker, setCloseYearPicker] = useState(true)
  const [yearPickerDate, setYearPickerDate] = useState()
  const { birthDate } = props;
  // setTimeout(() => {
  //   setYearPickerDate(props.min)
  // }, 20);
  const onChange = (e: any) => {
    if (e) {
      // const year = new Date(e).getFullYear();
      const arr = e.split('/')
      const year = arr[arr.length - 1]
      if (Number(year) < 1900) { return }
    }
    if (props.onChange && typeof props.onChange === 'function') {
      // console.error(e, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', min, new Date(e).getTime() === new Date(min).getTime())
      // if (new Date(e).getTime() !== new Date(min).getTime()) {
      // }
      if (birthDate) {
        if (e) {
          props.onChange(e)
        }
      } else {
        props.onChange(e)

      }
    }
  }

  const handelYearPicker = (e: any) => {
    // console.log(e.target.className, e, 'click>>>>>')

    // setYearPickerDate(props.min)
    if (birthDate && openYearPicker && e.target.className) {
      setTimeout(() => {
        let span: any = document.getElementsByClassName('so-datepicker-ym')[0].getElementsByTagName('span')[0]
        // console.log(span, ">>>>>>>>>>>"
        if (span) {
          span.addEventListener(('click'), (event: any) => {
            setCloseYearPicker(false)
          }, false)
          span.click();
        }
      }, 20);
    }
    e.preventDefault();

  }
  const renderPicker = () => {

    return <div onClick={(e: any) => handelYearPicker(e)}><SODatePicker {...props} value={props.value || yearPickerDate} onChange={onChange} style={{ width: '100%' }} formatResult=""></SODatePicker></div>

  }
  return (renderPicker());

}

