(function(global){
  'use strict';

  // function optOnAllChildrenNode(root, callback) {
  //   var child;
  //   if(root.hasChildNodes()) {
  //     for(child = root.firstChild; child; child=child.nextSibling) {
  //       optOnAllChildrenNode(child, callback);
  //     }
  //   }
  //   callback(root);
  // }
  //
  //
  // function printNode(node) {
  //   if(node.nodeType === 1) {
  //     console.log(node.nodeName+(node.className? '.'+node.className:'')+ ': ' + node.textContent);
  //
  //   }
  // }
  // var body = document.body;
  // optOnAllChildrenNode(body, printNode);

  var header = document.getElementsByTagName('h1');
  console.log(header.draggable);
})(self);
