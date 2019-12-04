import React, { useState } from "react";
import { ChamInput } from ".";


interface SearchProps {
  searchConfig: any;
  onChange: (action: any) => any;
  children?: any
}
export const Search = (props: SearchProps) => {
  const FilterType: any = {}
  const [Filters, setFilters] = useState(FilterType)
  const [reset, setReset] = useState(false)

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
        props.onChange({ type, data: Filters })
        break;
    }
  }
  return (
    <div
      // style={}
      className="search"
      data-testid=""
    >
      <div className="searchMixin">{
        props.searchConfig.map((item: any) =>
          <ChamInput
            key={item.value}
            item={item}
            value={Filters[item.value] || ''}
            onChange={OnTextChange}
            layOut='row'
          // editable={this.props.editable}
          ></ChamInput>
          // <div><label>{item.label}</label><input value={item.value}></input></div>
        )

      }</div>
      {props.children && <div className="searchMixin">{props.children}</div>}
      <div className="searchBtn">
        <button onClick={() => OnSearchChange('search')}>Search</button> <button onClick={() => OnSearchChange('reset')}>Reset</button>
        <button onClick={() => OnSearchChange('expand')} id='btnExpand'>Expand</button>
      </div>
    </div>
  );
};
