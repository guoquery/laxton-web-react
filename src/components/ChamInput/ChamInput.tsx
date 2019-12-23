

import React, { useContext, useEffect, useState } from "react";
import { Input, Select, Edit, DatePicker } from "../../index";
import { render } from 'react-dom';
import { Search } from './../Search/Search';
export interface ChamInputItem {
  label: string;
  type?: "text" | "dropDown" | "textArea" | "datePicker";
  value: string;
  require?: boolean;
  disabled?: boolean;
  iif?: () => boolean;
  /**text***/
  inputType?: string | "password";
  maxLength?: number;
  pattern?: string;
  error?: string;
  /**text***/
  /**datePicker***/
  dateType?: 'date' | 'time' | 'datetime' | 'month' | 'week';
  format?: string;
  minDate?: Date | string | number;
  maxDate?: Date | string | number;
  /**datePicker***/
  /**dropDown***/
  linkage?: string | 0;
  placeholder?: string;
  typeCode?: string;
  apiUrl?: string;
  des?: boolean;
  renderItem?: string;
  renderResult?: string;
  optionValue?: string;
  searchAble?: boolean;
  /**dropDown***/
}

interface ChamInputProps {
  item: ChamInputItem;
  value: any;
  style?: any;
  placeholder?: string;
  clearValue?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
  layOut?: 'row' | 'column',
  api?: any,
  width?: string | number;
}

export const ChamInput = (props: ChamInputProps) => {
  const [layOut] = useState(props.layOut || 'column');
  const [dropdownData, setDropdownData] = useState([]);
  const [disabled, setEditable] = useState((props.disabled === undefined ? false : props.disabled));
  const [validateFields, seValidateFields] = useState();
  const GetDropdownData = async (item: ChamInputItem): Promise<any> => {
    if (item.type != 'dropDown') { return }
    const api = props.api;
    if (item.linkage === 0 || item.linkage) {
      const parentAreaID = 0;
      // const parentAreaID = item.linkage ? store[item.linkage] : 0;
      if (parentAreaID === 0 || parentAreaID) {
        const res = await api.get(`api/applicantArea/GetSelect?parentAreaID=${parentAreaID}`);
        if (res.Result) {
          setDropdownData(res.Data);
        }
        // console.log(res.Data)
      }
    } else if (item.apiUrl) {
      const res = await api.post(item.apiUrl, {});
      if (res.Result) {
        setDropdownData(res.Data.Items);
      }
    } else if (item.typeCode) {
      let url = `api/Common/GetDropdownData?typeCode=`;
      if (item.des) {
        url = `api/Common/GetDropdownDataDescription?typeCode=`;
      }
      const res = await api.get(`${url}${item.typeCode}`);
      if (res.Result) {
        setDropdownData(res.Data);
      }
    }
  };
  const onSearch = (e: any) => {
    console.log(e, 'on Select search')
  }
  const item: ChamInputItem = props.item;
  const GetValue = props.value

  const [inputValue, SetInputValue] = useState(props.value || '')
  useEffect(() => {
    // GetDropdownData(props.item);
    // console.log('GetValue', GetValue, ">>>>>>>>")
    if (!GetValue) {
      if (inputValue) {
        SetInputValue('')
      }
    }
  }, [GetValue]);
  const type = props.item ? props.item.type : "text";
  let inputControl;
  useEffect(() => {
    GetDropdownData(props.item);
  }, []);
  const DropdownEnabled = (item: ChamInputItem): boolean => {
    if (disabled) {
      return disabled
    }
    let enabled = true;
    if (item.linkage) {
      // enabled = !!store[item.linkage];
    }
    return enabled;
  };
  const SetValue = (value: any): void => {
    SetInputValue(value)
  }
  const { placeholder } = item
  if (type === undefined || type === "text") {
    inputControl = (

      <Input
        className={validateFields === false ? 'has-error' : ''}
        type={item.inputType}
        id={`txt${item.value}`}
        maxLength={item.maxLength}
        disabled={props.disabled}
        // autoCompleteType={"off"
        placeholder={placeholder ? placeholder : "Enter Here"}
        onChange={(e: any) => SetValue(e)}
        value={inputValue}
      />
    );
  } else if (type === "dropDown") {
    inputControl = (
      <Select
        disabled={props.disabled}
        data={dropdownData}
        value={inputValue}
        onChange={(e: any) => SetValue(e)}
        renderItem={item.renderItem}
        optionValue={item.optionValue}
        onFilter={item.searchAble ? onSearch : undefined}
        placeholder={placeholder ? placeholder : "Choose Here"}
        renderResult={item.renderResult}></Select>
    );
  } else if (type === "textArea") {
    inputControl = (
      <textarea disabled={props.disabled} style={{ width: "100%" }} onChange={(e: any) => SetValue(e.target.value)} placeholder="Enter Here"></textarea>
    );
  } else if (type === "datePicker") {

    const { minDate, maxDate, dateType, placeholder, format } = item;
    inputControl = (
      <DatePicker
        format={format || 'MM/dd/yyyy'}
        value={minDate ? minDate : inputValue}
        disabled={props.disabled}
        onChange={(e: any) => SetValue(e)}
        min={minDate}
        max={maxDate}
        type={dateType || 'date'}
        placeholder={placeholder || " Choose Date"} ></DatePicker>
    );
  }
  useEffect(() => {
    if (validateFields != undefined) {
      if (props.onChange) {
        props.onChange({ [item.value]: validateFields ? inputValue : inputValue })
      }
    }
  }, [validateFields, inputValue])
  const onValidateChange = (e: any) => {
    seValidateFields(e)
  }

  return (
    <div className={layOut === 'row' ? 'chamInput' : "chamInputColumn"} style={{ ...props.style, ...{ width: props.width } }}>
      {layOut === 'column' && <div className={'chamInputLabel'} ><span className="require">{item.require ? "*" : ""}</span><span id={`lbl${item.value}`}>{item.label}</span></div>}
      {layOut === 'row' && <div className={'chamInputLabel'} id={`lbl${item.value}`}><span className="require">{item.require ? "*" : ""}</span>{item.label} :  </div>}
      <Edit {...props} validateValue={inputValue} onValidateChange={(e: boolean) => onValidateChange(e)}>{inputControl}</Edit>
    </div>
  );
};
