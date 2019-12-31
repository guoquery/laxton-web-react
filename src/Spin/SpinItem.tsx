import React from 'react'
import classnames from 'classnames'
import { useState } from 'react';

interface SpinProps {
  className?: string,
  count?: number,
  margin?: number | string,
  render: (spinClass: any, i: number, props: any) => void,
  size?: number | string,
  spinClass?: (str: string) => any,
  style?: object,
}

export default function SpinItem(props: SpinProps) {
  const {
    size, margin, spinClass, render,
  } = props
  const count = props.count ? props.count : 0
  const className = classnames(
    // spinClass('_'),
    props.className,
  )

  const style = Object.assign(
    {
      width: size,
      height: size,
      margin,
    },
    props.style,
  )

  if (count < 1) {
    return <div style={style} className={className} />
  }

  return (
    <div style={style} className={className}>
      {range(count + 1, 1).map(i => render(className, i, props))}
    </div>
  )
}



export function range(end: number, start = 0) {
  const delta = end - start
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'))
  }
  return Array.from({ length: end - start }, (v, k) => k + start)
}

export function split(total: number, nums: any[]) {
  if (typeof total !== 'number' || total === 0) {
    console.error(new Error('total mast be a number(not equal 0)'))
  }
  let remain = 1
  let nilCount = 0
  const ratios = nums.map(n => {
    if (n) {
      const r = n / total
      remain -= n
      return r
    }
    nilCount += 1
    return null
  })

  return ratios.map(r => {
    if (!r) r = remain / nilCount
    return total * r
  })
}

export function toPrecision(num: number, precision = 12) {
  return +parseFloat(num.toPrecision(precision))
}

