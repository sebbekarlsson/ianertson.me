var fadeIn = ' animated zoomInDown';
var fadeOut = ' animated fadeOut';


function doView(view) {
    document.getElementById('viewblock').className = '';
    window["views"][view](document.getElementById('viewblock'));
}

function setLoader(element) {
    element.innerHTML = '<div style="width: 100%; margin-top: 1rem; text-align: center;"><div class="spinner"></div>';
}

function fadeToColor(r, g, b, element, mode) {
    var interval = setInterval(function() {
        var _r = element.getAttribute('r');
        var _g = element.getAttribute('g');
        var _b = element.getAttribute('b');

        if (typeof _r == 'undefined' || _r == null) {
            _r = 0;
        } else {
            _r = parseInt(_r);
        }

        if (typeof _g == 'undefined' || _g == null) {
            _g = 0;
        } else {
            _g = parseInt(_g);
        }

        if (typeof _b == 'undefined' || _b == null) {
            _b = 0;
        } else {
            _b = parseInt(_b);
        }

        if (_r < r) { _r++; } else { _r--; }
        if (_g < g) { _g++; } else { _g--; }
        if (_b < b) { _b++; } else { _b--; }

        element.setAttribute('r', _r);
        element.setAttribute('g', _g);
        element.setAttribute('b', _b);

        switch(mode) {
            case 'backgroundColor':
                element.style.backgroundColor = 'rgb('+_r+', '+_g+', '+_b+')';
                break;
            case 'color':
                element.style.color = 'rgb('+_r+', '+_g+', '+_b+')';
                break;
        }

        if (_r == r && _g == g && _b == b) {
            clearInterval(interval);
        }
    });
}

function resetColors() {
    fadeToColor(255, 255, 255, document.getElementsByTagName('body')[0], 'backgroundColor');

    var navElements = document.querySelectorAll('.navbar a');

    for (var i = 0; i < navElements.length; i++) {
        fadeToColor(0, 0, 0, navElements[i], 'color');
    }
}

var views = {
    "home": function (viewblock) {
        resetColors();
        setLoader(viewblock);

        wget('/content/home.html', function(e) {
            viewblock.innerHTML = e;
            viewblock.className += fadeIn;
        })
    },
    "projects": function (viewblock) {
        resetColors();
        setLoader(viewblock);

        wget('/content/github.html', function(e) {
            viewblock.innerHTML = e;
            viewblock.className += fadeIn;
        })
    },
    "art": function (viewblock) {
        setLoader(viewblock);

        fadeToColor(0, 0, 0, document.getElementsByTagName('body')[0], 'backgroundColor');

        var navElements = document.querySelectorAll('.navbar a');

        for (var i = 0; i < navElements.length; i++) {
            fadeToColor(255, 255, 255, navElements[i], 'color');
        }

        wget('/content/gallery.html', function(e) {
            viewblock.innerHTML = e;
            viewblock.className += fadeIn;
        });
    },
    "music": function (viewblock) {
        resetColors();
        setLoader(viewblock);

        wget('/content/soundcloud.html', function(e) {
            viewblock.innerHTML = e;
            viewblock.className += fadeIn;
        });
    }
};

document.addEventListener('DOMContentLoaded', function(e) {
    var element = document.getElementsByTagName('body')[0];

    element.setAttribute('r', 255);
    element.setAttribute('g', 255);
    element.setAttribute('b', 255);

    var navElements = document.querySelectorAll('.navbar a');

    for (var i = 0; i < navElements.length; i++) {
        navElements[i].setAttribute('r', 0);
        navElements[i].setAttribute('g', 0);
        navElements[i].setAttribute('b', 0); 
    }

    doView('home');
});
