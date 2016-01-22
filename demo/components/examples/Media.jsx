import React, { Component } from 'react'
import look, { StyleSheet } from '../../../modules/look'

const Media = () => <div {...styles}>Resize your window</div>

const styles = StyleSheet.create({
  padding: 40,
  textAlign: 'center',
  color: 'white',
  fontSize: 40,
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

export default look(Media)
