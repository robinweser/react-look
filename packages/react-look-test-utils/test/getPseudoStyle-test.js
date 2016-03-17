import React from 'react'
import { StyleSheet } from 'react-look'

import getPseudoStyle from '../modules/test-utils/getPseudoStyle'

describe('Calling getPseudoStyle', () => {
  it('should return pseudo styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      ':hover': {
        color: 'blue'
      }
    })
    const element = <div className={styles}></div>

    expect(getPseudoStyle(element, ':hover')).to.eql({
      color: 'blue'
    })
  })

  it('should return multiple pseudo styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      ':hover': {
        color: 'blue'
      },
      ':active': {
        backgroundColor: 'red'
      }
    })
    const element = <div className={styles}></div>

    expect(getPseudoStyle(element, [ ':hover', ':active' ])).to.eql({
      color: 'blue',
      backgroundColor: 'red'
    })
  })

  it('should return nested pseudo styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      ':hover': {
        color: 'blue',
        ':active': {
          backgroundColor: 'red'
        }
      }
    })
    const element = <div className={styles}></div>

    expect(getPseudoStyle(element, ':active')).to.eql({ })
    expect(getPseudoStyle(element, ':hover:active')).to.eql({
      backgroundColor: 'red'
    })
  })

  it('should return pseudo styles within media queries', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      '@media (min-width: 300px)': {
        ':hover': {
          color: 'blue'
        }
      }
    })
    const element = <div className={styles}></div>

    expect(getPseudoStyle(element, ':hover')).to.eql({ })
    expect(getPseudoStyle(element, ':hover', { width: 400 })).to.eql({
      color: 'blue'
    })
  })
})
