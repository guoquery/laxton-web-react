import React, { useState, useEffect } from "react";
import { ChamInput, Button, ChamInputType } from "../../index";
//@ts-ignore
import { Grid } from 'shineout'

export interface chamItemConfig extends ChamInputType {
  useOriginalData?: boolean | string
}

interface ChamItemProps {
  values: any;
  expandIndex?: number,
  chamItemConfig: any;
  onChange: (action: any) => any;
  onValidateChange?: (action: any) => any;
  getSelectOriginalData?: (action: any, data?: any) => any;
  children?: any;
  api?: any;
  layOut?: 'row' | 'column';
  width?: string | number;
  gutter?: number;
  [key: string]: any;
  // item: ChamInputType;
  style?: any;
  disabled?: boolean;
}
export const ChamItem = (props: ChamItemProps) => {
  const FilterType: any = {}
  const { values, chamItemConfig } = props;


  // console.log(values, 'ChamItem>>>>>>>>>>>>>>>>')
  const [validateResult, setValidateResult] = useState({} as any)

  useEffect(() => {
    // let finallyResult = true;
    let finallyResult = !chamItemConfig.some((item: ChamInputType, i: number) => {
      if (item.require) {
        // console.log('validateResult8888', validateResult)
        if (!validateResult[item.value]) {
          return true
        }
      }
    });
    if (typeof props.onValidateChange === 'function') {
      props.onValidateChange(finallyResult)
    }
    // console.error(finallyResult, 'finallyResult', validateResult)
  }, [validateResult])
  const expandIndex = props.expandIndex

  const OnTextChange = (e: any) => {
    if (e && typeof e === 'object') {


      // if (values[Object.keys(e)[0]] == Object.values(e)[0]) {
      // console.error(e, 'OnTextChange888888', values);
      //   return
      // } else {
      // }
    }
    props.onChange(e)


  }
  const onValidateChange = (e: any) => {
    // console.log(e, 'onValidateChange chamitem', chamItemConfig);
    if (!e) { return }
    const { value, result } = e;
    setValidateResult({ ...validateResult, ...{ [value]: result } })

    // props.onChange(e)
  }
  const IfDisabled = (item: any) => {
    if (item.iif && typeof item.iif === 'function') {
      return item.iif()
    }
    return item.disabled
  }
  const getSelectOriginalData = (e: any, item: chamItemConfig) => {
    console.log(item)
    if (props.getSelectOriginalData) {
      if (item.useOriginalData) {
        props.getSelectOriginalData({ [item.value]: e[typeof item.useOriginalData === 'boolean' ? 'Name' : item.useOriginalData + ''] }, e)
      }
    }
  }
  const renderChamItemItem = () => {
    let ChamItemItem: any = [];
    chamItemConfig.map((item: chamItemConfig, index: number) => {
      if (!expandIndex || (index < expandIndex)) {
        if (item.linkage) {
          // console.log(item, item.linkage, '>>>>>>><<<<<<<<<<<<')
          let obj: any = {};
          obj[item.linkage] = undefined;
        }
        // console.log(values, item.value, values[item.value])
        ChamItemItem.push(
          <Grid width={props.width || (1 / 4)} key={item.value + index}>
            <ChamInput
              item={item}
              value={values[item.value]}
              values={values}
              onChange={OnTextChange}
              onValidateChange={onValidateChange}
              layOut={props.layOut}
              api={props.api}
              // width={props.width}
              disabled={IfDisabled(item)}
              getSelectOriginalData={(e: any) => item.type === 'dropDown' && item.useOriginalData ? getSelectOriginalData(e, item) : undefined}
            ></ChamInput>
          </Grid>
        )
      }
    })
    return ChamItemItem;
  }

  return (
    <div id="ChamItem" style={{ width: '100%' }}>
      <div className="ChamItemItem">
        <Grid gutter={props.gutter || 20}>{renderChamItemItem()}</Grid>
      </div>
      {props.children && <div className="ChamItemMixin">{props.children}</div>}
    </div>
  );
};
