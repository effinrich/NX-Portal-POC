/**
 * This is not a production api yet!
 * This is only a minimal backend to get started.
 */

import express from 'express'
import path from 'path'

const app = express()
const router = express.Router()

// Serve static files
router.use(express.static('dist/apps/portal'))
// app.use('/api', express.static('dist/apps/api'))

router.use(express.static(path.join(__dirname, 'dist/apps/api')))
app.use(router)

// Send all requests to index.html
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/'))
// })

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' })
})

const port = process.env.port || 3333
const api = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
api.on('error', console.error)
