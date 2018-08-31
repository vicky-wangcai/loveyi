/**
 * jQuery JSON Plugin
 * version: 2.3 (2011-09-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is
 * copyrighted 2005 by Bob Ippolito.
 */

(function( $ ) {

	var	escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		};

	/**
	 * jQuery.toJSON
	 * Converts the given argument into a JSON respresentation.
	 *
	 * @param o {Mixed} The json-serializble *thing* to be converted
	 *
	 * If an object has a toJSON prototype, that will be used to get the representation.
	 * Non-integer/string keys are skipped in the object, as are keys that point to a
	 * function.
	 *
	 */
	$.toJSON = function( o ) {

		if ( o === null ) {
			return 'null';
		}

		var type = typeof o;

		if ( type === 'undefined' ) {
			return undefined;
		}
		if ( type === 'number' || type === 'boolean' ) {
			return '' + o;
		}
		if ( type === 'string') {
			return $.quoteString( o );
		}
		if ( type === 'object' ) {
			if ( typeof o.toJSON === 'function' ) {
				return $.toJSON( o.toJSON() );
			}
			if ( o.constructor === Date ) {
				var	month = o.getUTCMonth() + 1,
					day = o.getUTCDate(),
					year = o.getUTCFullYear(),
					hours = o.getUTCHours(),
					minutes = o.getUTCMinutes(),
					seconds = o.getUTCSeconds(),
					milli = o.getUTCMilliseconds();

				if ( month < 10 ) {
					month = '0' + month;
				}
				if ( day < 10 ) {
					day = '0' + day;
				}
				if ( hours < 10 ) {
					hours = '0' + hours;
				}
				if ( minutes < 10 ) {
					minutes = '0' + minutes;
				}
				if ( seconds < 10 ) {
					seconds = '0' + seconds;
				}
				if ( milli < 100 ) {
					milli = '0' + milli;
				}
				if ( milli < 10 ) {
					milli = '0' + milli;
				}
				return '"' + year + '-' + month + '-' + day + 'T' +
					hours + ':' + minutes + ':' + seconds +
					'.' + milli + 'Z"';
			}
			if ( o.constructor === Array ) {
				var ret = [];
				for ( var i = 0; i < o.length; i++ ) {
					ret.push( $.toJSON( o[i] ) || 'null' );
				}
				return '[' + ret.join(',') + ']';
			}
			var	name,
				val,
				pairs = [];
			for ( var k in o ) {
				type = typeof k;
				if ( type === 'number' ) {
					name = '"' + k + '"';
				} else if (type === 'string') {
					name = $.quoteString(k);
				} else {
					// Keys must be numerical or string. Skip others
					continue;
				}
				type = typeof o[k];

				if ( type === 'function' || type === 'undefined' ) {
					// Invalid values like these return undefined
					// from toJSON, however those object members
					// shouldn't be included in the JSON string at all.
					continue;
				}
				val = $.toJSON( o[k] );
				pairs.push( name + ':' + val );
			}
			return '{' + pairs.join( ',' ) + '}';
		}
	};

	/**
	 * jQuery.evalJSON
	 * Evaluates a given piece of json source.
	 *
	 * @param src {String}
	 */
	$.evalJSON = function( src ) {
		return eval('(' + src + ')');
	};

	/**
	 * jQuery.secureEvalJSON
	 * Evals JSON in a way that is *more* secure.
	 *
	 * @param src {String}
	 */
	$.secureEvalJSON = function( src ) {

		var filtered = 
			src
			.replace( /\\["\\\/bfnrtu]/g, '@' )
			.replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace( /(?:^|:|,)(?:\s*\[)+/g, '');

		if ( /^[\],:{}\s]*$/.test( filtered ) ) {
			return eval( '(' + src + ')' );
		} else {
			throw new SyntaxError( 'Error parsing JSON, source is not valid.' );
		}
	};

	/**
	 * jQuery.quoteString
	 * Returns a string-repr of a string, escaping quotes intelligently.
	 * Mostly a support function for toJSON.
	 * Examples:
	 * >>> jQuery.quoteString('apple')
	 * "apple"
	 *
	 * >>> jQuery.quoteString('"Where are we going?", she asked.')
	 * "\"Where are we going?\", she asked."
	 */
	$.quoteString = function( string ) {
		if ( string.match( escapeable ) ) {
			return '"' + string.replace( escapeable, function( a ) {
				var c = meta[a];
				if ( typeof c === 'string' ) {
					return c;
				}
				c = a.charCodeAt();
				return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
			}) + '"';
		}
		return '"' + string + '"';
	};

})( jQuery );


		

(function( $ ) {
    /**
     * 构建遮罩层
     */
    function buildMask(target) {
        var state = $.data(target, 'mask');
        var opts = state.options;
        var cc = $(target);

        var p = opts.inline ? target : 'body';

        var mask = $('<div class="mask"></div>').css({
            display: 'block',
            left: (opts.inline ? 0 : cc.offset().left),
            top: (opts.inline ? 0 : cc.offset().top),
            width: cc.outerWidth(),
            height: cc.outerHeight()
        }).appendTo(p);

        var maskMsg = $('<div class="mask-msg"></div>').html(opts.msg).appendTo(p);
        //appendTo后,取maskMsg宽度才有效
        maskMsg.css({
            display: 'block',
            left: (opts.inline ? 0 : mask.offset().left) + (mask.outerWidth() - maskMsg.outerWidth()) / 2,
            top: (opts.inline ? 0 : mask.offset().left) + (mask.outerHeight() - maskMsg.outerHeight()) / 2
        });

        state.mask = mask;
        state.maskMsg = maskMsg;
    }

    /**
     * 绑定事件
     */
    function bindMaskEvents(target) {
        /*$(window).resize(function() {
            var state = $.data(target, 'mask');
            var mask = state.mask;
            var maskMsg = state.maskMsg;

            var cc = $(target);

            mask.css({
                left: cc.offset().left,
                top: cc.offset().top,
                width: cc.outerWidth(),
                height: cc.outerHeight()
            });

            maskMsg.css({
                left: mask.offset().left + (mask.outerWidth() - maskMsg.outerWidth()) / 2,
                top: mask.offset().top + (mask.outerHeight() - maskMsg.outerHeight()) / 2
            });
        });*/
    }

    /**
     * 显示遮罩层
     */
    function show(target) {
        var state = $.data(target, 'mask');
        var mask = state.mask;
        var maskMsg = state.maskMsg;
        var cc = $(target);
        
       // $('select:not([disabled])', target).addClass('mask-disabled-select').attr('disabled', 'disabled'); //ie6下的select的z-index bug
        
        mask.css({
            display: 'block',
            width: cc.outerWidth(),
            height: cc.outerHeight()
        });
        
        maskMsg.css('display', 'block');
    }

    /**
     * 隐藏遮罩层
     */
    function hide(target) {
        var state = $.data(target, 'mask');
        if (state) {
            var mask = state.mask;
            var maskMsg = state.maskMsg;
           // $('select.mask-disabled-select').removeAttr('disabled');
            mask.css('display', 'none');
            maskMsg.css('display', 'none');
        }
    }

    /**
     * 销毁遮罩层
     */
    function destroy(target) {
        var state = $.data(target, 'mask');
        if (state) {
            var mask = state.mask;
            var maskMsg = state.maskMsg;
         //   $('select.mask-disabled-select').removeClass('mask-disabled-select').removeAttr('disabled');
            mask.remove();
            maskMsg.remove();
            $(target).removeData('mask');
        }
    }

    /**
     * 遮罩层
     */
    $.fn.mask = function(options, param) {
        if (typeof options == 'string') {
            return $.fn.mask.methods[options](this, param);
        }
        options = options || {};

        return this.each(function() {
            var state = $.data(this, 'mask');
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
            } else {
                opts = $.extend({}, $.fn.mask.defaults, options);
                $.data(this, 'mask', {
                    options: opts
                });

                buildMask(this);
            }

            if (opts.hide) {
                hide(this);
            } else {
                show(this);
            }

            bindMaskEvents(this);
        });
    };

    $.fn.mask.methods = {
        show: function(jq) {
            jq.each(function() {
                show(this);
            });
        },
        hide: function(jq) {
            jq.each(function() {
                hide(this);
            });
        },
        destroy: function(jq) {
            jq.each(function() {
                destroy(this);
            });
        }
    }

    $.fn.mask.defaults = {
        msg: decodeURIComponent('处理中，请稍候'),
        hide: false,
        inline: true
    }
})( jQuery );

        function openDiv1() {
			$('body').mask().mask('show');
		}
	
		function closeDiv1() {
			$('body').mask().mask('hide');
		}

		/*function onRequestCompleted(xhr,textStatus) {
			closeDiv();
		    if(textStatus=="parsererror"){  	      
		    				var cur = window;
		    				while(cur.parent && cur != cur.parent)
		    				{
		    					cur = cur.parent;		    					
		    				}		    				
                cur.location="/";                 
              }   
		}*/
		function onRequestCompleted(xhr,textStatus) {
			  closeDiv1();
		    if(textStatus=="parsererror"){  	      
		    				var cur = window;
		    				while(cur.parent && cur != cur.parent)
		    				{
		    					cur = cur.parent;		    					
		    				}		    				
                cur.location="/";                 
              }   
		}

		
	//	$.ajaxSetup({beforeSend: openDiv,complete: onRequestCompleted,error: onRequestCompleted});		
		$.ajaxSetup({beforeSend: openDiv1,complete: onRequestCompleted,error: onRequestCompleted});
