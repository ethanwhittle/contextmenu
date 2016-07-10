/* 
 
 Copyright (c) 2016 Ethan Whittle
 All Rights Reserved
 
 This product is protected by copyright and distributed under
 licenses restricting copying, distribution and decompilation.
 
 */

var contextMenu = false;

$('head').prepend([
    $('<style/>').append([
        '.context_menu, .context_sub_menu { background-color: rgb(245, 255, 250); border: 1px solid gray; border-radius: 3px; margin: 0; z-index: 1; padding: 5px 0; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-shadow: rgb(26, 26, 26) 5px 5px 15px; }',
        '.context_menu { width: 350px; position: fixed; }',
        '.context_sub_menu { width: 100%; position: absolute; display: none; }',
        '.context_menu li, .context_sub_menu li { position: relative; list-style-type: none; padding: 10px; cursor: pointer; color: rgb(26, 26, 26); }',
        '.context_menu li:hover, .context_sub_menu li:hover { background-color: rgb(66,129,244); color: rgb(245, 255, 250); }',
        '.context_menu li strong, .context_sub_menu li strong { float: right; font-size: 125% }'
    ])
]);

function bindContextMenu(setup, e) {

    $('body').one('click', function () {
        removeContextMenu();
    });

    var menuItems = initMenuOptions(setup);

    $('body').prepend([
        $('<ul/>', {id: 'context_menu', class: 'context_menu'}).css({
        }).on('click', function (ev) {
            ev.stopPropagation();
        }).append(menuItems)
    ]);

    $('#context_menu').css({
        'top': function () {
            if (e.clientY + $(this).height() > window.innerHeight - 20) {
                return window.innerHeight - 20 - $(this).height();
            } else if (e.clientY <= 10) {
                return 10;
            } else {
                return e.clientY;
            }
        },
        'left': function () {
            if (e.clientX + $(this).width() > window.innerWidth - 15) {
                return window.innerWidth - 15 - $(this).width();
            } else if (e.clientX <= 10) {
                return 10;
            } else {
                return e.clientX;
            }
        }
    });

}

function displaySubMenu(parent) {
    var position = $(parent).offset();
    var child = $(parent).children('.context_sub_menu');
    $(child).css({
        'top': function () {
            if (position.top + $(child).height() > window.innerHeight - 20) {
                for (var i = 0; i < window.innerHeight; i++) {
                    if ((position.top + $(child).height()) - i <= window.innerHeight - 20) {
                        return -i;
                    }
                }
            } else {
                return 5;
            }
        },
        'left': function () {
            if (position.left + $(parent).width() + $(child).width() > window.innerWidth - 15) {
                return '-99%';
            } else {
                return '99%';
            }
        }
    });
    $(child).show();
}

function initMenuOptions(setup) {
    var menuItems = [];
    for (var i in setup) {
        var object = typeof setup[i] === 'object';
        var fn = typeof setup[i] === 'function';
        var menu = $('<li/>', {html: i});
        if (object) {
            var subMenu = initMenuOptions(setup[i]);
            $(menu).append([
                $('<strong/>', {text: '>'}),
                $('<ul>', {class: 'context_sub_menu'}).append(subMenu)
            ]).mouseenter(function () {
                displaySubMenu(this);
            }).mouseleave(function () {
                $(this).children('.context_sub_menu').hide();
            });
        } else if (fn) {
            (function (i) {
                menu.on('click', function () {
                    setup[i]();
                });
            })(i);
        }
        menuItems.push(menu);
    }
    return menuItems;
}

function removeContextMenu(i) {
    contextMenu = false;
    $('.context_menu').remove();
}

(function ($) {
    $.fn.contextMenu = function (setup) {
        return this.each(function () {
            $(this).bind('contextmenu', function (e) {
                if (contextMenu.length < 1) {
                    bindContextMenu(setup, e);
                } else {
                    removeContextMenu();
                    bindContextMenu(setup, e);
                }
                return false;
            });
        });
    };
}(jQuery));