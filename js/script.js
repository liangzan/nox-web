/* Author:

*/

$.getJSON( '/docs/docs2.json', genDocs );

var docsRoot = document.getElementById('docs');
var u = utils;


function genDocs(docs) {

  var fragment = document.createDocumentFragment();

  $.each( docs, function (key, docs) {
    var pre, code;
    var name = docs.filePath.split('/');

    name = name[ name.length - 1 ].split('.')[0];
    name = name[0].toUpperCase() + name.slice( 1, name.length );

    var elem = u.elem('section');

    u.append( fragment, u.elem( 'h2', name ) );

    var example = ''

    $.each( docs.documentation, function (idx, doc) {

      // var tags = u.elem( 'ul' );

      $.each( doc.tags || [], function (idx, tag) {
        // var tagElem = u.elem( 'li' );

        if ( tag.tag === 'example' ) {
          example = tag.description;
          return;
        }

        // tagElem.className = 'tag';
        // tagElem.innerHTML = '@' +tag.tag + ':' + tag.type + (tag.types ? ' (' +tag.types.join(' | ')+ ') ' : ' ');
        // tagElem.innerHTML += tag.name || tag.description || tag.visibility || '';
        // 
        // tags.appendChild( tagElem );
      });

      // u.append( elem, tags );

      u.append( elem, u.elem( 'div', doc.description ) );

      if (example)
        u.append( elem, makeExample( example ) );

    });

    u.append( fragment, elem );
  });

  render( fragment );

}


function makeExample (str) {
  var pre = u.elem( 'pre' );
  var code = u.elem( 'code' );

  code.innerHTML = u.highlight( str );

  u.append( pre, code );

  return pre;
}

function render (fragment) {
  var elem, elems = u.toList( fragment.childNodes );

  while( elem = elems.shift() ) {
    u.append( docsRoot, elem )
  }
}


