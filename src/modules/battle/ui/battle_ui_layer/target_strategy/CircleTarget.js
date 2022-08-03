let CircleTarget = cc.Node.extend({
    ctor: function () {
        this._super();

        this.rootNode = ccs.load("ui/battle/battle_ui_layer/target_strategy/CircleTarget.json", "").node;
        this.addChild(this.rootNode);

        this.cancelBtn = this.rootNode.getChildByName("cancel_button");
        this.minHp = this.rootNode.getChildByName("min_hp");
        this.maxHp = this.rootNode.getChildByName("max_hp");
        this.minDistance = this.rootNode.getChildByName("min_distance");
        this.maxDistance = this.rootNode.getChildByName("max_distance");

        this.towerTilepos = null;

        this.mappingFunction = [
            {node: this.minHp, handler: this._handlerMinHP.bind(this)},
            {node: this.maxHp, handler: this._handlerMaxHP.bind(this)},
            {node: this.minDistance, handler: this._handlerMinDistance.bind(this)},
            {node: this.maxDistance, handler: this._handlerMaxDistance.bind(this)},
            {node: this.cancelBtn, handler: this._handlerCancelBtn.bind(this)},
        ];

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this._onTouchBegan.bind(this),
        }, this);
    },

    _onTouchBegan: function (touch, event) {
        let globalPos = touch.getLocation();
        for (let i = 0; i < this.mappingFunction.length; i++) {
            let data = this.mappingFunction[i];
            let localPos = data.node.convertToNodeSpace(globalPos);
            let minHpBoundingBox = cc.rect(0, 0, data.node.width, data.node.height);
            let isTouched = cc.rectContainsPoint(minHpBoundingBox, localPos) === true;
            if (isTouched) {
                data.handler();
                return false;
            }
        }
        this.destroy();
        return false;
    },

    setTowerTilePos: function (x, y) {
        this.towerTilepos = cc.p(x, y);
    },

    destroy: function () {
        this.parent.removeChild(this);
    },

    _handlerCancelBtn: function () {
        cc.error("cancel_btn");
        this.destroyTower(this.towerTilepos);
        let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
        //Fixme: add energy plus when destroy tower
        deckEnergyProgress.plusEnergy(6);
        this.destroy();
    },

    _handlerMinHP: function () {
        cc.error("min_hp")
        this.changeTowerTargetStrategy(GameConfig.TOWER_TARGET_STRATEGY.MIN_HP);
        this.destroy();
    },

    _handlerMaxHP: function () {
        cc.error("max_hp")
        this.changeTowerTargetStrategy(GameConfig.TOWER_TARGET_STRATEGY.MAX_HP);
        this.destroy();
    },

    _handlerMinDistance: function () {
        cc.error("min_distance")
        this.changeTowerTargetStrategy(GameConfig.TOWER_TARGET_STRATEGY.MIN_DISTANCE);
        this.destroy();
    },

    _handlerMaxDistance: function () {
        cc.error("max_distance")
        this.changeTowerTargetStrategy(GameConfig.TOWER_TARGET_STRATEGY.MAX_DISTANCE);
        this.destroy();
    },

    _findTowerEntityIdByTilePos: function (tilePos, mode = GameConfig.PLAYER) {
        let battleData = BattleManager.getInstance().getBattleData();
        let mapObject = battleData.getMapObject(mode);
        let tileObject = mapObject[tilePos.x][tilePos.y];
        return tileObject.tower.entityId;
    },

    changeTowerTargetStrategy: function (strategy, tilePos = this.towerTilepos) {
        let entityId = this._findTowerEntityIdByTilePos(tilePos);
        let towerEntity = EntityManager.getInstance().getEntity(entityId);
        let attackComponent = towerEntity.getComponent(AttackComponent);
        if (attackComponent) {
            attackComponent.setTargetStrategy(strategy);
            BattleNetwork.connector.sendChangeTowerTargetStrategy(tilePos, strategy);
        }
    },

    destroyTower: function (tilePos = this.towerTilepos) {
        let entityId = this._findTowerEntityIdByTilePos(tilePos);
        let towerEntity = EntityManager.getInstance().getEntity(entityId);
        EntityManager.destroy(towerEntity);
        BattleNetwork.connector.sendDestroyTower(tilePos);
    }
});