#!/usr/bin/env node
import config from '#src/config/index.config.js'
import 'express-async-errors'
import http from 'node:http'
import app from './app.js'

const port = config.APP_PORT
const baseUrl = config.BASE_URL

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`The website is running on ${baseUrl}:${port}`)
})
