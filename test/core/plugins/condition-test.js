import {expect} from 'chai'
import Condition from '../../../lib/core/processor/condition'

describe('Evaluating conditions', () => {

	let matchValues = {
		highlight: true,
		clicks: 20,
		noprop: undefined
	}

	it('should validate true', () => {
		expect(Condition.evaluateCondition('highlight=true', matchValues)).to.equal(true)
		expect(Condition.evaluateCondition('clicks>10', matchValues)).to.equal(true)
		expect(Condition.evaluateCondition('clicks!=15', matchValues)).to.equal(true)
		expect(Condition.evaluateCondition('clicks>=20', matchValues)).to.equal(true)
		expect(Condition.evaluateCondition('clicks>=19', matchValues)).to.equal(true)
		expect(Condition.evaluateCondition('noprop=undefined', matchValues)).to.equal(true)
		expect(Condition.evaluateCondition('clicks!=undefined', matchValues)).to.equal(true)
	})


	it('should validate false', () => {
		expect(Condition.evaluateCondition('clicks<10', matchValues)).to.equal(false)
		expect(Condition.evaluateCondition('border=2px', matchValues)).to.equal(false)
		expect(Condition.evaluateCondition('clicks!=20', matchValues)).to.equal(false)
		expect(Condition.evaluateCondition('clicks<=10', matchValues)).to.equal(false)
		expect(Condition.evaluateCondition('highlight=undefined', matchValues)).to.equal(false)
	})
})

describe('Resolving conditioned styles', () => {
	it('should not modify anything', () => {
		let Component = {
			props: {},
			state: {}
		}
		let styles = {
			_default: {
				color: 'blue'
			}
		}
		expect(Condition.process(styles, Component)).to.eql({
			_default: {
				color: 'blue'
			}
		})
	})

	it('should merge fulfilled conditioned styles using props', () => {
		let Component = {
			props: {
				fulfilled: true
			},
			state: {}
		}
		let styles = {
			_default: {
				color: 'blue',
				'fulfilled=true': {
					fontSize: 15
				}
			}
		}
		expect(Condition.process(styles, Component)).to.eql({
			_default: {
				color: 'blue',
				fontSize: 15
			}
		})
	})

	it('should merge fulfilled conditioned styles using state', () => {
		let Component = {
			props: {},
			state: {
				fulfilled: true
			}
		}
		let styles = {
			_default: {
				color: 'blue',
				'fulfilled=true': {
					fontSize: 15
				}
			}
		}
		expect(Condition.process(styles, Component)).to.eql({
			_default: {
				color: 'blue',
				fontSize: 15
			}
		})
	})

	it('should merge fulfilled conditioned styles using props and state', () => {
		let Component = {
			props: {
				fulfilled: true
			},
			state: {
				full: 20
			}
		}
		let styles = {
			_default: {
				color: 'blue',
				'fulfilled=true': {
					fontSize: 15
				},
				'full>10': {
					lineHeight: 15
				}
			}
		}
		expect(Condition.process(styles, Component)).to.eql({
			_default: {
				color: 'blue',
				fontSize: 15,
				lineHeight: 15
			}
		})
	})

	it('should drop unfulfilled conditioned styles', () => {
		let Component = {
			props: {
				fulfilled: false
			},
			state: {}
		}
		let styles = {
			_default: {
				color: 'blue',
				'fulfilled=true': {
					fontSize: 15
				}
			}
		}
		expect(Condition.process(styles, Component)).to.eql({
			_default: {
				color: 'blue'
			}
		})
	})
})