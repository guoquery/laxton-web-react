


import React,{useEffect, useState,useRef} from 'react';
// 这里引入classnames处理类名的拼接
import classnames from 'classnames';
// 过渡时间不传入默认为0; defaultProps设置默认参数 interface
interface defaultProps {
  // animate: true,
  // visible: false,
  animate: Boolean,
  // visible: any,
  transitionName: String,
  // appearTimeout: Number,
  // appearActiveTimeout: Number,
  // appearEndTimeout: Number,
  // enterTimeout: Number,
  enterActiveTimeout: Number,
  enterEndTimeout: Number,
  // leaveTimeout: Number,
  leaveEndTimeout: Number,
  leaveActiveTimeout: Number,
  children: any
}
   
export const Transition = (props: any)=>{
  const [visible, setVisible] = useState(false);
  const [classes, setClasses] = useState('');
  

  useEffect(()=>{
    const { transitionName, animate, visible } = props
    console.log(visible,animate,1111)
    if (!animate) {
      setVisible(visible)
      return
    }
    if (!props.visible) {
      leaveAnimate(props, transitionName)
    } else {
      enterAnimate(props, transitionName)
    }
  },[props.visible]);
       

   // 入场动画
  const enterAnimate = (props:any, transitionName:any) => {
    const { visible, enterTimeout, enterActiveTimeout, enterEndTimeout } = props
    const { initClasses, activeClasses, endClasses } = getClasses('enter', transitionName)
    setVisible(visible);
    setClasses(initClasses)
    const enterTimer = setTimeout(() => {
      setClasses(activeClasses)
      clearTimeout(enterTimer)
    }, enterTimeout)
    const enterActiveTimer = setTimeout(() => {
      setClasses(endClasses)
      clearTimeout(enterActiveTimer)
    }, enterActiveTimeout + enterTimeout)
    const enterEndTimer = setTimeout(() => {
      setClasses('');
      clearTimeout(enterEndTimer)
    }, enterEndTimeout + enterActiveTimeout + enterTimeout)
  }
 
  // 出场动画
  const leaveAnimate = (props:any, transitionName: any) => {
    const { visible, leaveTimeout, leaveActiveTimeout, leaveEndTimeout } = props
    const { initClasses, activeClasses, endClasses } = getClasses('leave', transitionName)
    setClasses(initClasses)
    const leaveTimer = setTimeout(() => {
      setClasses(activeClasses);
      clearTimeout(leaveTimer)
    }, leaveTimeout)
    const leaveActiveTimer = setTimeout(() => {
      setClasses(endClasses)
      clearTimeout(leaveActiveTimer)
    }, leaveActiveTimeout + leaveTimeout)
    const leaveEndTimer = setTimeout(() => {
      console.log(visible);
      setVisible(visible);
      setClasses('');
      clearTimeout(leaveEndTimer)
    }, leaveEndTimeout + leaveActiveTimeout + leaveTimeout)
  }
 
  // 类名统一配置
  const getClasses = (type:any, transitionName: any) => {
    const initClasses = classnames({
      [`${transitionName}-appear`]: type === 'appear',
      [`${transitionName}-enter`]: type === 'enter',
      [`${transitionName}-leave`]: type === 'leave',
    })
    const activeClasses = classnames({
      [`${transitionName}-appear-active`]: type === 'appear',
      [`${transitionName}-enter-active`]: type === 'enter',
      [`${transitionName}-leave-active`]: type === 'leave',
    })
    const endClasses = classnames({
      [`${transitionName}-appear-end`]: type === 'appear',
      [`${transitionName}-enter-end`]: type === 'enter',
      [`${transitionName}-leave-end`]: type === 'leave',
    })
    return { initClasses, activeClasses, endClasses }
  }

 const cloneChildren = () => {
    // const { classes } = classes

    const children = props.children
    const className = children.props.className
    
    if (!visible) {
      return null
    }
    // 通过React.cloneElement给子元素添加额外的props，
    return React.cloneElement(
      children,
      { className: `${className} ${classes}` }
    )
  }

    return (
      cloneChildren()
    )

}