import React from 'react'

import {
  // ChasingDots,
  // DoubleBounce,
  // ThreeBounce,
  // ScaleCircle,
  // FadingCircle,
  // CubeGrid,
  // ChasingRing,
  // Wave,
  // FourDots,
  Default,
} from './Multiple'
// import { Ring } from './Simple'
import { Ring, Plane, Pulse } from './Simple'
import classNames from 'classnames'

const defaultColor = '#6c757d'
const prefixCls = 'laxton-spin'

const spins: any = {
  plane: Plane,
  pulse: Pulse,
  ring: Ring,
  // wave: Wave,
  default: Default,
  // 'chasing-ring': ChasingRing,
  // 'chasing-dots': ChasingDots,
  // 'cube-grid': CubeGrid,
  // 'double-bounce': DoubleBounce,
  // 'fading-circle': FadingCircle,
  // 'four-dots': FourDots,
  // 'scale-circle': ScaleCircle,
  // 'three-bounce': ThreeBounce,
}


type NameType = 'default' | 'chasing-ring' | 'chasing-dots' | 'cube-grid' | 'double-bounce' | 'fading-circle' | 'four-dots' | 'plane' | 'pulse' | 'ring' | 'scale-circle' | 'three-bounce' | 'wave';
interface SpinProps {
  name?: NameType;
  size?: number | string;
  color?: string;
  children?: any;
  loading?: boolean
}

export const Spin = (props: SpinProps) => {
  const { name = 'default', size = 40, children, color = defaultColor } = props
  const Component = spins[name]
  if (!Component) {
    console.warn(`Spin type '${name}' not existed.`)
    return null
  }
  // return <div>spin</div>
  const renderContainer = (Loading: any) => {
    const { loading, children, size = 40, color = defaultColor } = props
    const containerClassName = classNames(`${prefixCls}-container`, {
      [`${prefixCls}-show`]: loading,
    });
    // eslint-disable-next-line react/prop-types
    return (

      // <div>
      <div className={containerClassName}>
        {children}
        {/* {!loading && <div className={'content'}>{children}</div>} */}
        {/* <div className={`${prefixCls}-content`} onClick={(e: any) => { console.log(e, 'e>>>>>>>>>>>') }}>{children}</div> */}
        {/* <div className={`${prefixCls}-content`}>{children}</div> */}
        {loading && (
          <div className={`${prefixCls}-loading`}>
            <Loading {...props} size={props.size || 40} color={color} />
          </div>
        )}
      </div>
    )
  }

  if (children) { return renderContainer(Component) }
  return <Component {...props} size={size} color={color} />
}

// Spin.displayName = 'ShineoutSpin'


