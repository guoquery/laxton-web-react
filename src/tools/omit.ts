
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

function test(target: object, origin: any) {
  let copy: any = {};
  if (typeof target === 'object') {
    Object.keys(target).forEach((key: any) => {
      Object.keys(origin).forEach(p => {
        if (key === p) {
          copy[key] = origin[key]
        }
      })
    })
  }
  return copy
}