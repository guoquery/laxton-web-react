import React from 'react'
import classnames from 'classnames'
import {Checkbox} from './Checkbox'

export const CheckboxGroup = (props: any) => {
    const { block, data, datum, keygen, children ,id} = props
    const className = classnames(classnames('group', props.block && 'block'), props.className)
    const handleClick = (val: any, checked: any, index: any) => {
        // if (checked) {
        //     datum.add(data[index])
        // } else {
        //     datum.remove(data[index])
        // }
    }
    const getContent = (d:any) => {
        const { renderItem } = props
        // if (typeof renderItem === 'string') {
        //     return d[renderItem]
        // }
        // if (typeof renderItem === 'function') {
        //     return renderItem(d)
        // }
        return ''
    }
    return (
        <div className={className} id={props.id}>
            {data.map((d:any, i:any) => (
                <Checkbox
                    checked={datum.check(d)}
                    disabled={datum.disabled(d)}
                    onChange={(e: any) => handleClick}
                >
                    {getContent(d)}
                </Checkbox>
            ))}
            {children}
        </div>
    )

}