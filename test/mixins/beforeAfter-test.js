import {before, after} from '../../modules/mixins/beforeAfter'
import { expect } from 'chai'

describe('Adding children before or after an element', () => {
	it('should initialize children', () => {
		const newProps = {}
		before('', '', '', {newProps})
		expect(newProps.children).to.exist
	})

	it('should arrayify children', () => {
		const newProps = {
			children: {type: 'div'}
		}
		before('', {color: 'red'}, '', {newProps})
		expect(newProps.children instanceof Array).to.eql(true)
	})

	it('should great a pseudo element containing the styles', () => {
		const newProps = {}
		after('', {color: 'red'}, '', {newProps})
		expect(newProps.children[0].props.style).to.eql({color: 'red'})
	})

	it('should add inner content if styles contains content', () => {
		const newProps = {}
		after('', {content: 'Hello'}, '', {newProps})
		expect(newProps.children[0].props.children).to.eql('Hello')
	})

	it('should generate a child image if contains is an url', () => {
		const newProps = {}
		after('', {content: 'url(path/to/image)'}, '', {newProps})
		expect(newProps.children[0].props.children.type).to.eql('img')
		expect(newProps.children[0].props.children.props.src).to.eql('path/to/image')
	})

	it('should add a children after all others', () => {
		const newProps = {
			children: [1, 2]
		}
		after('', {color: 'red'}, '', {newProps})
		expect(newProps.children[2].props.style).to.eql({color: 'red'})
	})

	it('should add a children before all others', () => {
		const newProps = {
			children: [1, 2]
		}
		before('', {color: 'red'}, '', {newProps})
		expect(newProps.children[0].props.style).to.eql({color: 'red'})
	})
})
