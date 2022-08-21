let TrapInfoComponent = InfoComponent.extend({
    name: "TrapInfo",
    typeID: GameConfig.COMPONENT_ID.TRAP_INFO,

    ctor: function (delayTrigger) {
        this._super();
        this.reset(delayTrigger);
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
});
TrapInfoComponent.typeID = GameConfig.COMPONENT_ID.TRAP_INFO;
ComponentManager.getInstance().registerClass(TrapInfoComponent);

TrapInfoComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}