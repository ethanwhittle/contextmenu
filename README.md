#Introduction

Hi.

This repository contains a simple but effective option for utilising a custom contextmenu.

Simply include the file 'contextmenu.js' and you can start binding your context menus.

The code requires jQuery and was developed using jQuery 1.12.4. I have not tested other versions however I am fairly confident that I did not include many deprecated features.

The primary function call (.contextMenu()) is an extension of jQuery and as such you can concatinate the function within a chain.

The function requires an object to be parsed. The example below will result in a basic context menu.

$('body').contextMenu({
  'Item 1': ''
});

You then have to decide what to do with the item in the context menu, this can be defined with a function. For example:

$('body').contextMenu({
  'Item 1': function() {
    alert('Item 1');
  }
});

You can build more complex 'nested' contextmenu's but parseing objects into the item in the context menu. For example:

$('body').contextMenu({
  'Item 1': {
    'Item 1 Sub Item 1': function() {
    alert('Item 1 Sub Item 1');
    }
  }
});

This will result in a basic nested context menu
