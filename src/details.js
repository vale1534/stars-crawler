import Crawler from 'crawler'
import $ from 'cheerio'

const stars = []

const c = new Crawler({
  maxConnection: 5,
  callback(error, res, done) {
    if (error) {
      console.error(error)
      return done()
    }

    const $ = res.$

    console.log($('title').text())

    const [born, country, info] = $('.starInfoList >ul >li >p').map((i, e) => $(e).text()).get()
    let match = $('.starBigBg').attr('style').match(/\((.+)\)/)
    const img1 = match ? match[1] : ''
    const img2 = $('.starBigBg .star_pic >img').attr('src')

    stars.push({
      ...res.options.meta,
      born: born.trim().replace(/^\s+/, ''),
      country: country.trim().replace(/^\s+/, ''),
      info: info.trim().replace(/^\s+/, ''),
      img1: img1.trim().replace(/^\s+/, ''),
      img2: img2.trim().replace(/^\s+/, '')
    })

    done()
  }
})

export function getDetails(metas, callback) {
  console.log('metas.length:', metas.length)
  metas.map(m => c.queue({ uri: m.url, meta: m }))
  c.on('drain', () => callback(stars))
}