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

EventDispatcher._instance = null;
EventDispatcher.getInstance = function () {
    if (EventDispatcher._instance === null) {
        EventDispatcher._instance = new EventDispatcher();
    }
    return EventDispatcher._instance;
}