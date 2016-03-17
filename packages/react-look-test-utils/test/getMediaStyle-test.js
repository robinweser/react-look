import React from 'react'
import { StyleSheet } from 'react-look'

import getMediaStyle from '../modules/test-utils/getMediaStyle'

describe('Calling getMediaStyle', () => {
  it('should return empty if no media config defined', () => {
    const styles = StyleSheet.create({ color: 'red', fontSize: 15 })
    const element = <div className={styles}></div>

    expect(getMediaStyle(element)).to.eql({ })
  })

  it('should return media styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      '@media (min-height: 300px)': {
        color: 'blue'
      }
    })
    const element = <div className={styles}></div>

    expect(getMediaStyle(element, { height: 301 })).to.eql({
      color: 'blue'
    })
  })

  it('should return multiple media styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      '@media (min-height: 300px)': {
        color: 'blue'
      },
      '@media (min-width: 400px)': {
        backgroundColor: 'red'
      }
    })
    const element = <div className={styles}></div>

    expect(getMediaStyle(element, { height: 301, width: 400 })).to.eql({
      color: 'blue',
      backgroundColor: 'red'
    })
  })

  it('should return nested media styles', () => {
    const styles = StyleSheet.create({
      color: 'red',
      fontSize: 15,
      '@media (min-height: 300px)': {
        color: 'blue',
        '@media (min-width: 400px)': {
          backgroundColor: 'red'
        }
      }
    })
    const element = <div className={styles}></div>

    expect(getMediaStyle(element, { height: 301, width: 400 })).to.eql({
      color: 'blue',
      backgroundColor: 'red'
    })
  })
})
