import React, { useState, useEffect } from "react";
import { ChamInput, Button, ChamItem } from "../../index";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//@ts-ignore
import { Grid } from 'shineout'

interface SearchProps {
  expendIndex?: number,
  searchConfig: any;
  onChange: (action: any) => any;
  children?: any;
  api?: any;
  icon?: any;
  layOut?: 'row' | 'column';
  width?: string | number;
  gutter?: number;
  filters?: any;
  // defaultValues?: any;
}
export const Search = (props: SearchProps) => {
  const FilterType: any = {}
  const [Filters, setFilters] = useState(props.filters || { FirstName: '888' })
  const [expandIndex, setExpendIndex] = useState(props.expendIndex || 3)
  const OnTextChange = (e: any) => {
    console.log(e, 'OnTextChange1111111');
    setFilters({ ...Filters, ...e })
  }
  const OnSearchChange = (type: 'search' | 'reset' | 'expand') => {
    // console.log(Filters, '>>>>>>>>>>>')
    switch (type) {
      case 'search':
        if (Object.keys(Filters).length > 0) {
          props.onChange({ type, data: Filters })
        }
        break;
      case 'reset':
        setFilters({})
        props.onChange({ type, data: {} })
        break;
      case 'expand':
        // props.onChange({ type, data: Filters })
        if (expandIndex) {
          setExpendIndex(0)
        } else {
          setExpendIndex(props.expendIndex || 3)
        }
        break;
    }
  }
  const IfDisabled = (item: any) => {
    if (item.iif && typeof item.iif === 'function') {
      return item.iif()
    }
  }


  const renderExpendButton = () => {
    const btn = expandIndex === 0 ? 'Collapse' : 'Expend';
    const icon = expandIndex === 0 ? faAngleUp : faAngleDown;
    return (<span>
      <span style={{ marginRight: '8px' }}>{btn}</span>
      <FontAwesomeIcon icon={icon} size="lg" />
    </span >)
  }
  return (
    <div className="search" id="search">
      <ChamItem values={Filters} expandIndex={expandIndex} chamItemConfig={props.searchConfig} onChange={OnTextChange} gutter={props.gutter || 40} width={props.width || (1 / 4)} api={props.api}></ChamItem>
      {props.children && <div className="searchMixin">{props.children}</div>}
      <div className="searchBtn">
        <Button onClick={() => OnSearchChange('search')} type='primary'>Search</Button>
        <Button onClick={() => OnSearchChange('reset')}>Reset</Button>
        {props.searchConfig.length > expandIndex && <Button onClick={() => OnSearchChange('expand')} type='link' id='btnExpand'>{renderExpendButton()}</Button>}
      </div>
    </div>
  );
};
