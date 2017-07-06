import fs from 'fs'

const uriPrefix = 'http://stars.fe-artisan.com/images'

const json = fs.readFileSync('stars-2.json')
const stars = JSON.parse(json)

stars.forEach((star, index) => {
  // star.origin = star.url
  star.avatar = `${uriPrefix}/avatar-${star.id}.jpg`
  star.img1 = `${uriPrefix}/img1-${star.id}.jpg`
  star.img2 = `${uriPrefix}/img2-${star.id}.jpg`
  star.info = star.info.split(/\s*\|\s*/)
  star.url = undefined
})

fs.writeFileSync('stars-3.json', JSON.stringify(stars, '', 2))
console.log('Just finish my job.')
