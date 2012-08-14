/* Author:

*/

var files = [
  '/docs/application.json',
  '/docs/express.json',
  '/docs/middleware.json',
  '/docs/request.json',
  '/docs/utils.json',
  '/docs/view.json',
  '/docs/router/index.json',
  '/docs/router/route.json'
];
var docs = {};
var count = files.length;

$.each( files, function (idx, file) {

  $.getJSON( file, function (res) {

    docs[ file ] = res;

    if ( -- count === 0 ) {
      done();
    }
  })

});

function done() {

  $.each( docs, function (key, docs) {

    var types = getTypes( docs );

    var elem = document.createElement('div');
    elem.className = 'block';
    elem.innerHTML = '<h1>' +key+ '</h1>';

    $.each( docs, function (idx, doc) {
      var ctx = doc.ctx,
          name = ctx && ctx.name ? ctx.name : '',
          type = ctx && ctx.type ? ctx.type : '',
          tags = document.createElement( 'ul' );

      if ( type !== 'method' ) {
        return;
      }

      if (ctx.receiver) {
        name = ctx.receiver + '.' + name;
      }

      var title = document.createElement('h3');
      title.innerHTML = name;

      elem.appendChild( title );

      $.each( doc.tags || [], function (idx, tag) {
        var tagElem = document.createElement( 'li' );

        tagElem.innerHTML = '@' + tag.type + (tag.types ? ' (' +tag.types.join(' | ')+ ') ' : ' ');
        tagElem.innerHTML += tag.name || tag.description || tag.visibility || '';

        tags.appendChild( tagElem );
      });

      elem.appendChild( tags );

      var desc = document.createElement('div');
      desc.innerHTML = doc && doc.description ? doc.description.full : '';

      elem.appendChild( desc );

      var code = document.createElement('div');
      code.className = 'code';
      code.innerHTML = doc.code;

      elem.appendChild( code );

      elem.appendChild( document.createElement('hr') );

      document.body.appendChild( elem );
    });

    
  });

  $('.code').codemirror({ lineNumbers:true })
}

function getTypes (data) {
  var types = $.map( docs, function (doc) {
      if (doc.ctx) {
        return doc.ctx.type;
      }
    });

    $.unique( types );

    return types;
}
//$('.code').codemirror({ lineNumbers:true });