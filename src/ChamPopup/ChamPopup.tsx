import React, { useEffect, useState } from "react";
import './style/index.less';
import {Transition} from './Transition/Transition'
// import { NewPortal } from '../../src/index'
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
    <div className='ChamPopup'>
          <NewPortal>
                <Transition
                  visible={props.visible}
                  animate={true}
                  transitionName='modal'
                  enterActiveTimeout={200}
                  enterEndTimeout={100}
                  leaveActiveTimeout={100}
                  leaveEndTimeout={200}
                  >
                    <div>
                     <div className='modal'>
                          {/* 这里使用父组件的title */}
                          <div className='modal-title'>{title}</div>
                          {/* 这里的content使用父组件的children */}
                          <div className='modal-content'>{children}</div>
                          <div className='modal-operator'>
                              <button 
                              onClick={closeModal}
                              className='modal-operator-close'
                              >取消</button>
                              <button 
                              onClick={confirm}
                              className='modal-operator-confirm'
                              >确定</button>
                          </div>
                      </div>
                      <div className='mask' onClick={maskClick} ></div>
                    </div>
                </Transition>
            </NewPortal>
    </div>
  );
};
