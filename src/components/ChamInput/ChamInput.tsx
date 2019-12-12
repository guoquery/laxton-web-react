

import React, { useContext, useEffect, useState } from "react";
import { Input, Select } from "../../index";
// import {Input}
// import { Picker, StyleSheet, text, TextInput, View } from "react-native";
// import { api } from "../service/api.service";
export interface ChamInputItem {
  label: string;
  type?: "text" | "dropDown" | "textArea" | "datePicker";
  value: string;
  require?: boolean;
  disabled?: boolean;
  /**text***/
  inputType?: string | "password";
  maxLength?: number;
  pattern?: string;
  /**text***/
  /**datePicker***/
  format?: string;
  /**datePicker***/
  /**dropDown***/
  linkage?: string | 0;
  placeholder?: string;
  typeCode?: string;
  apiUrl?: string;
  des?: boolean;

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
  width?: string;
}

export const ChamInput = (props: ChamInputProps) => {
  const [layOut] = useState(props.layOut || 'column');
  const [dropdownData, setDropdownData] = useState([]);
  const [disabled, setEditable] = useState((props.disabled === undefined ? false : props.disabled));
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
  const item: ChamInputItem = props.item;
  const GetValue = props.value
  // const [GetValue, SetValueState] = useState(props.value || '')
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
    // store[key] = value;
    // console.log('set>>>>>1111', GetValue, value)
    // SetValueState(value)
    if (props.onChange) {
      // console.log('set>>>>>22222', GetValue)
      props.onChange({ [item.value]: value })
    }
  }
  if (type === undefined || type === "text") {
    inputControl = (
      <Input
        type={item.inputType}
        id={`txt${item.value}`}
        maxLength={item.maxLength}
        disabled={props.disabled}
        // autoCompleteType={"off"
        placeholder={item.placeholder ? item.placeholder : "Enter Here"}
        onChange={e => SetValue(e)}
        value={GetValue}
      />
    );
  } else if (type === "dropDown") {
    inputControl = (
      // <Picker
      //   testID={`ddl${item.value}`}
      //   prompt="Choose Here"
      //   selectedValue={GetValue}
      //   style={{ height: 26 }}
      //   enabled={DropdownEnabled(item)}
      //   onValueChange={(value, itemIndex) => SetValue(value, item.value)}
      // >
      // {dropdownData.length > 0 && item &&
      //   dropdownData.map((label: any) => (
      //     <Picker.Item
      //       key={label.AreaId || label.Id}
      //       label={label.Name}
      //       value={label.AreaId || label.Id}
      //     />

      //   ))}
      // </Picker>
      // <select name="select" id={`ddl${item.value}`} onChange={e => SetValue(e.target.value)}>
      //   {dropdownData.length > 0 && item &&
      //     dropdownData.map((label: any) => (
      //       <option
      //         key={label.AreaId || label.Id}
      //         value={label.AreaId || label.Id}
      //       >{label.Name}</option>

      //     ))}
      // </select>
      <Select data={dropdownData} value={GetValue} onChange={e => SetValue(e)}></Select>


    );
  } else if (type === "textArea") {
    inputControl = (
      <textarea></textarea>
    );
  } else if (type === "datePicker") {
    inputControl = (
      // <input
      //   type={"date"}
      //   value={GetValue}
      //   autoComplete="newPassword"
      //   onChange={e => SetValue(e.target.value)}
      //   disabled={!disabled}
      //   id={`dc${item.value}`}
      // ></input>
      <Input
        type={"date"}
        id={`dc${item.value}`}
        maxLength={item.maxLength}
        // autoCompleteType={"off"
        placeholder={item.placeholder ? item.placeholder : "Enter Here"}
        onChange={e => SetValue(e)}
        value={GetValue}
      />
    );
  }

  return (
    <div className={layOut === 'row' ? 'chamInput' : "chamInputColumn"} style={props.style}>
      {layOut === 'column' && <div className={'chamInputLabel'} ><span className="require">{item.require ? "*" : ""}</span><span id={`lbl${item.value}`}>{item.label}</span></div>}
      {layOut === 'row' && <div className={'chamInputLabel'} id={`lbl${item.value}`}><span className="require">{item.require ? "*" : ""}</span>{item.label} :  </div>}
      {inputControl}
    </div>
  );
};
const styles = {
  row: {
    // flexDirection: 'row',
    alignItems: 'center'
  },
  inputWrapper: {
    // flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%"
  },
  input: {
    width: "22%"
  },
  textArea: {
    width: "47%"
  },
  label: {
    marginTop: 10,
    marginBottom: 2,
    // flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  marginR: {
    marginRight: "1.5%",
    marginLeft: "1.5%"
  },
  require: {
    color: 'red',
    paddingTop: 4,
    marginRight: 2,
  }
};
