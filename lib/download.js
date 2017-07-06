'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _crawler = require('crawler');

var _crawler2 = _interopRequireDefault(_crawler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var json = _fs2.default.readFileSync('stars.json');
var stars = JSON.parse(json);

var c = new _crawler2.default({
  encoding: null,
  jQuery: false,
  callback: function callback(err, res, done) {
    if (err) {
      console.error(err);
      return done();
    }

    _fs2.default.createWriteStream(res.options.file).write(res.body);
    done();
  }
});

_fs2.default.existsSync('download') || _fs2.default.mkdirSync('download');

stars.forEach(function (star, index) {
  star.id = index + 1;
  c.queue({ uri: star.avatar, file: 'download/avatar-' + star.id + '.jpg' });
  c.queue({ uri: star.img1, file: 'download/img1-' + star.id + '.jpg' });
  c.queue({ uri: star.img2, file: 'download/img2-' + star.id + '.jpg' });
  console.log('==>', star.id, star.name);
});

_fs2.default.writeFileSync('stars-2.json', JSON.stringify(stars, '', 2));

c.on('drain', function () {
  console.log('Just finish my job.');
});