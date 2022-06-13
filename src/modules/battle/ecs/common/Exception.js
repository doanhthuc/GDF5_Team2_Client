let NotImplementedError = cc.Class({
    extend: Error,
    ctor: function () {
        this.message = "Not Implemented Error";
        this.name = "NotImplementedError";
    }
});

let InvalidArgumentTypeError = cc.Class({
    extend: Error,
    ctor: function (variable, correctType) {
        this.message = Utils.getVariableName(variable) + " must be " + Utils.getVariableName(correctType);
        this.name = "InvalidArgumentTypeError";
    }
})