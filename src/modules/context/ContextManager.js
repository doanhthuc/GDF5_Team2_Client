const ContextManager = cc.Class.extend({
    ctor: function () {
        this.contextMap = new Map();
    },

    getInstance: function () {
        if (!this.instance) {
            this.instance = new ContextManager();
        }
        return this.instance;
    },

    registerContext: function (contextName, context) {
        this.contextMap.set(contextName, context);
    },

    getContext: function (contextName) {
        return this.contextMap.get(contextName);
    },
})

const contextManager = new ContextManager();