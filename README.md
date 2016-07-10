#Introduction

Hi.

This repository contains a simple but effective option for utilising a custom contextmenu.

Simply include the file 'contextmenu.js' and you can start binding your context menus.

The code requires jQuery and was developed using jQuery 1.12.4. I have not tested other versions however I am fairly confident that I did not include many deprecated features.

#Using the contextmenu function

The primary function call (.contextMenu()) is an extension of jQuery and as such you can concatinate the function within a chain.

The function requires an object to be parsed. The example below will result in a basic context menu.

```
$('body').contextMenu({
  'Item 1': ''
});
```

You then have to decide what to do with the item in the context menu, this can be defined with a function. For example:

```
$('body').contextMenu({
  'Item 1': function() {
    alert('Item 1');
  }
});
```

You can build more complex 'nested' contextmenu's but parseing objects into the item in the context menu. For example:

```
$('body').contextMenu({
  'Item 1': {
    'Item 1 Sub Item 1': function() {
    alert('Item 1 Sub Item 1');
    }
  }
});
```

This will result in a basic nested context menu. 

There is no limit to the amount of nested sub menus that you can create. The only downside is that the more layers you create the higher the chance of sub menus stacking on top of each other when the menu is open closed to the bottom/left edges.

The nature of jQuery means that you can bind the same contextmenu to multiple elements, or different contextmenus to different elements by class/tag/id.

#Styling the contextmenu

The contextmenu uses minimal styling that is prepended to the head in it's own style tag.

The primary menu has the following id: '#context_menu'. It has some predefined styling as you will see. This can be overwritten with custom styling. There should be no adverse effects of increasing / decreasing the width of the menu.

The sub menus have the class '.context_sub_menu'. The standard styling for these is similar to the primary menu, however the default with is 100% of the parent menu, again there should be no adverse effect if you increase / decrease the width for this class.

Otherwise the only other elements / classes that are used are li's (as both the primary menu and sub menus are ul elements).

A hover pseudo class is used, and a strong element is used to float the 'chevron' indicating nested sub menus and increase the font by 125%.

I have deliberately kept this minimal to allow for flexibility.

Please see the demo 'index.html' file for more assistance.

Enjoy.
