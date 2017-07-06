import fs from 'fs'
import Crawler from 'crawler'

const json = fs.readFileSync('stars.json')
const stars = JSON.parse(json)

const c = new Crawler({
  encoding: null,
  jQuery: false,
  callback(err, res, done) {
    if (err) {
      console.error(err)
      return done()
    }

    fs.createWriteStream(res.options.file).write(res.body)
    done()
  }
})

fs.existsSync('download') || fs.mkdirSync('download')

stars.forEach((star, index) => {
  star.id = index + 1
  c.queue({ uri: star.avatar, file: `download/avatar-${star.id}.jpg` })
  c.queue({ uri: star.img1, file: `download/img1-${star.id}.jpg` })
  c.queue({ uri: star.img2, file: `download/img2-${star.id}.jpg` })
  console.log('==>', star.id, star.name)
})

fs.writeFileSync('stars-2.json', JSON.stringify(stars, '', 2))

c.on('drain', () => {
  console.log('Just finish my job.')
})