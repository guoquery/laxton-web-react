import * as React from 'react';
import { useEffect, Children, cloneElement } from 'react';
//@ts-ignore
import { Grid as SOGrid } from 'shineout'





export interface GridProps {
  gutter?: number;
  offset?: number;
  children?: React.ReactNode;
  width?: number;
  className?: string;
  style?: object;
}

export const Grid = (props: GridProps): any => {
  const pre = 'laxton'
  const { gutter, offset, children, width, className, style } = props;
  if (gutter) {
    console.log(gutter, '>>>>>>>>>>>>>', children)

  }
  const renderPicker = () => {

    return <SOGrid gutter={gutter} width={width}>{
      // props.children
      gutter && gutter > 0 &&
      Children.toArray(children).map((child: any) => {
        if (child.type && child.type.isGrid) {
          const pps: any = { style: Object.assign({}, child.props.style) }
          if (!child.props.width) pps.width = 'auto'
          // if (stretch) pps.style = { ...pps.style, minHeight: '100%', height: '100%' }
          if (gutter && gutter > 0) {
            pps.style = { ...pps.style, paddingLeft: gutter / 2, paddingRight: gutter / 2 }
          }
          console.log('child', cloneElement(child, pps))
          return cloneElement(child, pps)
        }
        return child
      })
    }</SOGrid>

  }
  return (renderPicker());

}

