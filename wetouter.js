export default function frontRouter(defaultHash) {
    if (!!defaultHash) {
        location.hash = defaultHash;
    }
};

frontRouter.prototype.use = function(hashTo, callback) {

    var slicer = hashTo.slice('1');
    if (/\:/gm.test(slicer)) {
        location.hash = slicer.replace(/\:/gm, '/');
    } else {
        location.hash = slicer;
    };

    callback && callback();
};

frontRouter.prototype.haser = function() {

}

frontRouter.prototype.init = function() {
    window.addEventListener('hashchange', function() {
        if (document.location == '#hash') {}
    }, false);
};

frontRouter.prototype.map = function(object) {
    window.addEventListener('hashchange', function() {
        var _hash;

        if (location.hash == "") {
            _hash = '/'
        } else {
            _hash = location.hash.replace('#', '/');
        }

        var _reg = new RegExp(_hash);
        for (var i in object) {
            if (_reg.test(i)) {
                object[i]();
            } 
            // else if(new RegExp('error').test(i) || 0) {
            //     object['error']();
            // }
        }
    }, false);
};

