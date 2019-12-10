import React, { useState } from "react";
import { ChamInput, Button } from "../../index";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface SearchProps {
  expendIndex?: number,
  searchConfig: any;
  onChange: (action: any) => any;
  children?: any;
  api?: any;
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
            api={props.api}
          // editable={this.props.editable}
          ></ChamInput>
        )
      }
    })
    return searchItem;
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
      <div className="searchItem">{renderSearchItem()}</div>
      {props.children && <div className="searchMixin">{props.children}</div>}
      <div className="searchBtn">
        <Button onClick={() => OnSearchChange('search')} type='primary'>Search</Button>
        <Button onClick={() => OnSearchChange('reset')}>Reset</Button>
        {props.searchConfig.length > expandIndex && <Button onClick={() => OnSearchChange('expand')} type='link' id='btnExpand'>{renderExpendButton()}</Button>}
      </div>
    </div>
  );
};
