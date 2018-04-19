'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
  // FIREBASE_API_KEY: '"AIzaSyBj0LSNuwTZNyD1BKZxwYQE62n9CpOT3E0"'
})
