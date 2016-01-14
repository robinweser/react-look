import getChildIndex from '../../modules/utils/getChildIndex'
import React from 'react'
import { expect } from 'chai'

describe('Evaluating child index', () => {

  const Nested = ({children}) => <div>{children}</div>

  it('should return correct the child index if keys are provided', () => {
    const test = new Nested({
      children: [<li key="k1">List1</li>,
        <li key="k2">List2</li>,
        <li key="k3">List3</li>]
    })

    expect(getChildIndex(test, test.props.children[0])).to.eql(0)
    expect(getChildIndex(test, test.props.children[2])).to.eql(2)
  })

  it('should return false if element is not child of parent', () => {
    const test = new Nested({
      children: [<li key="k1">List1</li>,
        <li key="k2">List2</li>,
        <li key="k3">List3</li>]
    })

    expect(getChildIndex(test)).to.eql(false)
    expect(getChildIndex(test, <li key="k4">List1</li>)).to.eql(false)
  })
})
