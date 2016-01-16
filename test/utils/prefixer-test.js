import prefixer from '../../modules/utils/prefixer'
import { expect } from 'chai'

describe('Calling the prefixer', () => {
  const pref = prefixer('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9')

  it('should return the latest prefixer if no userAgent is passed', () => {
    expect(prefixer()).to.eql(pref)
  })
  it('should update the userAgent if another one is passed', () => {
    expect(prefixer('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)')).to.not.eql(pref)
  })
})
