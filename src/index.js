import Crawler from 'crawler'
import $ from 'cheerio'
import fs from 'fs'
import { getDetails } from './details'

const starMetas = []

const c = new Crawler({
  maxConnection: 5,
  callback(error, res, done) {
    if (error) {
      console.error(error)
      return done()
    }

    const $ = res.$
    $('#a_selectbox2 >li >a').each((i, e) => {
      const $e = $(e)
      const url = $e.attr("href")
      const avatar = $e.children('img').attr('src')
      const name = $e.children('span').text()

      // console.log('href:', url)
      // console.log(' img:', img)
      // console.log('text:', txt)
      starMetas.push({ url, avatar, name, sex: res.options.sex })
    })

    done()
  }
})

c.queue({ uri: 'http://www.27270.com/star/dalu_nan_0/list1.html', sex: 'm' })
c.queue({ uri: 'http://www.27270.com/star/dalu_nan_0/list2.html', sex: 'm' })
c.queue({ uri: 'http://www.27270.com/star/dalu_nan_0/list3.html', sex: 'm' })

c.queue({ uri: 'http://www.27270.com/star/dalu_nv_0/list1.html', sex: 'fm' })
c.queue({ uri: 'http://www.27270.com/star/dalu_nv_0/list2.html', sex: 'fm' })
c.queue({ uri: 'http://www.27270.com/star/dalu_nv_0/list3.html', sex: 'fm' })

c.on('drain', () => {
  getDetails(starMetas, finalCallback)
  console.log('queue drain')
})

function finalCallback(stars) {
  const json = JSON.stringify(stars, '', 2)
  fs.writeFileSync('stars.json', json)
  console.log(json)
  console.log('Just finish my all work!')
}