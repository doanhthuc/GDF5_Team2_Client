let BattleMapLayer = cc.Layer.extend({
    ctor: function (battleData) {
        this._super();
        this.battleData = battleData;
        let rootNode = ccs.load(BattleResource.BATTLE_MAP_LAYER, "").node;
        this.addChild(rootNode);

        this.mapNode = {};
        this.mapNode[GameConfig.PLAYER] = rootNode.getChildByName("player_map");
        this.mapNode[GameConfig.OPPONENT] = rootNode.getChildByName("opponent_map");

        rootNode.attr({
            x: cc.winSize.width / 2,
            y: (cc.winSize.height - BattleResource.DECK_CARD_HEIGHT) / 2 + BattleResource.DECK_CARD_HEIGHT
        });

        this.houseSprite = {};
    },

    _genMap: function (mode) {
        this.houseSprite[mode] = new cc.Sprite(BattleResource.HOUSE_IMG);
        this.mapNode[mode].addChild(this.houseSprite[mode], 15000);
        this.houseSprite[mode].setAnchorPoint(cc.p(0.5, 0.2));
        this.houseSprite[mode].setPosition(Utils.tile2Pixel(6, 0, mode));

        let map = this.battleData.getMap(mode);
        for (let r = 0; r < map.length; r++) {
            for (let c = 0; c < map[0].length; c++) {
                let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r, mode);
                let texture = null;

                switch (map[r][c]) {
                    case GameConfig.MAP.ATTACK_SPEED:
                        texture = BattleResource.ITEM_BUFF_ATTACK_SPEED_IMG;
                        break;
                    case GameConfig.MAP.ATTACK_RANGE:
                        texture = BattleResource.ITEM_BUFF_RANGE_IMG;
                        break;
                    case GameConfig.MAP.ATTACK_DAMAGE:
                        texture = BattleResource.ITEM_BUFF_DAMAGE_IMG;
                        break;
                    case GameConfig.MAP.TREE:
                        texture = BattleResource.OBSTACLE_IMG_2;
                        break;
                    case GameConfig.MAP.HOLE:
                        texture = BattleResource.HOLE_IMG;
                        break;
                    default:
                        continue;
                }

                let sp = new cc.Sprite(texture);
                sp.attr({
                    x: pos.x,
                    y: pos.y
                });

                this.mapNode[mode].addChild(sp);
            }
        }
    },
});