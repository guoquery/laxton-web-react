import React, { useEffect, useState } from "react";
import './style/index.less';
import { Transition } from './Transition/Transition'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faTimes, faExpand } from "@fortawesome/free-solid-svg-icons";
import { NewPortal } from './newPortal/newPortal'

export const ChamPopup = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [ClassStet, setClassStet] = useState(true);


  //  useEffect(()=>{
  //   setClassStet(true)
  //  },[]);

  // 点击取消更新modal中的visible状态
  const onCancel = () => {
    const { onCancel } = props;
    onCancel && onCancel()
    setVisible(
      false
    );
    setClassStet(
      true
    )
    console.log(visible);
  }

  // 点击确定按钮
  const onOk = () => {
    const { onOk } = props
    onOk && onOk();
    setVisible(
      false
    )
    setClassStet(
      true
    )
  }

  const { title, children, cancelText, okText, mask, width } = props;
  // const widthStle = {
  //   width: width ? width : '100px'
  // }
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
            <div className={ClassStet ? 'modal' : 'onModal'} >
              <button className='ant-modal-expand'>
                <span className='ant-modal-expand-x'>
                  <FontAwesomeIcon icon={faExpand} onClick={() => { setClassStet(!ClassStet) }} />
                </span>
              </button>
              <button className='ant-modal-close' onClick={onCancel}>
                <span className='ant-modal-close-x'>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </button>
              <div className='ant-modal-header'>
                <div className='ant-modal-title'>{title}</div>
              </div>
              <div className='ant-modal-body'>
                <div className='modal-content'>{children}</div>
              </div>
              <div className='ant-modal-footer'>
                <button
                  onClick={onCancel}
                  className='ant-btn'
                >{cancelText}</button>
                <button
                  onClick={onOk}
                  className='ant-btn ant-btn-primary'
                >{okText}</button>
              </div>
            </div>
            {
              mask && <div className='mask' onClick={onCancel} ></div>
            }
          </div>
        }
        {/* </Transition> */}
      </NewPortal>
    </div>
  );
};
