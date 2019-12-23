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
import { ChamInputItem } from '../index';
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
  [keyName: string]: any
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
  const [value, setValue] = useState(props.value)
  const { renderResult, data } = props;
  const renderItem = props.renderItem || 'Name';
  const optionValue = props.optionValue || 'Id';
  const onChange = (e: any) => {
    setValue(e[renderItem])
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(e[optionValue])
    }
  }
  const pre = 'laxton'
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

    return <SOSelect {...props} data={data} keygen={renderItem} value={value ? value : undefined} onChange={(e: any) => onChange(e)} renderItem={renderItem} renderResult={(d: any) => 'abc'}></SOSelect>

  }
  return (renderSelect());

}

