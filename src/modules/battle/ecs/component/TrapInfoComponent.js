let TrapInfoComponent = InfoComponent.extend({
    name: "TrapInfo",
    typeID: GameConfig.COMPONENT_ID.TRAP_INFO,

    ctor: function (delayTrigger) {
        this._super();
        this.reset(delayTrigger);
        this.saveData();
    },

    reset: function (delayTrigger) {
        this.delayTrigger = delayTrigger;
        this.isTriggered = false;
    },

    clone: function () {
        return null;
    },

    setTrigger: function (val) {
        this.isTriggered = true;
    },


    saveData: function () {
        const data = {
            delayTrigger: this.delayTrigger,
            isTriggered: this.isTriggered
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.delayTrigger = componentData.delayTrigger;
        this.isTriggered = componentData.isTriggered;
    },
});
TrapInfoComponent.typeID = GameConfig.COMPONENT_ID.TRAP_INFO;
ComponentManager.getInstance().registerClass(TrapInfoComponent);