import React from 'react'
import { StyleSheet } from 'react-look'

import getStaticStyle from '../modules/test-utils/getStaticStyle'

describe('Calling getStaticStyle', () => {
  it('should return static styles', () => {
    const styles = StyleSheet.create({ color: 'red', fontSize: 15 })
    const element = <div className={styles}></div>

    expect(getStaticStyle(element)).to.eql({
      color: 'red',
      fontSize: 15
    })
  })

  it('should return merged static styles in correct order', () => {
    const staticStylesA = { color: 'red', fontSize: 15 }
    const staticStylesB = { color: 'blue', backgroundColor: 'red' }
    const styles = StyleSheet.create({
      a: staticStylesA,
      b: staticStylesB
    })

    const element = <div className={StyleSheet.combineStyles(styles.a, styles.b)}></div>

    expect(getStaticStyle(element)).to.eql({
      color: 'blue',
      fontSize: 15,
      backgroundColor: 'red'
    })
  })

  it('should return merged static styles in correct order', () => {
    const staticStylesA = { color: 'red', fontSize: 15 }
    const staticStylesB = { color: 'blue', backgroundColor: 'red' }
    const styles = StyleSheet.create({
      a: staticStylesA,
      b: staticStylesB
    })

    const element = <div className={StyleSheet.combineStyles(styles.a, styles.b)}></div>

    expect(getStaticStyle(element)).to.eql({
      color: 'blue',
      fontSize: 15,
      backgroundColor: 'red'
    })
  })
})
