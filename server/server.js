const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')

const app = express()

const isDev = require('./helpers/dev').isDev()
if (!isDev) {
  const https = require('https')
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/compsci.cl-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/compsci.cl-0001/fullchain.pem')
  }
  https.createServer(options, app).listen(1027, () => {
    console.log('Escuchando puerto (HTTPS):', 1027)
  })
}
else {
  console.log(`No estoy en el servidor (IP: ${require('ip').address()})`)
  app.listen(1027, () => {
    console.log('Escuchando puerto:', 1027)
  })
}