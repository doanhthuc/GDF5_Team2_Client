let NotImplementedError = cc.Class({
    extend: Error,
    ctor: function () {
        this.message = "Not Implemented Error";
        this.name = "NotImplementedError";
    }
});