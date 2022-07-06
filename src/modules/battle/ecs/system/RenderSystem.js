let RenderSystem = System.extend({
    id: GameConfig.SYSTEM_ID.RENDER,
    name: "RenderSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesByComponents(GameConfig.COMPONENT_ID.APPEARANCE, GameConfig.COMPONENT_ID.POSITION);
        for (let entity of entityList) {
            let appearanceComponent = entity.getComponent(AppearanceComponent);
            let positionComponent = entity.getComponent(PositionComponent);
            appearanceComponent.sprite.setPosition(positionComponent.x, positionComponent.y);

            // side effect
            this._updateHpBarMonsterUI(entity);
        }

        this._updateSkeletonComponentPosition();
    },

    _updateSkeletonComponentPosition: function () {
        let entityList = EntityManager.getInstance().getEntitiesByComponents(GameConfig.COMPONENT_ID.SKELETON, GameConfig.COMPONENT_ID.POSITION);
        for (let entity of entityList) {
            let skeletonComponent = entity.getComponent(SkeletonAnimationComponent);
            let positionComponent = entity.getComponent(PositionComponent);
            skeletonComponent.spine.setPosition(positionComponent.x, positionComponent.y);
        }
    },

    _updateHpBarMonsterUI: function (entity) {
        if (Utils.isMonster(entity)) {
            let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE);
            let lifeComponent = entity.getComponent(GameConfig.COMPONENT_ID.LIFE);
            if (appearanceComponent) {

                let sprite = appearanceComponent.sprite;
                let hpNode = sprite.getChildByName("hp");
                if (hpNode) {
                    let hpProgressBar = hpNode.getChildByName("progress_bar");
                    hpProgressBar.setPercent(lifeComponent.hp / lifeComponent.maxHP * 100);
                }
            }
        }
    },
});