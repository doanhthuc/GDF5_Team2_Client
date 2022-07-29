let RenderSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.RENDER,
    name: "RenderSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesHasComponents(AppearanceComponent, PositionComponent);
        for (let entity of entityList) {
            let appearanceComponent = entity.getComponent(AppearanceComponent);
            let positionComponent = entity.getComponent(PositionComponent);

            if (ValidatorECS.isMonster(entity)) {
                let tilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y, entity.mode);
                if (tilePos.x === 2 && tilePos.y === 3) {
                    let lifeComponent = entity.getComponent(LifeComponent);
                    lifeComponent.hp = 0;
                }
            }

            appearanceComponent.sprite.setPosition(positionComponent.x, positionComponent.y);
            appearanceComponent.sprite.setLocalZOrder(10000 - positionComponent.y);

            // side effect
            this._updateHpBarMonsterUI(entity);
        }

        this._updateSkeletonComponentPosition();
    },

    _updateSkeletonComponentPosition: function () {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(SkeletonAnimationComponent, PositionComponent);
        for (let entity of entityList) {
            let skeletonComponent = entity.getComponent(SkeletonAnimationComponent);
            let positionComponent = entity.getComponent(PositionComponent);
            skeletonComponent.spine.setPosition(positionComponent.x, positionComponent.y);
        }
    },

    _updateHpBarMonsterUI: function (entity) {
        let appearanceComponent = entity.getComponent(AppearanceComponent);
        let lifeComponent = entity.getComponent(LifeComponent);
        if (appearanceComponent && lifeComponent) {
            let sprite = appearanceComponent.sprite;
            let hpNode = sprite.getChildByName("hp");
            if (hpNode) {
                let hpProgressBar = hpNode.getChildByName("progress_bar");
                hpProgressBar.setPercent(lifeComponent.hp / lifeComponent.maxHP * 100);
                if (hpProgressBar.getPercent() === 100)
                    hpNode.setVisible(false);
                else
                    hpNode.setVisible(true);
            }
        }
    },
});
RenderSystem.typeID = GameConfig.SYSTEM_ID.RENDER;
SystemManager.getInstance().registerClass(RenderSystem);