import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app.jsx'
import fs from 'fs'

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString();
const app = express();
const host = 'localhost';
const port = 8000;

app.use('/app.js', proxy('localhost:8080', {
  forwardPath: () => '/app.js'
}));

app.get('/', (req, res) => {
  const appHtml = ReactDOMServer.renderToString(
    <App />
  );
  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml))
  res.end()
});

app.listen(port, host, () => {
  console.log('Access the universal app at http://%s:%d', host, port);
});
