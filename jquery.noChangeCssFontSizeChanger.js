/*!
 * jquery.noChangeCssFontSizeChanger.js
 *
 * @version   : 1.0.1
 * @author    : syuji-higa
 * @copyright : syuji-higa (https://github.com/syuji-higa)
 * @license   : The MIT License
 * @link      : http://deom.syuji-higa.com/javascript/jquery.noChangeCssFontSizeChanger/sample
 * @modified  : 2013-08-10 21:00
 */

(function($){

	$(function(){
		noChangeCssFontSizeChanger();
	});

	function noChangeCssFontSizeChanger(){

		// options
		var $area = $('#font-size-change-area'),     // font size change area
		    $btn  = $('#font-size-btn').find('img'), // font size change btn
		    unit = '%',                  // font size unit
		    aFontSize = [100, 116, 131], // font size list (order of [html])
		    ovName = '_ov',              // hover image pluse name
		    acName = 'active',           // active btn name
		    defFontSize = 0,             // default font size (order of [aFontSize])
		    cookieExpires = 7,           // cookie save period
		    cookieKey = 'font-size';     // cookie key

		var numFontSize = aFontSize.length,
		    aFontSizeIndex = [],
		    hasImg = ovName != '' && $btn.is('[src]');

		for(var i = 0; i < numFontSize; i++) {
			aFontSizeIndex.push(i);
		}

		/* ==============================
			functions
		============================== */

		function cookieChecker(){
			return $.cookie(cookieKey);
		}

		function imgChanger(a_elm, a_str1, a_str2){
			a_elm.attr('src', a_elm.attr('src').replace(
				new RegExp('^(\.+)' + a_str1 + '(\\.[a-z]+)$'), '$1' + a_str2 + '$2')
			);
		}

		function defImgChanger(a_index){
			imgChanger($btn.eq(a_index), ovName, '');
		}

		function fontSizeChanger(a_index){
			$area.css('font-size', aFontSize[a_index] + unit);
		}

		function cookieSetter(a_index){
			$.cookie(cookieKey, aFontSizeIndex[a_index], {path: '/', expires: cookieExpires});
		}

		/* ==============================
			first ran
		============================== */

		// preload hover img
		if(hasImg){
			for(var i = 0; i < numFontSize; i++){
				$btn.each(function(){
					$('<img>').attr('src', $(this).attr('src').replace(
						new RegExp('^(\.+)(\\.[a-z]+)$'), '$1' + ovName + '$2')
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
				cookieSetter(defFontSize);
				var elm = $btn.eq(defFontSize);
			}
			if(hasImg){
				imgChanger(elm, '', ovName);
			}
			fontSizeChanger(cookieVal);
			elm.addClass(acName);
		})();

		/* ==============================
			events
		============================== */

		// hover event
		if(hasImg){
			$btn.each(function(i){
				function fontSizeChecker(){
					return cookieChecker() != aFontSizeIndex[i]
				}
				$(this).hover(
				function(){
					if(fontSizeChecker()){
						imgChanger($(this), '', ovName);
					}
				},
				function(){
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
			fontSizeChanger(cookieVal);
			if(!$self.hasClass(acName)){
				$btn.not(this).removeClass(acName);
				$self.addClass(acName);
			}
		});

	}

})(jQuery);