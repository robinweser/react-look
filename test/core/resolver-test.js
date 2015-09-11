import {expect} from 'chai'
import {Component} from 'react'
import resolveLook, {extractStyles} from '../../lib/core/resolver'

describe('Extracting look styles', () => {
	it('should extract default styles on shortcut usage', () => {
		let props = {
			look: true
		}
		let styles = {
			_default: {
				color: 'blue'
			}
		}
		expect(extractStyles(props, styles)).to.eql({
			color: 'blue'
		})
	})

	it('should extract only given looks', () => {
		let props = {
			look: 'foo'
		}
		let styles = {
			foo: {
				color: 'blue'
			},
			bar: {
				color: 'red'
			}
		}
		expect(extractStyles(props, styles)).to.eql({
			color: 'blue'
		})
	})

	it('should extract multiple looks', () => {
		let props = {
			look: 'foo bar'
		}
		let styles = {
			foo: {
				color: 'blue'
			},
			bar: {
				fontSize: 15
			}
		}
		expect(extractStyles(props, styles)).to.eql({
			color: 'blue',
			fontSize: 15
		})
	})

	it('should extract multiple in increasing priority from left to right', () => {
		let props = {
			look: 'foo bar'
		}
		let styles = {
			foo: {
				color: 'blue'
			},
			bar: {
				color: 'red',
				fontSize: 15
			}
		}
		expect(extractStyles(props, styles)).to.eql({
			color: 'red',
			fontSize: 15
		})
	})
})