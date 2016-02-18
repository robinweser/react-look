import React, { Component } from 'react'
import look, { StyleSheet } from '../../../modules/dom'

const Keyframes = () => (
  <div className={styles.container}>
    <div className={styles.box} />
  </div>
)

const positionFrames = StyleSheet.keyframes({
  '0%': {
    paddingLeft: 0,
    paddingTop: 100
  },
  '25%': {
    paddingTop: 0
  },
  '50%': {
    paddingLeft: 'calc(100% - 100px)',
    paddingTop: 100
  },
  '75%': {
    paddingTop: 200
  },
  '100%': {
    paddingTop: 100,
    paddingLeft: 0
  }
})

const backgroundFrames = StyleSheet.keyframes({
  '0%': {
    background: 'blue'
  },
  '25%': {
    background: 'green'
  },
  '50%': {
    background: 'yellow'
  },
  '75%': {
    background: 'red'
  },
  '100%': {
    background: 'blue'
  }
})

const styles = StyleSheet.create({
  container: {
    height: 300,
    animation: positionFrames + ' 6s linear 0s infinite'
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 100,
    animation: backgroundFrames + ' 12s linear 0s infinite'
  }
})

export default look(Keyframes)
