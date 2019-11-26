import React from 'react'

function create(name: 'Component' | 'PureComponent') {
  const Base: any = React[name]
  return class extends Base {
    componentDidMount() {
      this.$isMounted = true
    }

    componentWillUnmount() {
      this.$isMounted = false
    }

    setState(...args: any[]) {
      if (this.$isMounted !== false) super.setState(...args)
    }

    forceUpdate() {
      if (this.$isMounted === true) super.forceUpdate()
      if (this.$isMounted === undefined) {
        if (this.forceUpdateTimer) clearTimeout(this.forceUpdateTimer)
        this.forceUpdateTimer = setTimeout(this.forceUpdate.bind(this))
      }
    }
  }
}

export const Component: any = create('Component')
export const PureComponent: any = create('PureComponent')
