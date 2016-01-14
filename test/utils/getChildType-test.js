import getChildType from '../../modules/utils/getChildType'
import React from 'react'
import { expect } from 'chai'

describe('Evaluating child type', () => {

  const Nested = ({children}) => <div>{children}</div>

  it('should return correct child type for default tags', () => {
    const test = new Nested({children: <li>test</li>})

    expect(getChildType(test.props.children)).to.eql('li')
  })

  it('should return correct child type for custom components', () => {
    const test = new Nested({children: <Nested />})

    expect(getChildType(test.props.children)).to.eql('Nested')
  })

  it('should return correct child type for custom ES6 classes', () => {
    class Test extends React.Component {
      render() {
        return <div>foo</div>
      }
    }
    const test = new Nested({children: <Test />})

    expect(getChildType(test.props.children)).to.eql('Test')
  })
})
