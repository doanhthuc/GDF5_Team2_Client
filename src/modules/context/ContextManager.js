const ContextManager = cc.Class.extend({
    ctor: function () {
        this.contextMap = new Map();
        this.registerContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT, new UserContext());
        this.registerContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT, new InventoryContext());
        this.registerContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT, new TreasureContext());
        this.registerContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT, new CheatContext());
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

    resetContextData: function () {
        // this.contextMap.forEach((context) => {
        //     context.resetContextData();
        // });
        for (let [key, value] of  this.contextMap.entries()) {
            cc.log('Context manager line 30: ' + key + " = " + value)
            value.resetContextData()
        }
    }
})

const contextManager = new ContextManager();