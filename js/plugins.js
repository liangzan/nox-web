window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


var utils = {

  elem: function (elem, text) {
    var _elem = document.createElement( elem );

    if (text) {
      _elem.appendChild( utils.text( text ) );
    }

    return _elem;
  },

  text: function (text) {
    return document.createTextNode( text );
  },

  append: function (from, to) {
    from.appendChild( to );

    return from;
  },

  toList: function (nodes) {
    return Array.prototype.slice.call( nodes );
  },

  /**
   * Highlight the given `js`.
   */

  highlight: function (js) {
    return js
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
      .replace(/('.*?')/gm, '<span class="string">$1</span>')
      .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
      .replace(/(\d+)/gm, '<span class="number">$1</span>')
      .replace(/\bnew *(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
      .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>')
  }

}