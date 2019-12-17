import React,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

export const NewPortal = (props: any) => {
    // const [node, setNode] = useState(document.createElement('div'));
    // const [children, setChildren] = props;
    const node = document.createElement('div');
    document.body.appendChild(node);
    const children = props.children;
    console.log(children,'children>>>>>>')
    return(
        ReactDOM.createPortal(
            children, // 要渲染的元素
            node // 指定要渲染的父元素
        )
    )
}

