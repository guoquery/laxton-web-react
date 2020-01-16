
import React from 'react';
export interface Props {
  children: string//传入的悬浮文字
  backgroundcolor?: string
  border?: string,
  container?: any
}

export const Popover = (props: Props) => {
  const { children, backgroundcolor, border, container } = props

  return (
    <span>
      <span className='wrapper'>
        {container}
        <div className="tooltip" style={{ border: `${border}`, backgroundColor: `${backgroundcolor}` }} >
          {children}
        </div>
      </span>
    </span>
  )
}

