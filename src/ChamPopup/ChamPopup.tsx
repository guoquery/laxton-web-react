import React, { useEffect, useState } from "react";
import { Transition } from './Transition/Transition'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpand } from "@fortawesome/free-solid-svg-icons";
import { NewPortal } from './newPortal/newPortal'
import { Button } from "../../src/index";

interface ChamPopup {
  mask?: any,
  visible: Boolean,
  title: any,
  children: any,
  footer?: any,
  zIndex?: number,
  cancelText: string,
  okText: string,
  onCancel: (type?: any) => any,
  onOk: () => any,
  width?: any,
  maskClosable?: Boolean,
  prefixCls?: string,
  okType?: "link" | "primary" | "default" | "dashed" | "danger" | undefined, // primary
}

export const ChamPopup = (props: ChamPopup) => {
  const { title, children, cancelText, okText, width, zIndex, footer } = props;
  const maskClosable = props.maskClosable === undefined ? true : props.maskClosable;
  const mask = props.mask === undefined ? true : props.mask;
  const okType = props.okType === undefined ? 'primary' : props.okType;
  const styleSet = {
    width: width ? width : '520px',
    zIndex: zIndex ? zIndex : 100
  };
  const ZindexMask = {
    zIndex: zIndex ? zIndex - 1 : 99
  };
  const [ClassStet, setClassStet] = useState(true);
  const prefixCls = props.prefixCls === undefined ? 'laxton' : props.prefixCls;

  // 点击取消更新modal中的visible状态
  const onCancel = (type?: any) => {
    const { onCancel } = props;
    if (type === 'mask') {
      if (!maskClosable) { return false };
    }
    onCancel && onCancel()
    setClassStet(
      true
    )
  }

  // 点击确定按钮
  const onOk = () => {
    const { onOk } = props
    onOk && onOk();
    setClassStet(
      true
    )
  }

  return (
    <div>
      <NewPortal>
        {/* <Transition
                  visible={props.visible}
                  animate={true}
                  transitionName='modal'
                  // enterTimeout={10}
                  // leaveTimeout={10}
                  enterActiveTimeout={200}
                  enterEndTimeout={100}
                  leaveActiveTimeout={100}
                  leaveEndTimeout={200}
                  > */}
        {
          props.visible &&
          <div className='ChamPopup'>
            <div className={ClassStet ? `${prefixCls}-modal` : `${prefixCls}-onModal`} style={styleSet}>
              <button className={`${prefixCls}-modal-expand`}>
                <span className={`${prefixCls}-modal-expand-x`}>
                  <FontAwesomeIcon icon={faExpand} onClick={() => { setClassStet(!ClassStet) }} />
                </span>
              </button>
              <button className={`${prefixCls}-modal-close`} onClick={onCancel}>
                <span className={`${prefixCls}-modal-close-x`}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </button>
              <div className={`${prefixCls}-modal-header`}>
                <div className={`${prefixCls}-modal-title`}>{title}</div>
              </div>
              <div className={`${prefixCls}-modal-body`}>
                <div className={`${prefixCls}-modal-content`}>{children}</div>
              </div>
              {/* { (footer()!== null? footer() : false)  || */}
              <div className={`${prefixCls}-modal-footer`}>
                <Button onClick={onCancel} >{cancelText}</Button>
                <Button type={okType} onClick={onOk}>{okText}</Button>
              </div>
            </div>
            {
              mask && <div className={`${prefixCls}-mask`} style={ZindexMask} onClick={() => onCancel('mask')} ></div>
            }
          </div>
        }
        {/* </Transition> */}
      </NewPortal>
    </div>
  );
};
