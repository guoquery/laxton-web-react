import * as React from 'react';
// import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import { omit } from '../Tools/index';
// import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';
// import warning from '../_util/warning';
// import Icon from '../icon';
// import { tuple } from '../_util/type';
import { useState } from 'react';
import { useEffect } from 'react';
import { ChamInputType } from '../index';
//@ts-ignore
import { Select as SOSelect } from 'shineout'

// const SelectSizes = tuple('default', 'large', 'small');
type sizeType = 'default' | 'large' | 'small'

export interface AbstractSelectProps {
  prefixCls?: string;
  className?: string;
  showAction?: string | string[];
  size?: sizeType;
  notFoundContent?: React.ReactNode | null;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  placeholder?: string | React.ReactNode;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  onSearch?: (value: string) => void;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  filterOption?:
  | boolean
  | ((inputValue: string, option: React.ReactElement<OptionProps>) => boolean);
  id?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  autoClearSearchValue?: boolean;
  dropdownRender?: (menu?: React.ReactNode, props?: SelectProps) => React.ReactNode;
  loading?: boolean;
}

export interface LabeledValue {
  key: string;
  label: React.ReactNode;
}

export type SelectValue = string | string[] | number | number[] | LabeledValue | LabeledValue[];

export interface SelectProps extends AbstractSelectProps {
  renderItem?: string;
  renderResult?: string;
  optionValue?: string;
  data?: any[];
  value?: SelectValue;
  defaultValue?: SelectValue;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox' | string;
  optionLabelProp?: string;
  firstActiveValue?: string | string[];
  onChange?: (value: SelectValue, option?: React.ReactElement<any> | React.ReactElement<any>[]) => void;
  onSelect?: (value: SelectValue extends (infer I)[] ? I : SelectValue, option: React.ReactElement<any>) => void;
  onDeselect?: (value: SelectValue extends (infer I)[] ? I : SelectValue) => void;
  onBlur?: (value: SelectValue) => void;
  onFocus?: () => void;
  onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  maxTagCount?: number;
  maxTagTextLength?: number;
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: SelectValue[]) => React.ReactNode);
  optionFilterProp?: string;
  labelInValue?: boolean;
  tokenSeparators?: string[];
  getInputElement?: () => React.ReactElement<any>;
  autoFocus?: boolean;
  suffixIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  [keyName: string]: any;
  getOriginalData?: (value: any) => any
}

export interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;

}

export interface OptGroupProps {
  label?: React.ReactNode;
}

export interface SelectLocale {
  notFoundContent?: string;
}

export const Select = (props: SelectProps): any => {

  const dropdownData = props.data
  // const [dropdownData] = useState(props.data || [{ "Id": 1, "Name": "New" }, { "Id": 2, "Name": "Active" }, { "Id": 3, "Name": "Inactive" }])

  useEffect(() => {

  })
  // const [value, setValue] = useState(props.value)
  const { data, renderResult, renderItem } = props;
  const optionLabel = props.optionLabel || 'Name';
  const optionValue = props.optionValue || 'Id';

  const onChange = (e: any, original: any) => {
    // console.warn(e, "select onchange", original)
    const { getOriginalData } = props;
    // setValue(e[renderItem])
    // setValue(e)
    if (getOriginalData) {
      getOriginalData(original)
    }
    if (props.onChange && typeof props.onChange === 'function') {
      // props.onChange(e[optionValue])
      props.onChange(e)
    }
  }
  const pre = 'laxton'

  const customRenderResult = (item: any, i?: number) => {
    // console.log('Result', item, renderResult, renderItem)
    if (renderItem && !renderResult) {
      return customRenderItem(item)
    } else if (renderResult) {
      return formatStr(renderResult, item)
    }
    return `${item[optionLabel]}`
  }
  const customRenderItem = (item: any, i?: number) => {
    if (renderItem) {
      return formatStr(renderItem, item)
    }
    return `${item[optionLabel]}`
  }


  const formatStr = (str: string, item: any): string => {
    let renderStr = str;
    let regex = /[^\{][a-zA-Z0-9]+(?=\})/g;
    // let regex = /\{(.+?)\}/g;
    const arr: any = str.match(regex);
    arr.forEach((el: any) => {
      renderStr = renderStr.replace(/\{(.+?)\}/, item[el])
    })
    return renderStr
  }
  const renderSelect = () => {


    // return <select name="select" id={`ddl${props.value}`} onChange={e => onChange(e.target.value)} className={`${pre}-select`}>

    //   {dropdownData && dropdownData.length > 0 &&
    //     dropdownData.map((label: any) => (
    //       <option
    //         id={`option-${label.Name}`}
    //         className={`${pre}-option`}
    //         key={label.AreaId || label.Id}
    //         value={label.AreaId || label.Id}
    //       >{label.Name}</option>
    //     ))}
    // </select>

    return <SOSelect {...props} data={data} keygen={optionValue} onChange={onChange}
      value={props.value}
      datum={{ format: optionValue || 'Id' }}
      // format={optionValue}
      // renderItem={renderItem}
      renderResult={(item: any) => customRenderResult(item)}
      renderItem={(item: any, i: number) => customRenderItem(item, i)}
    ></SOSelect>

  }
  return (renderSelect());

}

