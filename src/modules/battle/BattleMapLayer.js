let BattleMapLayer = cc.Layer.extend({
    ctor: function (battleData) {
        this._super();
        this.battleData = battleData;
        let rootNode = ccs.load(BattleResource.BATTLE_MAP_LAYER, "").node;
        this.addChild(rootNode);

        this.playerMapNode = rootNode.getChildByName("player_map");
        this.opponentMapNode = rootNode.getChildByName("opponent_map");

        rootNode.attr({
            x: cc.winSize.width / 2,
            y: (cc.winSize.height - BattleResource.DECK_CARD_HEIGHT) / 2 + BattleResource.DECK_CARD_HEIGHT
        });

    },

    _genMap: function (mode) {
        let drawNode = new cc.DrawNode();
        drawNode.drawDot(cc.p(0, 0), 20, cc.color.WHITE)
        if (mode === GameConfig.PLAYER) {
            this.playerMapNode.addChild(drawNode);
        } else if (mode === GameConfig.OPPONENT) {
            this.opponentMapNode.addChild(drawNode);
        }

        let map = this.battleData.getMap(mode);
        for (let r = 0; r < map.length; r++) {
            for (let c = 0; c < map[0].length; c++) {
                let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r, mode);
                let texture = null;

                // let node = new cc.DrawNode();
                // node.drawDot(pos, 10, cc.color.WHITE);
                // this.addChild(node);

                // FIXME define 1, 2, 3, 5, 6
                switch (map[r][c]) {
                    case 1:
                        texture = BattleResource.ITEM_BUFF_ATTACK_SPEED_IMG;
                        break;
                    case 2:
                        texture = BattleResource.ITEM_BUFF_RANGE_IMG;
                        break;
                    case 3:
                        texture = BattleResource.ITEM_BUFF_DAMAGE_IMG;
                        break;
                    case 5:
                        texture = BattleResource.OBSTACLE_IMG_2;
                        break;
                    case 6:
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
                if (mode === GameConfig.PLAYER) {
                    this.playerMapNode.addChild(sp);
                } else if (mode === GameConfig.OPPONENT) {
                    this.opponentMapNode.addChild(sp);
                }
            }
        }
    },
});