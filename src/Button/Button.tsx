import React, { useState } from "react";
import classNames from "classnames";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonTypes = 'primary' | 'default' | 'dashed' | 'danger' | 'link';
type sizeTypes = 'small' | 'large';
type ButtonShapes = 'circle' | 'circle-outline' | 'round';

interface ButtonProps {
    children?: any;
    onClick?: (action: any) => any;
    prefixCls?: string;
    type?: ButtonTypes
    id?: string;
    size?: sizeTypes;
    className?: string;
    loading?: boolean | { delay?: number };
    icon?: any;
    shape?: ButtonShapes;
    disabled?: boolean;
}
export const Button = (props: ButtonProps) => {
    const {
        // shape,
        size,
        className,
        children,
        shape,
        // icon,
        // ghost,
        // block,
        ...rest
    } = props;

    const type = props.type || 'default';
    const prefixCls = props.prefixCls || 'laxton-btn';
    const loading = props.loading || false;
    const icon = props.icon;
    const disabled = props.disabled ||  false;


    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        default:
            break;
    }
    const iconType = loading ? faSpinner : icon;
    const renderExpendButton = () => {
        return (<FontAwesomeIcon icon={iconType} size="lg" />)
    }
    const OnClick = (e: any) => {
        if (props.onClick) {
            props.onClick(e)
        }
    }
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-${sizeCls}`]: sizeCls,
        [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
        [`${prefixCls}-loading`]: !!loading,
        // [`${prefixCls}-background-ghost`]: ghost,
        // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
        // [`${prefixCls}-block`]: block,
    });

    return (
        <button className={classes} id={`btn_${props.children}`} onClick={(e: any) => OnClick(e)} disabled={props.disabled}>
            <i className={loading?'loading-spinner':undefined}>{renderExpendButton()}</i>
            <span>{props.children}</span>
        </button>
    );
};
