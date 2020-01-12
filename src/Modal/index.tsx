import * as React from 'react';
import { useState, Children } from 'react';
import { useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpand } from "@fortawesome/free-solid-svg-icons";
//@ts-ignore
import { Modal as SOModal } from 'shineout'
import { Button } from "../index";

interface ModalProps {
  mask?: any,
  visible: Boolean,
  usePortal?: Boolean,
  title?: any,
  children: any,
  footer?: any,
  zIndex?: number,
  cancelText?: string,
  okText?: string,
  onCancel?: (type?: any) => any,
  onOk?: (e?: any) => any,
  onChange?: (e: any) => any
  width?: any,
  maskClosable?: Boolean,
  prefixCls?: string,
  okType?: "link" | "primary" | "default" | "dashed" | "danger" | undefined, // primary
}
export const Modal = (props: ModalProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { title, children, usePortal = true, cancelText = "Cancel", okText = "Confirm", width, zIndex, footer, okType = 'primary' } = props;
  const prefixCls = props.prefixCls === undefined ? 'laxton' : props.prefixCls;


  const onChange = (type: 'ok' | 'cancel') => {

    switch (type) {
      case 'ok':
        const { onOk } = props
        onOk && onOk();
        break;
      case 'cancel':
        const { onCancel } = props
        onCancel && onCancel();
        break;
    }
    console.log('ok', type)
    if (props.onChange) {
      props.onChange({ type })
    }

  }
  const renderTitle = () => {
    setTimeout(() => {
      const close = document.getElementsByClassName('so-modal-close')[0]
      close ? close.remove() : ''
    }, 20);
    return (
      <div className={`${prefixCls}-modal-header`}>
        <div className={`${prefixCls}-modal-title`}>
          <div>
            <span>{title}</span>
          </div>
          <div>
            <span className={`${prefixCls}-modal-title-x`} onClick={() => setFullScreen(!fullScreen)}>
              <FontAwesomeIcon icon={faExpand} />
            </span>
            <span className={`${prefixCls}-modal-title-x`} onClick={() => onChange('cancel')} >
              <FontAwesomeIcon icon={faTimes} />
            </span>

          </div>
        </div>
      </div >
    )

  }
  const renderFooter = () => {

    return (
      <div className={`${prefixCls}-modal-footer`}>
        <Button onClick={() => onChange('cancel')} >{cancelText}</Button>
        <Button type={okType} onClick={() => onChange('ok')}>{okText}</Button>
      </div>
    )

  }

  return (
    <SOModal
      className={!fullScreen ? `${prefixCls}-modal` : `${prefixCls}-onModal`}
      visible={props.visible}
      // maskCloseAble={false}
      // width={500}
      usePortal={usePortal}
      title={renderTitle()}
      onClose={() => onChange('cancel')}
      footer={renderFooter()}
    >
      {props.children}
    </SOModal>
  )

}