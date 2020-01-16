
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./style/index.less";

export interface Props {
  action: string,

}

export const UploadImg = (props: Props) => {
  // 预览图片
  const { action } = props
  let [imageUrl, setimageUrl] = useState()
  let [selectedFile, setselectedFile] = useState()
  // 检查照片格式、大小等信息
  const handleBeforeUpload = (file: any, action: string) => {
    console.log('handleBeforeUpload', imageUrl)
    var fd = new FormData();
    var request = new XMLHttpRequest();
    fd.append('file', selectedFile);
    request.onreadystatechange = () => {
      console.log(request.status)
      if (request.status === 200 && request.readyState == 4) {
        alert(request.responseText);
      }
    };
    // "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload"
    request.open("POST", action, true);
    request.send(fd);
  }

  const handleImageChange = (e: any) => {//处理图片
    let reader = new FileReader();
    reader.onloadend = () => {
      console.log(e)
      setselectedFile(e.target.files[0])
      setimageUrl(reader.result)
      console.log(reader.result)

    }
    reader.readAsDataURL(e.target.files[0])
  }
  let imagePreview =
    (
      <div className="upload-plus-text">
        <FontAwesomeIcon icon={faPlus} />
        <div className="ant-upload-text"
        >上传照片</div>
      </div>
    );
  if (imageUrl) {
    imagePreview =
      (
        <div className="upload-plus-text" ><img src={imageUrl} alt="icon" width='100%' height="90%" />
        </div>
      );
  }
  return (
    <div>
      <div className='ant'>
        <input
          type="file"
          id={imageUrl ? '' : 'file'}
          multiple={true}
          // accept="image/jpeg, image/gif, image/png, image/bmp"
          className="input-file"
          onChange={() => { handleImageChange(event) }}
        />
        <label htmlFor="file" className="ant-upload">
          {imagePreview}
        </label>
        <button className="ant-upload-button" type="button" onClick={() => { handleBeforeUpload(imageUrl, action) }} > Upload </button>
      </div>
    </div >

  )

}


