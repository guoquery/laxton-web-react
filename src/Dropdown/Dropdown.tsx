import * as React from 'react';
import classNames from 'classnames';
//@ts-ignore
import { Dropdown as SODropdown } from 'shineout';

type Placement = 'left-top' | 'left-bottom' | 'right-top' | 'top-left' | 'bottom-right' | 'bottom-left';
type OverlayFunc = () => React.ReactNode;
type Align = {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: {
        adjustX?: boolean;
        adjustY?: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
};
export interface DropDownProps {
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    overlay: React.ReactNode | OverlayFunc;
    onVisibleChange?: (visible: boolean) => void;
    visible?: boolean;
    disabled?: boolean;
    align?: Align;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
}

export const Dropdown = (props: DropDownProps): any => {
    const {
        trigger,
        overlay,
        visible,
        disabled,
        align,
        prefixCls,
        className,
        ...rest
    } = props;
    return (
        <SODropdown style={{ width: '100%' }} trigger={props.trigger} disabled={props.disabled}>

        </SODropdown>
    )
}

