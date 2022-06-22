let MovementSystem = System.extend({
    id: GameConfig.SYSTEM_ID.MOVEMENT,
    name: "MovementSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.VELOCITY, GameConfig.COMPONENT_ID.POSITION);
        for (let entity of entityList) {
            let positionComponent = entity.getComponent(GameConfig.COMPONENT_ID.POSITION);
            let velocityComponent = entity.getComponent(GameConfig.COMPONENT_ID.VELOCITY);

            // check if monster goes to the player house, then minus the player energy house
            if (Utils.isMonster(entity)) {
                let monsterInfo = entity.getComponent(GameConfig.COMPONENT_ID.MONSTER_INFO);
                let posTile = Utils.pixel2Tile(positionComponent.x, positionComponent.y);
                if (posTile.x === GameConfig.HOUSE_POSITION.x && posTile.y === GameConfig.HOUSE_POSITION.y) {
                    BattleUILayer.minusPlayerEnergy(monsterInfo.damageEnergy);

                    // destroy
                    // IMPORTANT: duplicate code
                    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE)
                    if (appearanceComponent) {
                        let sprite = appearanceComponent.sprite;
                        sprite.setVisible(false);
                    }
                    entity.setActive(false);
                    for (let key of Object.keys(entity.components)) {
                        entity.components[key].setActive(false);
                    }
                }
            }

            // side-effect
            this._updateVelocityVector(entity, velocityComponent, positionComponent);
            // end side-effect

            positionComponent.x += velocityComponent.speedX * tick;
            positionComponent.y += velocityComponent.speedY * tick;
        }
    },

    _updateVelocityVector: function (entity, velocityComponent, positionComponent) {
        // dynamic target
        if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive()) {
            if (Math.abs(velocityComponent.dynamicPosition.x - positionComponent.x) <= 3
                && Math.abs(velocityComponent.dynamicPosition.y - positionComponent.y) <= 3) {
                // entity.removeComponent(velocityComponent);
                let collisionComponent = entity.getComponent(GameConfig.COMPONENT_ID.COLLISION);
                if (collisionComponent) {
                    collisionComponent.width = 1;
                    collisionComponent.height = 1;
                }
            } else {
                let newVelocity = Utils.calculateVelocityVector(positionComponent, velocityComponent.dynamicPosition,
                    velocityComponent.originSpeed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;

            }
        }
    }
});