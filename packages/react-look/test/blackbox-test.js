import look, { StyleSheet, LookRoot, Presets } from 'react-look'

describe('Enhancing with look', () => {
  it('should work as a higher order function', () => {
    const Comp = () => <div />
    expect(look(Comp).contextTypes).to.exist
  })
})

describe('Black-box tests for react-look', () => {
  describe('Resolving multiple elements with same dynamic styles', () => {
    it('should resolve styles independently for each element', () => {
      const styles = StyleSheet.create({
        box: {
          fontSize: 15,
          'isActive=true': {
            fontSize: 20
          }
        }
      })

      const Comp = look(() => <span className={styles.box}></span>)
      const mountedComp = mount(
        <div>
          <Comp />
          <Comp isActive />
        </div>
      )

      expect(getStaticStyle(mountedComp.findEl('span', 0))).to.eql({
        fontSize: 15
      })
      expect(getStaticStyle(mountedComp.findEl('span', 1))).to.eql({
        fontSize: 20
      })
    })
  })
})
