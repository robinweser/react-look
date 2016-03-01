import React, { Component } from 'react'
import look from '../../modules/core/enhancer'
import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

describe('Enhancing a Component', () => {
  it('should use the same displayName', () => {
    class Default extends Component {
    }
    let Enhanced = look(Default)
    let instance = new Enhanced({ }, { _lookConfig: { } })

    expect(instance.displayName).to.eql(Default.displayName)
  })

  it('should recieve props', () => {
    class Default extends Component {
      constructor() {
        super(...arguments)
      }
    }

    let Enhanced = look(Default)
    let instance = new Enhanced({ bar: 1 }, { _lookConfig: { } })

    expect(instance.props).to.eql({ bar: 1 })
  })

  it('should call super (constructor) only once', () => {
    let constructorFunc = sinon.spy()

    class Default extends Component {
      constructor() {
        super()
        constructorFunc()
      }
    }

    let Enhanced = look(Default)
    let instance = new Enhanced({ }, { _lookConfig: { } })

    expect(constructorFunc).to.have.been.calledOnce
  })
})
