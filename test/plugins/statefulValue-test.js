import statefulValue from '../../lib/plugins/statefulValue'
import Look, {StyleSheet} from '../../lib/dom'
import React from 'react'
import { expect } from 'chai'


describe('Resolving stateful values', () => {

  it('should resolve stateful values', () => {
    const Component = {props: {color: 'red'}}
    expect(statefulValue({color: (props) => props.color}, {
      Component
    })).to.eql({color: 'red'})
  })

  it('should do nothing if no function was passed', () => {
    const Component = {props: {color: 'red'}}
    expect(statefulValue({color: 'red'}, {Component})).to.eql({
      color: 'red'
    })
  })

	it('should update styles on state change', () => {
		class Example extends React.Component {
      constructor(){
        super(...arguments)
      }
			state = {clicked: false}
			onClick = () => {
				this.setState({clicked: true})
			}
			render() {
				<div look={styles} onClick={this.onClick}>foo</div>
			}
		}

		const styles = StyleSheet.create(Example, {
			color: (props, state) => state.clicked ? 'red' : 'green'
		})

    Example = Look(Example)

		const test = new Example({color: 'red'})
  })
})
