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
  // const getNotFoundContent =(renderEmpty: RenderEmptyHandler)=> {
  //   const { notFoundContent } = props;
  //   if (notFoundContent !== undefined) {
  //     return notFoundContent;
  //   }

  //   if (this.isCombobox()) {
  //     return null;
  //   }

  //   return renderEmpty('Select');
  // }

  // const saveSelect = (node: any) => {
  //   rcSelect = node;
  // };

  // const focus = () => {
  //   rcSelect.focus();
  // }

  // const blur = () => {
  //   rcSelect.blur();
  // }

  // const isCombobox = () => {
  //   const { mode } = props;
  //   return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  // }

  // renderSuffixIcon(prefixCls: string) {
  //   const { loading, suffixIcon } = this.props;
  //   if (suffixIcon) {
  //     return React.isValidElement<{ className?: string }>(suffixIcon)
  //       ? React.cloneElement(suffixIcon, {
  //         className: classNames(suffixIcon.props.className, `${prefixCls}-arrow-icon`),
  //       })
  //       : suffixIcon;
  //   }
  //   if (loading) {
  //     return <Icon type="loading" />;
  //   }
  //   return <Icon type="down" className={`${prefixCls}-arrow-icon`} />;
  // }

  // const renderSelect = ({
  //   getPopupContainer: getContextPopupContainer,
  //   getPrefixCls,
  //   renderEmpty,
  // }) => {
  //   const {
  //     prefixCls: customizePrefixCls,
  //     className = '',
  //     size,
  //     mode,
  //     getPopupContainer,
  //     removeIcon,
  //     clearIcon,
  //     menuItemSelectedIcon,
  //     showArrow,
  //     ...restProps
  //   } = props;
  //   const rest = omit(restProps, ['inputIcon']);

  //   const prefixCls = getPrefixCls('select', customizePrefixCls);
  //   const cls = classNames(
  //     {
  //       [`${prefixCls}-lg`]: size === 'large',
  //       [`${prefixCls}-sm`]: size === 'small',
  //       [`${prefixCls}-show-arrow`]: showArrow,
  //     },
  //     className,
  //   );

  //   let { optionLabelProp } = this.props;
  //   if (this.isCombobox()) {
  //     // children 带 dom 结构时，无法填入输入框
  //     optionLabelProp = optionLabelProp || 'value';
  //   }

  //   const modeConfig = {
  //     multiple: mode === 'multiple',
  //     tags: mode === 'tags',
  //     combobox: this.isCombobox(),
  //   };

  //   const finalRemoveIcon = (removeIcon &&
  //     (React.isValidElement<{ className?: string }>(removeIcon)
  //       ? React.cloneElement(removeIcon, {
  //         className: classNames(removeIcon.props.className, `${prefixCls}-remove-icon`),
  //       })
  //       : removeIcon)) || <Icon type="close" className={`${prefixCls}-remove-icon`} />;

  //   const finalClearIcon = (clearIcon &&
  //     (React.isValidElement<{ className?: string }>(clearIcon)
  //       ? React.cloneElement(clearIcon, {
  //         className: classNames(clearIcon.props.className, `${prefixCls}-clear-icon`),
  //       })
  //       : clearIcon)) || (
  //       <Icon type="close-circle" theme="filled" className={`${prefixCls}-clear-icon`} />
  //     );

  //   const finalMenuItemSelectedIcon = (menuItemSelectedIcon &&
  //     (React.isValidElement<{ className?: string }>(menuItemSelectedIcon)
  //       ? React.cloneElement(menuItemSelectedIcon, {
  //         className: classNames(
  //           menuItemSelectedIcon.props.className,
  //           `${prefixCls}-selected-icon`,
  //         ),
  //       })
  //       : menuItemSelectedIcon)) || <Icon type="check" className={`${prefixCls}-selected-icon`} />;

  //   return (
  //     <RcSelect
  //       inputIcon={this.renderSuffixIcon(prefixCls)}
  //       removeIcon={finalRemoveIcon}
  //       clearIcon={finalClearIcon}
  //       menuItemSelectedIcon={finalMenuItemSelectedIcon}
  //       showArrow={showArrow}
  //       {...rest}
  //       {...modeConfig}
  //       prefixCls={prefixCls}
  //       className={cls}
  //       optionLabelProp={optionLabelProp || 'children'}
  //       notFoundContent={this.getNotFoundContent(renderEmpty)}
  //       getPopupContainer={getPopupContainer || getContextPopupContainer}
  //       ref={this.saveSelect}
  //     />
  //   );
  // };
  const dropdownData = props.data
  // const [dropdownData] = useState(props.data || [{ "Id": 1, "Name": "New" }, { "Id": 2, "Name": "Active" }, { "Id": 3, "Name": "Inactive" }])

  useEffect(() => {

  })

  // const GetDropdownData = async (item: ChamInputItem): Promise<any> => {
  //   if (item.type != 'dropDown') { return }
  //   if (item.linkage === 0 || item.linkage) {
  //     const parentAreaID = item.linkage ? store[item.linkage] : 0;
  //     if (parentAreaID === 0 || parentAreaID) {
  //       const res = await api.get(`api/applicantArea/GetSelect?parentAreaID=${parentAreaID}`);
  //       if (res.Result) {
  //         setDropdownData(res.Data);
  //       }
  //       console.log(res.Data)
  //     }
  //   } else if (item.apiUrl) {
  //     const res = await api.post(item.apiUrl, {});
  //     if (res.Result) {
  //       setDropdownData(res.Data.Items);
  //     }
  //   } else if (item.typeCode) {
  //     let url = `api/Common/GetDropdownData?typeCode=`;
  //     if (item.des) {
  //       url = `api/Common/GetDropdownDataDescription?typeCode=`;
  //     }
  //     const res = await api.get(`${url}${item.typeCode}`);
  //     if (res.Result) {
  //       setDropdownData(res.Data);
  //     }
  //   }
  // };

  const onChange = (value: any) => {
    console.log(value)
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(value)
    }
  }
  const pre = 'laxton'
  const renderSelect = () => {

    return <select name="select" id={`ddl${props.value}`} onChange={e => onChange(e.target.value)} className={`${pre}-select`}>
      {dropdownData && dropdownData.length > 0 &&
        dropdownData.map((label: any) => (
          <option
            key={label.AreaId || label.Id}
            value={label.AreaId || label.Id}
          >{label.Name}</option>
        ))}
    </select>

  }
  return (renderSelect());

}

