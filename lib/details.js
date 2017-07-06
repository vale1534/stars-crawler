'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getDetails = getDetails;

var _crawler = require('crawler');

var _crawler2 = _interopRequireDefault(_crawler);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stars = [];

var c = new _crawler2.default({
  maxConnection: 5,
  callback: function callback(error, res, done) {
    if (error) {
      console.error(error);
      return done();
    }

    var $ = res.$;

    console.log($('title').text());

    var _$$map$get = $('.starInfoList >ul >li >p').map(function (i, e) {
      return $(e).text();
    }).get(),
        _$$map$get2 = _slicedToArray(_$$map$get, 3),
        born = _$$map$get2[0],
        country = _$$map$get2[1],
        info = _$$map$get2[2];

    var match = $('.starBigBg').attr('style').match(/\((.+)\)/);
    var img1 = match ? match[1] : '';
    var img2 = $('.starBigBg .star_pic >img').attr('src');

    stars.push(_extends({}, res.options.meta, {
      born: born.trim().replace(/^\s+/, ''),
      country: country.trim().replace(/^\s+/, ''),
      info: info.trim().replace(/^\s+/, ''),
      img1: img1.trim().replace(/^\s+/, ''),
      img2: img2.trim().replace(/^\s+/, '')
    }));

    done();
  }
});

function getDetails(metas, callback) {
  console.log('metas.length:', metas.length);
  metas.map(function (m) {
    return c.queue({ uri: m.url, meta: m });
  });
  c.on('drain', function () {
    return callback(stars);
  });
}