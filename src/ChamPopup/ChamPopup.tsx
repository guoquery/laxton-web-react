import React, { useEffect, useState } from "react";
import './style/index.less';
import {Transition} from './Transition/Transition'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faTimes, faExpand } from "@fortawesome/free-solid-svg-icons";
import {NewPortal} from './newPortal/newPortal'

export const ChamPopup = (props:any) => {
   const [visible, setVisible] = useState(false);

  //  useEffect(()=>{
  //    if(props.visible !== visible) {
  //      setVisible(
  //         props.visible
  //      )
  //    }
  //    console.log(visible,props,'useEffect')
  //  },[]);
   
  // 点击取消更新modal中的visible状态
  const closeModal = () => {
    const { onClose } = props;
    onClose && onClose()
    setVisible(
      false
    );
    console.log('点击取消啦!',visible,onClose);
  }

   // 点击确定按钮
  const confirm = () => {
      console.log('点击确定啦!');
      const { confirm } = props
      confirm && confirm();
      setVisible(
        false
      )
   }

  // 点击蒙层
 const maskClick = () => {
      console.log('点击蒙层啦!');
      const { maskClick } = props
      maskClick && maskClick();
      setVisible(
        false
      )
  }
  const { title, children} = props;
  return (
    <div>
          <NewPortal>
                <Transition
                  visible={props.visible}
                  animate={true}
                  transitionName='modal'
                  // enterTimeout={10}
                  // leaveTimeout={10}
                  enterActiveTimeout={200}
                  enterEndTimeout={100}
                  leaveActiveTimeout={100}
                  leaveEndTimeout={200}
                  >
                    <div className='ChamPopup'>
                     <div className='modal'>
                          <button className='ant-modal-expand'>
                            <span className='ant-modal-expand-x'>
                              <FontAwesomeIcon icon={faExpand} />
                            </span>
                          </button>
                          <button className='ant-modal-close' onClick={closeModal}>
                            <span className='ant-modal-close-x'>
                              <FontAwesomeIcon  icon={faTimes}/>
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
                              onClick={closeModal}
                              className='ant-btn'
                              >Cancel</button>
                              <button 
                              onClick={confirm}
                              className='ant-btn ant-btn-primary'
                              >Determine</button>
                          </div>
                      </div>
                      <div className='mask' onClick={maskClick} ></div>
                    </div>
                </Transition>
            </NewPortal>
    </div>
  );
};
