import React, {Component} from 'react'

const reactStateData = Comp => {

    class ComponentWithReactStateData extends Comp {

        setData(obj, watch) {
            // watch
            let watchs = {}
            if (typeof watch === 'function') {
                watchs = watch()
            }

            // state
            if (!this.state) {
                this.state = {}
            }
        
            Object.keys(obj).forEach(res => {
                this.state[res] = obj[res]
            })

            if (this.data) {
                console.warn('data must be null')
            }

            this.data = {}
            const th = this

            Object.keys(obj).forEach(res => {
                Object.defineProperty(this.data, res, {
                    set(val) {
                        if (th.state[res] !== val) {
                            const ov = th.state[res]
                            th.setState({
                                [res]: val
                            }, e => {
                                if (watchs[res] && typeof watchs[res] === 'function') {
                                    watchs[res].call(th, th.state[res], ov)
                                }
                            })
                        }
                    },
                    get() {
                        return th.state[res]
                    }
                })
            })
        }

        render() {
            return super.render()
        }

    }
    ComponentWithReactStateData.displayName = `WithStateData(${Comp.displayName || Comp.name || 'Component'})`
    return ComponentWithReactStateData
}

export default reactStateData