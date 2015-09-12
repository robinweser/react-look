import ChildIndex from '../../examples/pseudo/childIndex.jsx'
import Input from '../../examples/pseudo/input.jsx'
import UserAction from '../../examples/pseudo/userAction.jsx'

import DemoContainer from './DemoContainer.jsx'
import React, {Component} from 'react'

export default class Pseudo extends Component {
  render() {
    let description = {
      userAction: ':hover, :active',
      childIndex: ':first-child, :last-child, :only-child, :nth-child, :nth-last-child\n:first-of-type, :last-of-type, :only-of-type, :nth-of-type, :nth-last-of-type',
      input: 'user-action  -  :focus, :valid/:invalid, :in-range/:out-of-range\n:checked, :enabled/:disabled, :read-only/:read-write:required/:optional, :ideterminate'
    }
    return (
      <div>
        <DemoContainer description={description.userAction} title="1.1. user action">
          <UserAction/>
        </DemoContainer>
        <DemoContainer description={description.childIndex} padding={0} title="1.2. child index">
          <ChildIndex items={[1,2,3,4,5,6,7,8,9,10,11,12,13,14]}/>
        </DemoContainer>
        <DemoContainer description={description.input} title="1.3. input">
          <Input/>
        </DemoContainer>
      </div>
    )
  }
}