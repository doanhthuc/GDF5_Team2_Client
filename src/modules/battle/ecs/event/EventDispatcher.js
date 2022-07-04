let EventDispatcher = cc.Class.extend({
    name: "EventDispatcher",
    ctor: function () {
        this.eventCallbackStore = {};
    },

    addEventHandler: function (eventName, callback) {
        if (!this.eventCallbackStore[eventName]) {
            this.eventCallbackStore[eventName] = new EventECS(eventName);
        }
        this.eventCallbackStore[eventName].addCallback(callback);
        return this;
    },

    dispatchEvent: function (eventName, data) {
        if (this.eventCallbackStore[eventName]) {
            this.eventCallbackStore[eventName].fire(data);
        }
        return this;
    },

    unRegisterEvent: function (eventName, callback) {
        throw new NotImplementedError();
    }
});

let _instanceBuilder = (function () {
    let _instance = null;
    return {
        getInstance: function () {
            if (_instance === null) {
                _instance = new EventDispatcher();
            }
            return _instance;
        },
        resetInstance: function () {
            _instance = null;
        }
    }
})();
EventDispatcher.getInstance = _instanceBuilder.getInstance;
EventDispatcher.resetInstance = _instanceBuilder.resetInstance;