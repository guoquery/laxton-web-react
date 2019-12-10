
export default function (target: object, params: string[]) {
  let copy: any = { ...target };
  // console.log(target, params, 'try', typeof target)
  if (typeof target === 'object') {
    Object.keys(target).forEach((key: any) => {
      params.forEach(p => {
        if (key === p) {
          delete copy[key]
        }
      })
    })
  }

  return copy
}