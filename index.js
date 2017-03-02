const Hapi = require('hapi')
const Inert = require('inert');
const Emoji = require('emojione')
const EmojiShortnames = require('./emoji-shortnames')
const fs = require('fs-promise')

const app = new Hapi.Server()

app.connection({ port: 3000 })

const routes = [
  {
    method: 'GET',
    path: '/list',
    config: {
      handler: async (req, res) => {
        res.file('./emoji-shortnames.json')
      }
    }
  },
  {
    method: 'GET',
    path: '/{shortname}/{size?}',
    config: {
      handler: async (req, res) => {
        const shortname = req.params.shortname
        const size = req.params.size

        if (size && !['64', '128', '512'].includes(size)) {
          return res('Size must be one of 64, 128, or 512.').code(400)
        }
        const image = Emoji.shortnameToImage(`:${shortname}:`)
        const re = /png\/(.*).png/
        const found = image.match(re)[1]

        let filePath
        switch (size) {
          case '64':
            filePath = `./node_modules/emojione/assets/png/${found}.png`
            break;
          case '128':
            filePath = `./node_modules/emojione/assets/png_128x128/${found}.png`
            break;
          case '512':
            filePath = `./node_modules/emojione/assets/png_512x512/${found}.png`
            break;
          default:
            filePath = `./node_modules/emojione/assets/png/${found}.png`
        }

        try {
          return res.file(filePath)
        } catch (err) {
          return res(err).code(400)
        }
      }
    }
  }
]

app.register([ Inert ], (err) => {
  if (err) console.log(err)
  app.route(routes)
})

app.on('response', (request) => {
  console.log('Payload: ' + JSON.stringify(request.payload))
  console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode)
})

app.start((err) => {
  if (err) throw err
})

module.exports = app
