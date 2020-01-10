import React, { useState } from "react";
import classNames from "classnames";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "../Spin/Spin";


type ButtonTypes = 'primary' | 'default' | 'dashed' | 'danger' | 'link';
type sizeTypes = 'small' | 'large';
type ButtonShapes = 'circle' | 'circle-outline' | 'round';

interface ImageProps {
  // children?: any;
  // onClick?: (action: any) => any;
  src?: string;
  url?: string;
  api?: any;
  data?: string;

  prefixCls?: string;
  alt?: string,
  className?: string,
  height?: number | string,
  href?: string | boolean,
  lazy?: boolean,
  onClick?: () => any,
  placeholder?: string,
  shape?: 'rounded' | 'circle' | 'thumbnail',
  style?: object,
  target?: '_blank' | '_self' | '_modal' | '_download',
  title?: string,
  fit?: 'fill' | 'fit' | 'stretch' | 'center',
  width?: number | string,
  container?: string,
}
export const LImage = (props: ImageProps) => {

  const { src, api, url, width, height, href } = props
  const [loading, SetLoading] = useState(false)

  const testSrc = './test1.png'
  const [data, SetData] = useState(props.src || testSrc)
  let sizeCls = '';
  const prefixCls = props.prefixCls || 'laxton-image';
  const classes = classNames(prefixCls, {
    // [`${prefixCls}-${type}`]: type,
    // [`${prefixCls}-background-ghost`]: ghost,
    // [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
    // [`${prefixCls}-block`]: block,
  });



  const loadImageAsync = () => {
    // const url = `${this.api.URL}}`;

    return new Promise(async (resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve(image);
        setTimeout(() => {
          // this.imgOnload = false;
        }, 20);
      };


      image.onerror = function () {
        reject(new Error('Could not load image at '));
      };
      SetData(testSrc)
      SetLoading(false)
      image.src = api ? await api.getImgBase64(url) : src;
      image.style.width = '100%';
      console.log(image, "image<<<<<>>>>>.")
      // const petitionsForm = document.getElementById('petitionsForm');
      // petitionsForm.appendChild(image);
    });
  }

  const renderImage = () => {
    return <img src={data} style={{ width: width, height: height }} />
  }
  const Tag = href ? 'a' : 'div'
  return (
    <Tag className={classes} href={data} download={data}>
      <Spin loading={loading}>
        {!loading && renderImage()}
      </Spin>
    </Tag>
  )
  // return <img className={classes} src={testSrc} />;
};
