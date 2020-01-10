import React, { useState, useRef, useCallback, useEffect } from "react";
// import { TextArea as SOTextArea } from 'shineout'


export interface TextAreaProps {
  placeholder?: string | React.ReactNode;
  onChange: (value: any) => void,
  value?: string,
  children?: React.ReactNode;
}

export const TextArea = (props: TextAreaProps): any => {

  // const [disabled,setDisabled] = useEffect(false)

  const onChange = (e: any) => {
    props.onChange(e)
  }
  const placeholder = () => {
    // props.placeholder()

  }
  const renderTextArea = () => {

    return (
      // <label className="so-input">
      <textarea
        className="laxton-input"
        value={props.value}
        // disabled={setDisabled()}
        onChange={onChange}
        placeholder="Enter Here"
      ></textarea>
      // </label>

    )

  }
  return (renderTextArea());

}