/*!
 * jquery.noChangeCssFontSizeChanger.js
 *
 * @version   : 1.0.2
 * @author    : syuji-higa
 * @copyright : syuji-higa (https://github.com/syuji-higa)
 * @license   : The MIT License
 * @link      : http://deom.syuji-higa.com/javascript/jquery.noChangeCssFontSizeChanger/sample
 * @modified  : 2013-08-28 15:17
 */

(function($){

	$(function(){
		$('#font-size-change-area').noChangeCssFontSizeChanger();
	});

	$.fn.noChangeCssFontSizeChanger = function(options){

		// options
		var o = $.extend({
			elmBtn: '#font-size-btn li', // font size change btn
			ovName: '_ov',               // hover image pluse name
			acName: 'active',            // active btn name
			font: {
				unit: 'rem',             // font size unit
				size: [1, 1.2, 1.4], // font size list (order of [html])
				def : 0                // default font size (order of [o.font.size])
			},
			cookie: {
				expires: 7,          // cookie save period
				key    : 'font-size' // cookie key
			}
		}, options);

		var $area = $(this),
		    $btn  = $(o.elmBtn),
		    numFontSize = o.font.size.length,
		    fontSizeIndex = [],
		    hasImg = o.ovName != '' && $btn.find('img').is('[src]');

		for(var i = 0; i < numFontSize; i++) {
			fontSizeIndex.push(i);
		}

		/* ==============================
			functions
		============================== */

		function cookieChecker(){
			return $.cookie(o.cookie.key);
		}

		function imgChanger(a_elm, a_str1, a_str2){
			a_elm.find('img').attr('src', a_elm.find('img').attr('src').replace(
				new RegExp('^(\.+)' + a_str1 + '(\\.[a-z]+)$'), '$1' + a_str2 + '$2')
			);
		}

		function defImgChanger(a_index){
			imgChanger($btn.eq(a_index), o.ovName, '');
		}

		function fontSizeChanger(a_index){
			$area.css('font-size', o.font.size[a_index] + o.font.unit);
		}

		function cookieSetter(a_index){
			$.cookie(o.cookie.key, fontSizeIndex[a_index], {path: '/', expires: o.cookie.expires});
		}

		/* ==============================
			first ran
		============================== */

		// preload hover img
		if(hasImg){
			for(var i = 0; i < numFontSize; i++){
				$btn.find('img').each(function(){
					$('<img>').attr('src', $(this).attr('src').replace(
						new RegExp('^(\.+)(\\.[a-z]+)$'), '$1' + o.ovName + '$2')
					);
				});
			}
		}

		(function(){
			var cookieVal = cookieChecker();
			if(cookieVal){
				var elm = $btn.eq(cookieVal);
			}
			else {
				cookieSetter(o.font.def);
				var elm = $btn.eq(o.font.def);
			}
			if(hasImg){
				imgChanger(elm, '', o.ovName);
			}
			fontSizeChanger(cookieVal);
			elm.addClass(o.acName);
		})();

		/* ==============================
			events
		============================== */

		// hover event
		if(hasImg){
			$btn.each(function(i){
				function fontSizeChecker(){
					return cookieChecker() != fontSizeIndex[i]
				}
				$(this)
				.on('mouseover', function(){
					if(fontSizeChecker()){
						imgChanger($(this), '', o.ovName);
					}
				})
				.on('mouseout', function(){
					if(fontSizeChecker()){
						defImgChanger(i);
					}
				});
			});
		}

		// click event
		$btn.click(function(){
			var $self = $(this),
			    index = $btn.index(this),
			    cookieVal = cookieChecker();
			if(hasImg && index != cookieVal){
				defImgChanger(cookieVal);
			}
			cookieSetter(index);
			fontSizeChanger(index);
			if(!$self.hasClass(o.acName)){
				$btn.not(this).removeClass(o.acName);
				$self.addClass(o.acName);
			}
		});

	}

})(jQuery);
