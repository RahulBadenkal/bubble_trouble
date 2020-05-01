(function(exports){

    exports.isEmpty = function(text){
        return text === null || text === undefined || text.toString().trim() === ""
    }


})(typeof exports === 'undefined' ? this.utils={}: exports)
