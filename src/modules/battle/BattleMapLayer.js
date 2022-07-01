let BattleMapLayer = cc.Layer.extend({
    ctor: function (battleData) {
        this._super();
        this.battleData = battleData;
        let rootNode = ccs.load(BattleResource.MAP_NODE, "").node;
        this.addChild(rootNode);

        rootNode.attr({
            x: cc.winSize.width / 2,
            y: (cc.winSize.height - BattleResource.DECK_CARD_HEIGH) / 2 + BattleResource.DECK_CARD_HEIGH
        });

        this.playerMap = this.battleData.getPlayerMap();
        this.path = this.battleData.getPlayerBestPath();
        this._genPlayerMap();
    },

    _genPlayerMap: function () {
        for (let r = 0; r < this.playerMap.length; r++) {
            for (let c = 0; c < this.playerMap[0].length; c++) {
                if (this.playerMap[r][c] === 1) {
                    let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r);
                    let sp = new cc.Sprite("textures/battle/battle_item_attack_speed.png");
                    sp.attr({
                        x: pos.x,
                        y: pos.y
                    })
                    this.addChild(sp);
                }

                if (this.playerMap[r][c] === 2) {
                    let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r);
                    let sp = new cc.Sprite("textures/battle/battle_item_range.png");
                    sp.attr({
                        x: pos.x,
                        y: pos.y
                    })
                    this.addChild(sp);
                }

                if (this.playerMap[r][c] === 3) {
                    let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r);
                    let sp = new cc.Sprite("textures/battle/battle_item_damage.png");
                    sp.attr({
                        x: pos.x,
                        y: pos.y
                    })
                    this.addChild(sp);
                }

                if (this.playerMap[r][c] === 5) {
                    let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r);
                    let sp = new cc.Sprite("textures/map/map_forest_obstacle_2.png");
                    sp.attr({
                        x: pos.x,
                        y: pos.y
                    })
                    this.addChild(sp);
                }

                if (this.playerMap[r][c] === 6) {
                    let pos = Utils.tile2Pixel(c, GameConfig.MAP_HEIGH - 1 - r);
                    let sp = new cc.Sprite("textures/battle/UI/ui_hole.png");
                    sp.attr({
                        x: pos.x,
                        y: pos.y
                    })
                    this.addChild(sp);
                }
            }
        }
    }
});