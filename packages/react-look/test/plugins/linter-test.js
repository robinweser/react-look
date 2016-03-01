import sinon from 'sinon'
import { Plugins } from 'inline-style-linter'

import linter from '../../modules/plugins/linter'

describe('Linter plugin', () => {
  beforeEach(function() {
    sinon.stub(console, 'warn')
  })

  it('should lint styles and log warnings', () => {
    const pluginInterface = {
      styles: {
        width: '50px'
      },
      config: {
        linter: {
          plugins: [ Plugins.preferNumber ],
          onlyLogHint: true
        }
      },
      element: {
        type: 'div'
      },
      Component: {
        constructor: {
          displayName: 'Comp'
        }
      }
    }
    linter(pluginInterface)
    expect(console.warn.calledOnce).to.eql(true)
  })
})
