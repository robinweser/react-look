import hasLang from '../../../lib/mixins/pseudoClasses/lang'
import { expect } from 'chai'

describe('Evaluating lang-attribute', () => {

  it('should validate true', () => {
    let args = {newProps: {lang: 'en'}}
    expect(hasLang(':lang(en)', true, ':lang', args)).to.equal(true)
  })

  it('should validate false', () => {
    let wrongLang = {newProps: {lang: 'en'}}
    let noLang = {newProps: {}}

    expect(hasLang(':lang(de)', true, ':lang', wrongLang)).to.equal(false)
    expect(hasLang(':lang(de)', true, ':lang', noLang)).to.equal(false)
  })
})
