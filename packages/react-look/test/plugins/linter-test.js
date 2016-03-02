import sinon from 'sinon'
import { Plugins } from 'inline-style-linter'

import linter from '../../modules/plugins/linter'

describe('Linter plugin', () => {
  it('should lint styles and log warnings', () => {
    sinon.spy(console, 'warn')

    const styles = { width: '50px' }
    const pluginInterface = TestUtils.mockPluginInterfaceWithComponentElementNewProps(styles)
    pluginInterface.config.linter = {
      plugins: [ Plugins.preferNumber ],
      onlyLogHint: true
    }

    linter(pluginInterface)
    expect(console.warn.calledOnce).to.eql(true)
  })
})
