const MainScreen = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        let rootNode = ccs.load(res.MAIN_SCREEN, '');
        this.addChild(rootNode.node);
        const playerHolder = rootNode.node.getChildByName('playerInfoHolder')
        // cc.log(JSON.stringify(playerHolder.getChildren()));
        for (let i = 0; i < playerHolder.getChildren().length; i++) {
            cc.log(JSON.stringify(playerHolder.getChildren()[i].getName()));
        }
        cc.log(playerHolder.getChildByName('usernameTxt'));
        cc.log(rootNode.node.getChildByName('playerInfoHolder').getChildByName('usernameTxt').setString('Hello'));
        cc.log('Hello World');

    }


});