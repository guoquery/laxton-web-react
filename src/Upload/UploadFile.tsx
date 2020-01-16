import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
//@ts-ignore
import { Button, Upload } from 'shineout'
//@ts-ignore

export const UploadFile = () => {
  return (
    <div>
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        multiple
        limit={2}
        name="file"
        recoverAble
        onSuccess={(res: any, file: any) => file.name}
        style={{ width: 300, marginBottom: 30 }}
      >
        <Button>
          <FontAwesomeIcon icon={faUpload} />Upload file
        </Button>
      </Upload>
    </div>
  )
}