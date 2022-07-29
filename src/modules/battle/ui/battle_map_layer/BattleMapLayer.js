let BattleMapLayer = cc.Layer.extend({
    ctor: function (battleData) {
        this._super();
        this.battleData = battleData;
        let rootNode = ccs.load(BattleResource.BATTLE_MAP_LAYER, "").node;
        this.addChild(rootNode);

        this.mapNode = {};
        this.mapNode[GameConfig.PLAYER] = rootNode.getChildByName("player_map");
        this.mapNode[GameConfig.OPPONENT] = rootNode.getChildByName("opponent_map");

        // river
        // FIXME: hardcode
        let riverSpine = new sp.SkeletonAnimation("res/textures/map/fx/ho_nuoc.json", "res/textures/map/fx/ho_nuoc.atlas");
        riverSpine.setAnimation(0, "animation", true);
        riverSpine.setAnchorPoint(cc.p(0.5, 0.5));
        riverSpine.setPosition(0, -64);
        rootNode.addChild(riverSpine, 0);

        rootNode.attr({
            x: cc.winSize.width / 2,
            y: (cc.winSize.height - BattleResource.DECK_CARD_HEIGHT) / 2 + BattleResource.DECK_CARD_HEIGHT
        });

        this.houseSprite = {};
        this._spriteContainerActive = [];
        this._spriteContainerInActive = [];
    },

    _genMap: function (mode) {
        this.houseSprite[mode] = new cc.Sprite(BattleResource.HOUSE_IMG);
        this.mapNode[mode].addChild(this.houseSprite[mode], 15000);
        this.houseSprite[mode].setAnchorPoint(cc.p(0.5, 0.2));
        this.houseSprite[mode].setPosition(Utils.tile2Pixel(6, 0, mode));

        let map = this.battleData.getMap(mode);
        for (let r = 0; r < map.length; r++) {
            for (let c = 0; c < map[0].length; c++) {
                let tilePos = cc.p(c, GameConfig.MAP_HEIGH - 1 - r);
                let pos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
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
                        EntityFactory.createTree(tilePos, mode);
                        continue;
                    case GameConfig.MAP.HOLE:
                        EntityFactory.createHole(tilePos, mode);
                        continue;
                    default:
                        continue;
                }

                let sp = new cc.Sprite(texture);
                sp.attr({
                    x: pos.x,
                    y: pos.y
                });

                this.mapNode[mode].addChild(sp, 1);
            }
        }

        this.showPlayerMonsterPath();
    },

    showPlayerMonsterPath: function () {
        while (this._spriteContainerActive.length > 0) {
            let activeSp = this._spriteContainerActive.pop();
            this._spriteContainerInActive.push(activeSp);
        }

        let shortestPathForEachTile = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(GameConfig.PLAYER);
        let row = GameConfig.MAP_HEIGH - 1 - GameConfig.MONSTER_BORN_POSITION.y, col = GameConfig.MONSTER_BORN_POSITION.x;
        let tilePath = shortestPathForEachTile[row][col];

        for (let i = 0; i < tilePath.length - 1; i++) {
            let currentTilePos = tilePath[i];
            let nextTilePos = tilePath[i+1];

            let direction = Utils.getDirectionOf2Tile(currentTilePos, nextTilePos);
            let currentPixelPos = Utils.tile2Pixel(currentTilePos.x, currentTilePos.y, GameConfig.PLAYER);

            let sp = this._spriteContainerInActive.pop();
            if (!sp) {
                sp = new cc.Sprite("res/textures/battle/UI/ui_icon_arrow.png");
                sp.retain();
                this.mapNode[GameConfig.PLAYER].addChild(sp, 0);
            } else {
                sp.setRotation(0);
            }
            this._spriteContainerActive.push(sp);

            sp.setPosition(currentPixelPos);
            switch (direction) {
                case GameConfig.DIRECTION.TOP:
                    sp.setRotation(-90);
                    break;
                case GameConfig.DIRECTION.RIGHT:
                    // default is right direction
                    break;
                case GameConfig.DIRECTION.BOTTOM:
                    sp.setRotation(90);
                    break;
                case GameConfig.DIRECTION.LEFT:
                    sp.setRotation(180);
                    break;
                default:
                    return;
            }
        }
    }
});