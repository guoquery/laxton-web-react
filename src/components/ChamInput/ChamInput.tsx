

import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Input, Select, Edit, DatePicker, TextArea } from "../../index";
import { render } from 'react-dom';
import { Search } from './../Search/Search';
import { useLinkage } from './../customHooks/useLinkage';
import { linkStore } from "../customObserver/LinkageStore";

export interface DropDownType {
  /**dropDown***/
  linkage?: string | 0;
  typeCode?: string;
  apiUrl?: string;
  des?: boolean;
  renderItem?: string;
  renderResult?: string;
  optionLabel?: string;
  optionValue?: string;
  useFormat?: boolean;
  searchAble?: boolean;
  apiMethod?: 'post' | 'get';
  /**dropDown***/
}
export interface DatePickerType {
  /**datePicker***/
  dateType?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'year';
  format?: string;
  minDate?: Date | string | number;
  maxDate?: Date | string | number;
  /**datePicker***/
}
export interface ChamInputType extends DropDownType, DatePickerType {
  label: string;
  type?: "text" | "dropDown" | "textArea" | "datePicker";
  value: string;
  placeholder?: string;
  require?: boolean;
  disabled?: boolean;
  iif?: () => boolean;
  /**text***/
  inputType?: string | "password" | 'number';
  maxLength?: number;
  pattern?: string;
  error?: string;
  formatCode?: 'count' | '$' | 'zip' | 'tel'
  /**text***/
}

interface ChamInputProps {
  item: ChamInputType;
  value: any;
  style?: any;
  placeholder?: string;
  clearValue?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
  layOut?: 'row' | 'column',
  api?: any,
  width?: string | number;
  [keyName: string]: any
}

export const ChamInput = observer((props: ChamInputProps) => {
  const [layOut] = useState(props.layOut || 'column');
  const [dropdownData, setDropdownData] = useState([]);
  const [disabled, setEditable] = useState((props.disabled === undefined ? false : props.disabled));
  const [validateFields, seValidateFields] = useState();
  // console.error(linkStore, '>>>>>>>>>>>>>')

  const item: ChamInputType = props.item;
  const GetValue = props.value
  // console.log(props.value, 'input props.value')
  const [inputValue, SetInputValue] = useState('')

  const GetDropdownData = async (item: ChamInputType): Promise<any> => {

    if (item.type != 'dropDown') { return }
    const api = props.api;
    if (item.linkage === 0 || item.linkage) {
      // const parentAreaID = 0;
      const parentAreaID = item.linkage ? linkStore[item.linkage] : 0;
      // console.error('bacede', item.linkage, props.values, props.values[item.linkage], parentAreaID)
      if (parentAreaID === 0 || parentAreaID) {
        let idToString = parentAreaID >= 10 ? parentAreaID + "" : parentAreaID > 0 ? '0' + parentAreaID : parentAreaID

        const res = await api.get(`api/applicantArea/GetSelect?parentAreaID=${parentAreaID}`);
        if (res.Result) {
          const data = res.Data;
          data.forEach((el: any) => {
            el[item.optionValue || 'Id'] = Number(el[item.optionValue || 'Id'])
            // el.Id = Number(el[item.optionValue || 'Id'])
          });
          setDropdownData(data);
        }
        // console.log(res.Data)
      }
    } else if (item.apiUrl && !item.searchAble) {
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
  const onSearch = async (e: any) => {
    if (e == '' || e === undefined || e === null) { return }
    console.log(e, typeof e, 'on Select search')
    const method = item.apiMethod || 'get';
    getSearchData(method, e, item.apiUrl)

  }

  const getSearchData = async (method: 'get' | 'post', param: any, url?: string) => {
    let res;
    if (url) {
      switch (method) {
        case 'get':
          res = await props.api.get(`${item.apiUrl}${param}`);
          break;
        case 'post':
          res = await props.api.post(`${item.apiUrl}`, param);
          break;
      }
    } else {
      // res = await props.api.get(`${item.apiUrl}${param}`);
    }
    if (res && res.Result) {
      const data = res.Data;
      setDropdownData(data);
    }
  }
  useEffect(() => {
    // GetDropdownData(props.item);
    if (!GetValue) {
      if (inputValue) {
        SetInputValue('')
      }
    } else {
      SetInputValue(GetValue)
    }
  }, [GetValue]);
  const type = props.item ? props.item.type : "text";
  let inputControl;
  const effect = item.linkage ? linkStore[item.linkage] : null;
  useEffect(() => {
    GetDropdownData(props.item);
  }, [effect]);
  // useEffect(() => {
  //   // const getData = linkStore.Province.
  //   GetDropdownData(props.item);
  // }, []);
  const DropdownEnabled = (): boolean => {

    let disabled = false;
    if (item.linkage) {
      disabled = !linkStore[item.linkage];
    }
    return disabled;
  };
  const SetValue = (value: any): void => {
    console.log(value, 'e>>>>>>>>>>')
    SetInputValue(value ? value : '')
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
        formatCode={item.formatCode}
      />
    );
  } else if (type === "dropDown") {
    // const useFormat = item.useFormat === false ? false : true;
    inputControl = (
      <Select
        absolute={props.absolute === false ? false : true}
        disabled={props.disabled || DropdownEnabled()}
        data={dropdownData}
        value={inputValue ? Number(inputValue) : undefined}
        defaultValue={inputValue ? Number(inputValue) : undefined}
        datum={{ format: item.optionValue || 'Id' }}
        onChange={(e: any) => SetValue(e)}
        optionLabel={item.optionLabel}
        optionValue={item.optionValue}
        clearable
        renderResult={item.renderResult}
        renderItem={item.renderItem}
        onFilter={item.searchAble ? onSearch : undefined}
        placeholder={placeholder ? placeholder : "Choose Here"}></Select>
    );
  } else if (type === "textArea") {
    inputControl = (
      <TextArea 
      // value={inputValue} 
      // disabled={props.disabled} 
      // style={{ width: "100%", }} 
      onChange={(e: any) => SetValue(e.target.value)}
      // placeholder={placeholder ? placeholder:"Enter Here"}
      >

      </TextArea>
    );
  } else if (type === "datePicker") {

    const { minDate, maxDate, dateType, format } = item;
    inputControl = (
      <DatePicker
        absolute={props.absolute === false ? false : true}
        format={format || 'MM/dd/yyyy'}
        // value={inputValue}
        value={minDate ? (inputValue ? inputValue : minDate) : inputValue}
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
        if (item.linkage === 0 || item.linkage) {

          if (item.linkage === 0) {
            let inputNumber: number = Number(inputValue)
            let idToString = inputNumber >= 10 ? inputNumber + "" : inputNumber > 0 ? '0' + inputNumber : inputNumber
            props.onChange({ [item.value]: idToString ? idToString + '' : '' })
            // Object.keys(linkStore).forEach((key: any) => {
            //   linkStore[key] = null
            // })
            linkStore[item.value] = idToString ? idToString + '' : null
          } else {
            let inputString = inputValue + ''
            console.log(inputString.length % 2, Number(linkStore.Province) >= 10)
            if (Number(inputString[0]) > 0 && Number(linkStore.Province) < 10) {
              // if (inputString.length % 2 || Number(linkStore.Province) < 10) {
              inputString = '0' + inputValue
            }
            // Object.keys(linkStore).forEach((key: any) => {
            //   if (key !== item.linkage)
            //     linkStore[key] = null
            // })
            linkStore[item.value] = inputString
            props.onChange({ [item.value]: inputString })
          }
        } else {
          props.onChange({ [item.value]: validateFields ? inputValue : inputValue })
        }
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
});
