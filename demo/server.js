import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app.jsx'
import fs from 'fs'
import { Presets } from '../modules/look'

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
const app = express()
const host = 'localhost'
const port = 8000

app.use('/app.js', proxy('localhost:8080', {
  forwardPath: () => '/app.js'
}))

app.get('/', (req, res) => {
  const serverConfig = Presets['react-dom'];
  serverConfig.userAgent = req.headers['user-agent'];

  const appHtml = renderToString(
    <App lookConfig={serverConfig} />
  )

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml))
  res.end()
})

app.listen(port, host, () => {
  console.log('Access the universal app at http://%s:%d', host, port)
})
