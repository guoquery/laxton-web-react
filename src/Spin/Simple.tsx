import React from 'react'
// import { ringClass, planeClass, pulseClass } from '../styles/spin'
import SpinItem from './SpinItem';


const prefixCls = 'laxton-spin'

export function formatSize(size: string) {
  const ss: any = /^(\d+)([%|\w]*)$/.exec(size)
  return {
    value: parseFloat(ss[1]),
    unit: ss[2] || 'px',
  }
}



export function Ring(obj: any) {
  const { value, unit } = formatSize(obj.size)
  console.log(value, unit, 'ring>>>>>>>>', obj)
  const style = {
    borderWidth: (value / 10) + unit,
    borderTopColor: obj.color,
  }
  return <SpinItem {...obj} style={style} className={`${prefixCls}-${obj.name}`
  } />
}

export function Plane(obj: any) {
  const style = {
    backgroundColor: obj.color,
  }
  return <SpinItem {...obj} style={style} className={`${prefixCls}-${obj.name}`} />
}

export function Pulse(obj: any) {
  const style = {
    backgroundColor: obj.color,
  }
  return <SpinItem {...obj} style={style} className={`${prefixCls}-${obj.name}`} />
}
