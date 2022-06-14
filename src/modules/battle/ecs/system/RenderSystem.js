let RenderSystem = System.extend({
    id: GameConfig.SYSTEM_ID.RENDER,
    name: "RenderSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesByComponents(GameConfig.COMPONENT_ID.APPEARANCE, GameConfig.COMPONENT_ID.POSITION);
        for (let entity of entityList) {
            let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE);
            let positionComponent = entity.getComponent(GameConfig.COMPONENT_ID.POSITION);
            appearanceComponent.sprite.setPosition(positionComponent.x, positionComponent.y);
        }
    }
});