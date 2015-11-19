import React, { Component } from 'react'
import Look, { StyleSheet } from '../lib/dom'

const Media = () => (
<div look={styles}>
    Resize Me!
  </div>
)

const styles = StyleSheet.create(Media, {
  padding: 40,
  backgroundColor: 'red',
  '@media (max-width: 500px)': {
    backgroundColor: 'blue'
  },
  '@media (orientation:landscape)': {
    backgroundColor: 'orange'
  },
  '@media (min-width: 1000px)': {
    backgroundColor: 'green'
  }
})

export default Look(Media)
