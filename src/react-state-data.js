import React from 'react'

const reactStateData = Comp => class HOC extends Comp {

    setData(obj) {
        // watch
        let watchs = {}
        if (typeof watch === 'function') {
            watchs = watch()
        }

        // state
        if (!this.state) {
            this.state = {
                ...obj
            }
        } else {
            Object.keys(obj).forEach(res => {
                this.state[res] = res
            })
        }

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
    
    constructor(props) {
        super(props)
    }

    render() {
        return super.render()
    }

}

export default reactStateData