import React, { Component } from 'react'
import look, { StyleSheet } from '../../../modules/dom'

const Pseudo = () => (
  <div>
    <div className={styles.firstLetter}>First letter is colored red.</div>
    <br/>
    <div className={styles.numbers}>:substr lets you style regex m4tches 4 example only numb3rs with :substr([0-9]*).</div>
    <br/>
    <div className={styles.beforeAfter}>Who's after me?</div>
    <br/>
    <div>Pseudo to CSS polyfill <i>(e.g. ::-webkit-input-placeholder)</i></div>
    <input className={styles.input} placeholder="Webkit-based browsers show this placeholder in green" />
  </div>
)

const styles = StyleSheet.create({
  firstLetter: {
    fontSize: 20,
    ':first-letter': {
      color: 'red',
      fontSize: 26,
      fontWeight: 600
    }
  },
  numbers: {
    fontSize: 20,
    'substr([0-9]*)': {
      color: 'red'
    }
  },
  beforeAfter: {
    fontSize: 20,
    ':before': {
      content: '\':before\'',
      color: 'gray'
    },
    ':after': {
      color: 'red',
      content: '"It\'s me"',
      fontSize: 18
    }
  },
  input: {
    appearance: 'none',
    outline: 'none',
    width: 'calc(100% - 20px)',
    fontSize: 18,
    margin: '5px 10px',
    padding: '5px 5px 5px 8px',
    border: '1px solid gray',
    borderRadius: 5,
    userSelect: 'text',
    '::-webkit-input-placeholder': {
      color: 'green'
    }
  }
})

export default look(Pseudo)
