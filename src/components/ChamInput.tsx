// import calendar style
// You can customize style by copying asset folder.
// import "@y0c/react-datepicker/assets/styles/calendar.scss";

import React, { useContext, useEffect, useState } from "react";
// import { Picker, StyleSheet, text, TextInput, View } from "react-native";
// import { api } from "../service/api.service";
export interface ChamInputItem {
  label: string;
  type?: "text" | "dropDown" | "textArea" | "datePicker";
  value: string;
  require?: boolean;
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
  des?: string;

  /**dropDown***/
}

interface ChamInputProps {
  item: ChamInputItem;
  value: any;
  style?: any;
  placeholder?: string;
  clearValue?: boolean;
  editable?: boolean;
  onChange?: (value: any) => void;
  layOut?: 'row' | 'column'
}

export const ChamInput = (props: ChamInputProps) => {
  const [layOut] = useState(props.layOut || 'column');
  const [dropdownData, setDropdownData] = useState([]);
  const [editable, setEditable] = useState((props.editable === undefined ? true : props.editable));
  const GetDropdownData = async (item: ChamInputItem): Promise<any> => {
    // if (item.type != 'dropDown') { return }
    // if (item.linkage === 0 || item.linkage) {
    //   const parentAreaID = item.linkage ? store[item.linkage] : 0;
    //   if (parentAreaID === 0 || parentAreaID) {
    //     const res = await api.get(`api/applicantArea/GetSelect?parentAreaID=${parentAreaID}`);
    //     if (res.Result) {
    //       setDropdownData(res.Data);
    //     }
    //     console.log(res.Data)
    //   }
    // } else if (item.apiUrl) {
    //   const res = await api.post(item.apiUrl, {});
    //   if (res.Result) {
    //     setDropdownData(res.Data.Items);
    //   }
    // } else if (item.typeCode) {
    //   let url = `api/Common/GetDropdownData?typeCode=`;
    //   if (item.des) {
    //     url = `api/Common/GetDropdownDataDescription?typeCode=`;
    //   }
    //   const res = await api.get(`${url}${item.typeCode}`);
    //   if (res.Result) {
    //     setDropdownData(res.Data);
    //   }
    // }
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
    if (!editable) {
      return editable
    }
    let enabled = true;
    if (item.linkage) {
      // enabled = !!store[item.linkage];
    }
    return enabled;
  };

  const SetValue = (value: any): void => {
    // store[key] = value;
    // console.log('set>>>>>1111', GetValue, store)
    // SetValueState(value)
    if (props.onChange) {
      // console.log('set>>>>>22222', GetValue)
      props.onChange({ [item.value]: value })
    }
  }
  if (type === undefined || type === "text") {
    inputControl = (
      <input
        type={item.type}
        id={`txt${item.value}`}
        maxLength={item.maxLength}
        // autoCompleteType={"off"
        placeholder={item.placeholder ? item.placeholder : "Enter Here"}
        onChange={e => SetValue(e.target.value)}
        value={GetValue}
      />
    );
  } else if (type === "dropDown") {
    // inputControl = (
    //   <Picker
    //     testID={`ddl${item.value}`}
    //     prompt="Choose Here"
    //     selectedValue={GetValue}
    //     style={{ height: 26 }}
    //     enabled={DropdownEnabled(item)}
    //     onValueChange={(value, itemIndex) => SetValue(value, item.value)}
    //   >
    //     {dropdownData.length > 0 && item &&
    //       dropdownData.map((label: any) => (
    //         <Picker.Item
    //           key={label.AreaId || label.Id}
    //           label={label.Name}
    //           value={label.AreaId || label.Id}
    //         />

    //       ))}
    //   </Picker>
    // );
  } else if (type === "textArea") {
    // inputControl = (
    //   <TextInput
    //     testID={`txt${item.value}`}
    //     editable={editable}
    //     multiline={true}
    //     style={{
    //       height: 60,
    //       borderColor: "gray",
    //       borderWidth: 1,
    //       backgroundColor: "#fff",
    //       zIndex: -100000
    //     }}
    //     onChangeText={value => SetValue(value, item.value)}
    //     value={GetValue}
    //   />
    // );
  } else if (type === "datePicker") {
    inputControl = (
      // <Button
      //     onPress={this.onDateChange}
      //     title={'date'}
      //     color="#8BC34A"
      //     accessibilityLabel="Add about this button"
      // />
      // <DatePicker onChange={day => (this.store[item.value] = day)} />
      <input
        type={"date"}
        value={GetValue}
        autoComplete="newPassword"
        onChange={e => SetValue(e.target.value)}
        disabled={!editable}
        id={`dc${item.value}`}
      ></input>
    );
  }

  return (
    <div className={layOut === 'row' ? 'chamInput' : "chamInput"}>
      {layOut === 'column' && <div style={styles.label}><text style={styles.require}>{item.require ? "*" : ""}</text><text id={`lbl${item.value}`}>{item.label}</text></div>}
      {layOut === 'row' && <div id={`lbl${item.value}`}>{item.label} :  </div>}
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
