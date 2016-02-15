import React, { Component } from 'react'
import look, { StyleSheet, Native } from '../../../modules/dom'

const Media = () => <div className={styles}>
                      Resize your window
                    </div>

const styles = StyleSheet.create({
  padding: 40,
  textAlign: 'center',
  color: 'white',
  fontSize: 40,
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
})

export default look(Media)
