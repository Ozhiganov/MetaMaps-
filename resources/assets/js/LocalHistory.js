/*
 This Class can store retrieve And Update Objects within the local storage
 It cann only be used to store Javascript Objects
 Each stored Object will get two extra items:
        date: the time in milliseconds when the object was last accessed
        hash: a unique hash code which can compare two of the objects
*/

function LocalHistory(type){
    this.MAXSIZE = 10;
    this.type = type;
    this.praefix = type + ":";
    this.results = [];
	this.history = this.readHistory();
    
}

LocalHistory.prototype.readHistory = function(){
    $.each(localStorage, $.proxy(function(key, value){
        if(key.indexOf(this.praefix) == 0){
            this.results.push(JSON.parse(this.b64DecodeUnicode(value)));
        }
    }, this));
    this.sortResults();
}

LocalHistory.prototype.sortResults = function(){
    this.results.sort(function(a,b){
        return b.date-a.date;
    });
}

LocalHistory.prototype.addItem = function(object){
    if(typeof object != "object") return;

    // Create a new Hash Value for this object
    object.hash = this.createHashValue(object);
    object.date = (new Date()).getTime();
    if(!this.contains(object)){
        // The new Object is not already contained
        // We will add the new one and make sure we are not exeeding the maximum size
        while(this.results.length >= this.MAXSIZE){
            this.results.pop();
        }
        this.results.push(object);
    }else{
        // The object is already contained in our result set
        // We will just update the Time for it 
        $.each(this.results, $.proxy(function(index, value){
            if(value.hash == object.hash){
                this.results[index].date = (new Date()).getTime();
                return 0;
            }
        }, this));
    }
    // Also resort the results
    this.sortResults();
    // And save it into the LocalStorage
    this.saveResults();
    
}

LocalHistory.prototype.saveResults = function(){
    // First delete every existing entry 
    $.each(localStorage, $.proxy(function(key, value){
        if(key.indexOf(this.praefix) == 0){
            localStorage.removeItem(key);
        }
    }, this));
    $.each(this.results, $.proxy(function(index, value){
        var stringObject = JSON.stringify(value);
        stringObject = this.b64EncodeUnicode(stringObject);
        localStorage.setItem(this.praefix + index, stringObject);
    }, this));
}

LocalHistory.prototype.createHashValue = function(object){
    var hash = 0;
    var stringObject = JSON.stringify(object);
    if(stringObject.length == 0) return hash;
    for(var i = 0; i < stringObject.length; i++){
        var character = stringObject.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash;
    }
    return hash;
}

LocalHistory.prototype.contains = function(object){
    var contains = false;
    $.each(this.results, function(index, value){
        // Every Item is a Object which possibly contains more objects
        // Thats why every Items gets the String hash inserted into the object which can compare two items
        if(value.hash == object.hash){
            contains = true;
            return 0;
        }
    });
    return contains;
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