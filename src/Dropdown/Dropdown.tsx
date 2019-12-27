import * as React from 'react';
import classNames from 'classnames';
//@ts-ignore
import { Dropdown as SODropdown } from 'shineout';

type position = 'left-top' | 'left-bottom' | 'right-top' | 'top-left' | 'bottom-right' | 'bottom-left';
type OverlayFunc = () => React.ReactNode;
type Align = {
    data?: [];
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
    data: [];
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
    position?: position;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    children?: any;
    isSub?: any;
    size?: any;
}

export const Dropdown = (props: any): any => {
    return (
        <SODropdown {...props}>
            {props.children}
        </SODropdown>
        // 11111

    )
}

