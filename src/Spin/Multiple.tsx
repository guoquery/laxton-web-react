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

function simpleRender(classname: (arg0: string) => string | undefined, i: string | number | undefined, { color, itemStyle }: any) {
  const style = Object.assign({ backgroundColor: color }, itemStyle)
  return (
    <div
      key={i}
      style={style}
      className={classname('item')}
    />
  )
}

function multRenderDiv(className: string | undefined, i: string | number | undefined, { color, itemStyle, }: any) {
  const style = Object.assign({ backgroundColor: color }, itemStyle)
  return (
    <div key={i} className={`${className}-item`}>
      <div style={style} />
    </div>
  )
}

export const Default = (prop: any) => {
  const { value, unit } = formatSize(prop.size)
  const size = Math.ceil(value / 12.5) + unit
  return (
    <SpinItem
      {...prop}
      count={12}
      itemStyle={{ width: size, borderRadius: size }}
      className={`${prefixCls}-default`}
      render={multRenderDiv}
    />
  )
}