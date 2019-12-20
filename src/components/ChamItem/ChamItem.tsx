import React, { useState } from "react";
import { ChamInput, Button } from "../../index";
//@ts-ignore
import { Grid } from 'shineout'

interface ChamItemProps {
  values: any;
  expandIndex?: number,
  chamItemConfig: any;
  onChange: (action: any) => any;
  children?: any;
  api?: any;
  layOut?: 'row' | 'column';
  width?: string | number;
  gutter?: number;
}
export const ChamItem = (props: ChamItemProps) => {
  const FilterType: any = {}
  const { values } = props;
  // const [Filters, setFilters] = useState(FilterType)
  const expandIndex = props.expandIndex

  const OnTextChange = (e: any) => {
    console.log(e, 'OnTextChange');
    props.onChange(e)
  }
  const IfDisabled = (item: any) => {
    if (item.iif && typeof item.iif === 'function') {
      return item.iif()
    }
  }
  const renderChamItemItem = () => {
    let ChamItemItem: any = [];
    props.chamItemConfig.map((item: any, index: number) => {
      if (!expandIndex || (index < expandIndex)) {
        if (item.linkage) {
          // console.log(item, item.linkage, '>>>>>>><<<<<<<<<<<<')
          let obj: any = {};
          obj[item.linkage] = undefined;
        }
        ChamItemItem.push(
          <Grid width={props.width || (1 / 4)} key={item.value + index}>
            <ChamInput
              item={item}
              value={values[item.value] || ''}
              onChange={OnTextChange}
              layOut={props.layOut}
              api={props.api}
              // width={props.width}
              disabled={IfDisabled(item)}
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
