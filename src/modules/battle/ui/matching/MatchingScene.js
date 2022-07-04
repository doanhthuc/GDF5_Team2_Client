let MatchingScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this._setupUI();
        this.count = 0;
        this.schedule(this._updateUI, 1);
        // this.scheduleOnce(this.onFinishMatching, 3);

        // call api
        // get map data
        GameConfig.matchingScene = this;
        this.scheduleOnce(function () {
            ShopNetwork.connector.sendGetBattleMap();
        }, 3);
    },

    _setupUI: function () {
        let centerScreenX = cc.winSize.width / 2;
        let centerScreenY = cc.winSize.height / 2;

        // FIXME: hardcode
        let backgroundImage = new cc.Sprite("textures/lobby/lobby_background.png");
        backgroundImage.attr({x: centerScreenX, y: centerScreenY, scaleX: 1.5, scaleY: 1.5});
        this.addChild(backgroundImage);

        let matchingTxtNode = ccs.load("ui/battle/matching/MatchingTextNode.json", "").node;
        this.dotTxt = matchingTxtNode.getChildByName("dot_txt");
        let lookupIcon = matchingTxtNode.getChildByName("lookup_icon");
        let marginTopScreen = 0.1 * cc.winSize.height;
        matchingTxtNode.attr({
            x: centerScreenX,
            y: cc.winSize.height - marginTopScreen
        });
        this.addChild(matchingTxtNode);

        let action1 = cc.moveBy(0.5, cc.p(10, 10));
        let action2 = cc.moveBy(0.5, cc.p(10, -10));
        let action3 = cc.moveBy(0.5, cc.p(-10, -10));
        let action4 = cc.moveBy(0.5, cc.p(-10, 10));

        lookupIcon.runAction(cc.repeatForever(cc.sequence(action1, action2, action3, action4)));


        let mapIconNode = ccs.load("ui/battle/matching/MapIconNode.json", "").node;
        let mapIconHeight = mapIconNode.getChildByName("background").height;
        mapIconNode.attr({
            x: centerScreenX,
            y: centerScreenY
        });
        this.addChild(mapIconNode);

        let cancelButtonNode = ccs.load("ui/battle/matching/CancelButtonNode.json", "").node;
        let buttonHeight = 111;
        cancelButtonNode.attr({
            x: centerScreenX,
            y: centerScreenY - mapIconHeight / 2 - buttonHeight / 2
        });
        cancelButtonNode.getChildByName("button").addTouchEventListener(this._backToLobby.bind(this));
        this.addChild(cancelButtonNode);


    },

    _updateUI: function (tick) {
        this.count = this.count % 4;
        this.dotTxt.setString(this._repeatDotCharacter(this.count));
        this.count++;
    },

    _repeatDotCharacter: function (time) {
        let str = "";
        for (let i = 1; i <= time; i++) {
            str += ".";
        }
        return str;
    },

    _backToLobby: function () {
        fr.view(MainScreen);
    }
})