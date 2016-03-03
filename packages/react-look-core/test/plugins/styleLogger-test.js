import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import styleLogger from '../../modules/plugins/styleLogger'

describe('Logging styles', () => {
  it('should log styles onRender', () => {
    sinon.spy(console, 'log')

    const styles = { color: 'red' }
    const pluginInterface = TestUtils.mockPluginInterfaceWithComponentElementNewProps(styles)
    pluginInterface.config.styleLogger = { onRender: true }

    styleLogger(pluginInterface)

    expect(console.log.calledOnce).to.eql(true)
  })

  it('should add a event listener if an event is passed', () => {
    const styles = { color: 'red' }
    const pluginInterface = TestUtils.mockPluginInterfaceWithComponentElementNewProps(styles)
    pluginInterface.config.styleLogger = {
      onEvent: 'onHover'
    }

    styleLogger(pluginInterface)

    expect(pluginInterface.newProps.onHover).to.exist
  })

  it('should add multiple event listener if an array of events is passed', () => {
    const styles = { color: 'red' }
    const pluginInterface = TestUtils.mockPluginInterfaceWithComponentElementNewProps(styles)
    pluginInterface.config.styleLogger = {
      onEvent: [ 'onHover', 'onFocus' ]
    }

    styleLogger(pluginInterface)

    expect(pluginInterface.newProps.onHover).to.exist
    expect(pluginInterface.newProps.onFocus).to.exist
  })

  it('should log styles if the defined event is triggered', () => {
    const styles = { color: 'red' }
    const pluginInterface = TestUtils.mockPluginInterfaceWithComponentElementNewProps(styles)
    pluginInterface.config.styleLogger = {
      onEvent: 'onEvent'
    }

    styleLogger(pluginInterface)

    expect(pluginInterface.newProps.onEvent).to.exist
    pluginInterface.newProps.onEvent()
    expect(console.log.called).to.eql(true)
  })

  it('should keep previous events', () => {
    const eventSpy = sinon.spy()

    const styles = { color: 'red' }
    const pluginInterface = TestUtils.mockPluginInterfaceWithComponentElementNewProps(styles)
    pluginInterface.config.styleLogger = {
      onEvent: 'onEvent'
    }
    pluginInterface.newProps.onEvent = eventSpy

    styleLogger(pluginInterface)

    expect(pluginInterface.newProps.onEvent).to.exist
    pluginInterface.newProps.onEvent()
    expect(eventSpy).to.have.been.calledOnce
  })
})
