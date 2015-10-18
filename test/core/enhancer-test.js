import { Component } from 'react'
import Look from '../../lib/core/enhancer'
import Chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
let expect = Chai.expect;
Chai.use(sinonChai);

describe('Enhancing a Component', () => {
  it('should use the same displayName', () => {
    class Default extends Component {
    }
    let Enhanced = Look(Default)
    let instance = new Enhanced()

    expect(instance.displayName).to.eql(Default.displayName);
  })

  it('should set up initial state', () => {
    class Default extends Component {
    }
    let Enhanced = Look(Default);
    let instance = new Enhanced();

    expect(instance.state).to.have.property('_look');
  })


  it('should merge existing state', () => {
    class Default extends Component {
      constructor() {
        super(...arguments);
        this.state = {foo: 1}
      }
    }

    let Enhanced = Look(Default);
    let instance = new Enhanced();

    expect(instance.state).to.eql({
      foo: 1,
      _look: new Map()
    })
  })


  it('should recieve props', () => {
    class Default extends Component {
      constructor() {
        super(...arguments);
      }
    }

    let Enhanced = Look(Default);
    let instance = new Enhanced({bar: 1})

    expect(instance.props).to.eql({bar: 1})
  })

  it('should call super (constructor) only once', () => {
    let constructorFunc = sinon.spy()

    class Default extends Component {
      constructor() {
        super()
        constructorFunc()
      }
    }

    let Enhanced = Look(Default)
    let instance = new Enhanced()

    expect(constructorFunc).to.have.been.calledOnce
  });


  it('should call super.render only once', () => {
    let callMe = sinon.spy()

    class Default extends Component {
      render() {
        callMe()
        return null
      }
    }
    let Enhanced = Look(Default)
    let instance = new Enhanced()
    instance.render()

    expect(callMe).to.have.been.calledOnce
  })
})