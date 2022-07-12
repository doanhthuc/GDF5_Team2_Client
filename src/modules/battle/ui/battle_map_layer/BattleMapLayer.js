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

        // if (mode !== GameConfig.PLAYER) {
        //     return;
        // }
        // cc.warn("==>");
        // const drawNode = new cc.DrawNode();
        // let count = 0;
        // let pixelPos;
        // let pixelContainer = [];
        // for (let col = 0; col < GameConfig.MAP_WIDTH * 11; col++) {
        //     for (let row = 0; row < GameConfig.MAP_HEIGH * 11; row++) {
        //         pixelPos = Utils.cell2Pixel(col, row, mode);
        //         pixelContainer.push({x: pixelPos.x, y: pixelPos.y});
        //         count++;
        //         drawNode.drawDot(cc.p(pixelPos.x, pixelPos.y), 1, cc.color.BLACK);
        //     }
        // }
        // if (mode === GameConfig.PLAYER) {
        //     this.playerMapNode.addChild(drawNode);
        // } else if (mode === GameConfig.OPPONENT) {
        //     this.opponentMapNode.addChild(drawNode);
        // }
        // cc.log("count = " + count);
        // cc.log("Position = " + JSON.stringify(Utils.cell2Pixel(0, 0, GameConfig.PLAYER)))
        // pixelContainer.push({x: -266, y: -189})
        // let dup = [];
        // for (let i = 0; i < pixelContainer.length - 1; i++) {
        //     for (let j = i + 1; j < pixelContainer.length; j++) {
        //         if (pixelContainer[i].x === pixelContainer[j].x && pixelContainer[i].y === pixelContainer[j].y) {
        //             dup.push(pixelContainer[i]);
        //         }
        //     }
        // }
        // cc.log("dup length = " + dup.length);
    },
});