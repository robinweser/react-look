import Lang from '../../../lib/mixins/pseudo-class/lang'
import {expect} from 'chai'

let hasLang = Lang[0].fn

describe('Evaluating lang-attribute', () => {

	it('should validate true', () => {
		let args = {
			newProps: {
				lang: 'en'
			}
		}
		expect(hasLang(':lang(en)', true, args)).to.equal(true)
	})

	it('should validate false', () => {
		let wrongLang = {
			newProps: {
				lang: 'en'
			}
		}
		let noLang = {
			newProps: {}
		}

		expect(hasLang(':lang(de)', true, wrongLang)).to.equal(false)
		expect(hasLang(':lang(de)', true, noLang)).to.equal(false)
	})
})