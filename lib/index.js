'use strict';

var _crawler = require('crawler');

var _crawler2 = _interopRequireDefault(_crawler);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _details = require('./details');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var starMetas = [];

var c = new _crawler2.default({
  maxConnection: 5,
  callback: function callback(error, res, done) {
    if (error) {
      console.error(error);
      return done();
    }

    var $ = res.$;
    $('#a_selectbox2 >li >a').each(function (i, e) {
      var $e = $(e);
      var url = $e.attr("href");
      var avatar = $e.children('img').attr('src');
      var name = $e.children('span').text();

      // console.log('href:', url)
      // console.log(' img:', img)
      // console.log('text:', txt)
      starMetas.push({ url: url, avatar: avatar, name: name, sex: res.options.sex });
    });

    done();
  }
});

c.queue({ uri: 'http://www.27270.com/star/dalu_nan_0/list1.html', sex: 'm' });
c.queue({ uri: 'http://www.27270.com/star/dalu_nan_0/list2.html', sex: 'm' });
c.queue({ uri: 'http://www.27270.com/star/dalu_nan_0/list3.html', sex: 'm' });

c.queue({ uri: 'http://www.27270.com/star/dalu_nv_0/list1.html', sex: 'fm' });
c.queue({ uri: 'http://www.27270.com/star/dalu_nv_0/list2.html', sex: 'fm' });
c.queue({ uri: 'http://www.27270.com/star/dalu_nv_0/list3.html', sex: 'fm' });

c.on('drain', function () {
  (0, _details.getDetails)(starMetas, finalCallback);
  console.log('queue drain');
});

function finalCallback(stars) {
  var json = JSON.stringify(stars, '', 2);
  _fs2.default.writeFileSync('stars.json', json);
  console.log(json);
  console.log('Just finish my all work!');
}