let CardEnergyNode = cc.Node.extend({
    ctor: function (energy) {
        this._super();

        this._setupUI();
        this.setEnergy(energy);
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.BATTLE_CARD_NODE, "").node;
        this.addChild(rootNode);
        this.energyTxt = rootNode.getChildByName("value");
    },

    setEnergy: function (value) {
        this.energy = value;
        this.energyTxt.setString(value);
    },

    getEnergy: function () {
        return this.energy;
    }
})