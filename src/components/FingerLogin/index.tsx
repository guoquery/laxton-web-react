import React, { useState, useEffect } from "react";
import { ChamInput, Button, ChamItem } from "../../index";
import { faAngleUp, faAngleDown, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//@ts-ignore
import { Grid } from 'shineout'

// const a = require('./bg1.png')

interface FingerLoginProps {
  iconColor?: string;
  borderColor?: string;
  size?: string;
  iconSize?: any;
  // expendIndex?: number,
  // searchConfig: any;
  // onChange: (action: any) => any;
  // children?: any;
  // api?: any;
  // icon?: any;
  // layOut?: 'row' | 'column';
  // width?: string | number;
  // gutter?: number;
  // filters?: any;
  // defaultValues?: any;
}
export const FingerLogin = (props: FingerLoginProps) => {
  const { iconColor = 'black', borderColor = '#b0f9e4', size = "50", iconSize = '3x' } = props

  return (
    <div className="fingerLogin" style={{ width: size + 'px', height: size + "px", borderColor: borderColor }}>
      {/* <img src={'https://buzzlightyears.github.io/css-exercise/saoyisao/images/2.png'}></img> */}
      <FontAwesomeIcon icon={faFingerprint} size={props.iconSize || iconSize} color={props.iconColor || iconColor} />
      <div className="pane">
        <img src="https://buzzlightyears.github.io/css-exercise/saoyisao/images/4.png"></img>
      </div>
    </div >
  );
};
