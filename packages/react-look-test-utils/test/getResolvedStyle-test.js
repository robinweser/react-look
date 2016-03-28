import React, { Component } from 'react'
import look, { StyleSheet, Presets } from 'react-look'

import getResolvedStyle from '../modules/test-utils/getResolvedStyle'

describe('Calling getResolvedStyle', () => {
  it('should resolve styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      'isActive=true': {
        color: 'blue'
      }
    })
    const element = <div className={styles}></div>
    const Comp = () => <div>
                         {element}
                       </div>

    expect(getResolvedStyle(element, <Comp />, Presets['react-dom'])).to.eql({
      color: 'red',
      fontSize: 15
    })
  })

  it('should resolve dynamic styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      'isActive=true': {
        color: 'blue'
      }
    })
    const element = <div className={styles}></div>
    const Comp = (props) => <div>
                              {element}
                            </div>

    expect(getResolvedStyle(element, <Comp isActive/>, Presets['react-dom'])).to.eql({
      color: 'blue',
      fontSize: 15
    })
  })

  it('should resolve stateful styles', () => {
    const styles = StyleSheet.create({
      box: {
        color: (props, state) => state.color,
        fontSize: props => props.fontSize || 15
      }
    })
    const element = <div className={styles.box}></div>

    class Comp extends Component {
      constructor() {
        super(...arguments)
        this.state = { color: 'red' }
        this.setColor = this.setColor.bind(this)
      }
      setColor(color) {
        this.setState({ color: color })
      }
      render() {
        return (
          <div>
            {element}
          </div>
        )
      }
    }

    // we should use a shallow renderer for future tests
    // this should also be refactored very soon
    expect(getResolvedStyle(element, new Comp({ fontSize: 12 }), Presets['react-dom'])).to.eql({
      color: 'red',
      fontSize: 12
    })

    const statefulComp = new Comp({ })
    expect(getResolvedStyle(element, statefulComp, Presets['react-dom'])).to.eql({
      color: 'red',
      fontSize: 15
    })
    statefulComp.state = { color: 'blue' }
    expect(getResolvedStyle(element, statefulComp, Presets['react-dom'])).to.eql({
      color: 'blue',
      fontSize: 15
    })
  })

  it('should return prefixed styles styles', () => {
    const styles = StyleSheet.create({ width: 'calc(30px)' })
    const element = <div className={styles}></div>
    const Comp = (props) => <div>
                              {element}
                            </div>

    expect(getResolvedStyle(element, <Comp />, Presets['react-dom'])).to.eql({
      width: '-webkit-calc(30px);width:-moz-calc(30px);width:calc(30px)'
    })
  })
})
