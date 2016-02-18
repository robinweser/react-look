import extractCSS from '../../../modules/mixins/dom/extractCSS'
import { expect } from 'chai'

describe('Extracting classNames', () => {

  it('should extract CSS to classNames', () => {
    let newProps = { }
    extractCSS({
      property: 'css',
      value: 'foo',
      mixinKey: 'css',
      newProps
    })
    expect(newProps).to.eql({ className: 'foo' })
  })

  it('should concat CSS if a className already exists', () => {
    let newProps = { className: 'bar' }

    extractCSS({
      property: 'css',
      value: 'foo',
      mixinKey: 'css',
      newProps
    })
    expect(newProps).to.eql({ className: 'bar foo' })
  })
})
