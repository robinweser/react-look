import extractCSS from '../../lib/keys/extractCSS'
import { expect } from 'chai'

describe('Extracting classNames', () => {

  it('should extract CSS to classNames', () => {
    let args = {newProps: {}}

    extractCSS('css', 'foo', 'css', args)
    expect(args.newProps).to.eql({className: 'foo'})
  })

  it('should concat CSS if a className already exists', () => {
    let args = {newProps: {className: 'bar'}}

    extractCSS('css', 'foo', 'css', args)
    expect(args.newProps).to.eql({className: 'bar foo'})
  })
})