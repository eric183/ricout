function Ricout(defaultHash) {
    if (!!defaultHash) {
        location.hash = defaultHash;
    }
};
Ricout.prototype.use = function(hashTo, callback) {
    var slicer = hashTo.slice('1');
    if (/\:/gm.test(slicer)) {
        location.hash = slicer.replace(/\:/gm, '/');
    } else {
        location.hash = slicer;
    };
    callback && callback();
};
Ricout.prototype.hasher = function(object) {
    var _hash;
    var temporaryHash;
    var RegHash;
    var _reg;
    var _arr = [],
        obj = {};

    if (location.hash == "" && !location.search) {
        _hash = '/'
    } else {
        _hash = location.hash.replace('#', '/');
    }

    var RegHash = _hash.replace(/\&/gmi, '/').replace(/\=[a-zA-Z0-9\-]+/gmi, ':.+');
    if (RegHash.slice(1).indexOf('/') >= 0) {
        _hash = _hash.replace(/&/gmi, '/').replace(/=/gmi, '/')
        RegHash = /\/[a-zA-Z0-9\-]+\/(.+)/.exec(_hash) || _hash;
        _reg = new RegExp(RegHash[0].replace(new RegExp(RegHash[1]), '.*'));
        for (let i in object) {
            if (_reg.test(i) || _reg.test(i + '/')) {

                var _obj = {};
                var _arr = RegHash[1].split('/');
                while (_arr.length > 0) {
                    try {
                        _obj[_arr.shift()] = _arr.shift();
                    } catch (e) {
                        throw e
                    }
                }
                object[i](_obj);
                return;
            }
        }

    } else {

        var _reg = new RegExp(_hash);
        for (let n in object) {
            if (_reg.test(n)) {

                object[n]();
                return;
            }
        }

    }
};

Ricout.prototype.map = function(object, callback) {
    var _this = this;

    (function(cb) {
        if (/\?hash\=/.test(location.search) && location.search.indexOf('#') < 0) {
            _this.use(location.search.replace('?hash=', '/'))
        }
        _this.hasher(object);
        setTimeout(cb, 0);
    })(function() {
        window.addEventListener('hashchange', function() {
            callback && callback();
            _this.hasher(object);
        }, false);
    });
};

(function(factory, global) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        global.factory = factory();
    }
})(Ricout, this);
