import React, { useState } from "react";
import { ChamInput, Button } from "../index";


interface SearchProps {
  expendIndex?: number,
  searchConfig: any;
  onChange: (action: any) => any;
  children?: any
}
export const Search = (props: SearchProps) => {
  const FilterType: any = {}
  const [Filters, setFilters] = useState(FilterType)
  const [expandIndex, setExpendIndex] = useState(props.expendIndex || 3)

  const OnTextChange = (e: any) => {
    console.log(e, 'OnTextChange');
    setFilters({ ...Filters, ...e })
    // setQ({
    //   ...q,
    //   ...{ Filters: { ...q.Filters, ...e } },
    // });
  }
  const OnSearchChange = (type: 'search' | 'reset' | 'expand') => {
    console.log(Filters, '>>>>>>>>>>>')
    switch (type) {
      case 'search':
        props.onChange({ type, data: Filters })
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
  const renderSearchItem = () => {
    let searchItem: any = [];
    props.searchConfig.map((item: any, index: number) => {
      if (!expandIndex || (index < expandIndex)) {
        searchItem.push(
          <ChamInput
            key={item.value + index}
            item={item}
            value={Filters[item.value] || ''}
            onChange={OnTextChange}
            layOut='row'
          // editable={this.props.editable}
          ></ChamInput>
        )
      }
    })
    return searchItem;
  }
  return (
    <div className="search" id="search">
      <div className="searchItem">{renderSearchItem()}</div>
      {props.children && <div className="searchMixin">{props.children}</div>}
      <div className="searchBtn">
        <Button onClick={() => OnSearchChange('search')} type='primary'>Search</Button>
        <Button onClick={() => OnSearchChange('reset')}>Reset</Button>
        <Button onClick={() => OnSearchChange('expand')} type='danger' id='btnExpand'>Expand</Button>
      </div>
    </div>
  );
};
