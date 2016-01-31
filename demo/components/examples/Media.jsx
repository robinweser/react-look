import React, { Component } from 'react'
import look, { StyleSheet } from '../../../modules/look'

const Media = () => <div className={styles}>Resize your window</div>

const styles = StyleSheet.create({
  color: 'red',
  backgroundColor: 'red',
  '@media (max-width: 500px)': {
    backgroundColor: 'blue'
  },
  '@media (orientation:portrait)': {
    backgroundColor: 'orange'
  },
  '@media (min-width: 1000px)': {
    backgroundColor: 'green'
  }
}, 'Media')

export default look(Media)
