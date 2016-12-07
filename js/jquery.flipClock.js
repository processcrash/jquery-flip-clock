/**
 * 基于 jquery 的数字翻页钟效果
 * @date: 2016/12/7
 * @author: zail
 * @version: 0.0.1
 */

(function ($) {
  if (!$) {console.warn('flipClock 需要引入 jquery!'); return;}
  
  $.fn.flipClock = function (val) {
    
    var _self = this; // this 指针
    _self.val = val || '0';


    // 把字符转换成数组
    function _strToArray(s) {
      s = s || _self.val;
      return s.split('');
    }
    
    // 所有数字的标签
    var _html = '<div class="flip-clock-digit-item">' +
                '  <div class="digit-top">' +
                '    <span class="digit-wrap"></span>' +
                '  </div>' +
                '  <div class="shadow-top"></div>' +
                '  <div class="digit-bottom">' +
                '    <span class="digit-wrap"></span>' +
                '  </div>' +
                '  <div class="shadow-bottom"></div>' +
                '</div>';
    
    // 为父元素添加每一个数字的子元素
    function _addDigit() {
      var arr = _strToArray();
      for (var i=0; i<arr.length; i++) {
        var item = $('<div>', {class: 'flip-clock-digit'});
        if (!isNaN(parseInt(arr[i]))) {
          for(var j=0; j<=9; j++) {
            item.append(_html);
            var current = item.find('.flip-clock-digit-item')[j];
            $(current).find('.digit-wrap').append(j);
          }
        } else {
          item.append(_html);
          var current = item.find('.flip-clock-digit-item');
          $(current).find('.digit-wrap').append(arr[i]);
        }
        _self.append(item);
      }
    }

    function _setValue() {
      var arr = _strToArray();
      for (var i in arr) {
        if (!isNaN(parseInt(arr[i]))) {
          var _digit = _self.find('.flip-clock-digit')[i];
          var _active = $(_digit).find('.flip-clock-digit-item')[arr[i]];
          var _previous;

          if (parseInt(arr[i])+1 >= 10) {
            _previous = $(_digit).find('.flip-clock-digit-item')[0];
          } else {
            _previous = $(_digit).find('.flip-clock-digit-item')[parseInt(arr[i])+1];
          }
          $(_active).addClass('active');
          $(_previous).addClass('previous');
        }
      }
    }

    function _upgradeValue (arr) {
      if (!arr) return;
      
      var _current = _strToArray();

      for (var i in arr) {
        if (!isNaN(parseInt(arr[i]))) {
          if (arr[i] != _current[i]) {

            var _digit = _self.find('.flip-clock-digit')[i];
            
            $(_digit).find('.flip-clock-digit-item').removeClass('active')
            $(_digit).find('.flip-clock-digit-item').removeClass('previous')

            var _active = $(_digit).find('.flip-clock-digit-item')[arr[i]];
            var _previous;

            if (parseInt(arr[i])+1 >= 10) {
              _previous = $(_digit).find('.flip-clock-digit-item')[0];
            } else {
              _previous = $(_digit).find('.flip-clock-digit-item')[parseInt(arr[i])+1];
            }
            $(_active).addClass('active');
            $(_previous).addClass('previous');

          }
        }
      }

    }

    // 初始化函数
    function init() {
      _addDigit();
      _setValue();
    }
    init();

    // 更新数字
    this.upgrade = function (s) {
      if (!s) return;
      if (_self.val.length != s.length) {
        _self.html('');
        _self.val = s;
        // 重新渲染
        init();
      }
      var arr = _strToArray(s);
      _upgradeValue(arr);
      _self.val = s;
    }

    return _self;
  }
})(jQuery)