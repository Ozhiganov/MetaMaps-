function LocalHistory(){
    this.präfix = "place-search:";
	this.history = this.readHistory();
}

LocalHistory.prototype.readHistory = function(){
    var präfix = this.präfix;
    var result = [];
    if (localStorage) {
        var reg = new RegExp("^" + präfix, '');
        var caller = this;
        $.each(localStorage, function(key, value) {
            if (key.match(reg) !== null) {
                // Search Results are stored in Base64 encoded Strings
                var match = key.match(/:([\d]+?)/);
                var count = parseInt(match[1]);
                var res = caller.b64DecodeUnicode(value);
                res = JSON.parse(res);
                res.count = count;
                result.push(res);
            }
        });
        result.sort(function(a, b) {
            return b.count - a.count
        });
    }
    return result;
}

LocalHistory.prototype.getFullHistory = function(){
	return this.history;
}

LocalHistory.prototype.clearHistory = function() {
    if(localStorage){
        var präfix = this.präfix;
        $.each(this.history, function(index, value){
            var key = präfix + btoa(value.name);
            localStorage.removeItem(key);
        });
        return true;
    }else{
        return false;
    }
}

LocalHistory.prototype.b64EncodeUnicode = function(str){
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

LocalHistory.prototype.b64DecodeUnicode = function(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}