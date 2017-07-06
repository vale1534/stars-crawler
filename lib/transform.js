'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uriPrefix = 'http://stars.fe-artisan.com/images';

var json = _fs2.default.readFileSync('stars-2.json');
var stars = JSON.parse(json);

stars.forEach(function (star, index) {
  // star.origin = star.url
  star.avatar = uriPrefix + '/avatar-' + star.id + '.jpg';
  star.img1 = uriPrefix + '/img1-' + star.id + '.jpg';
  star.img2 = uriPrefix + '/img2-' + star.id + '.jpg';
  star.info = star.info.split(/\s*\|\s*/);
  star.url = undefined;
});

_fs2.default.writeFileSync('stars-3.json', JSON.stringify(stars, '', 2));
console.log('Just finish my job.');