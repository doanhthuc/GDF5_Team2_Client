const lobbyLayer = cc.node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.lobbyNode = ccs.load(res.LOBBY_NODE, '').node;
        this.addChild(this.lobbyNode);
        this.lobbyNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        for (let i = 0; i < 4; i++) {
            let treasure = new treasureSlot();
            this.lobbyNode.addChild(treasure);
            treasure.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        }
    },


})