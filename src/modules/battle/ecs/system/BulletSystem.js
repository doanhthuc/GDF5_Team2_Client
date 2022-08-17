let BulletSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.BULLET,
    name: "BulletSystem",

    ctor: function () {
        this._super();
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === BulletInfoComponent.typeID;
    },

    updateData: function () {
        for (let bulletID in this.getEntityStore()) {
            let bullet = this.getEntityStore()[bulletID];

            let bulletPos = bullet.getComponent(PositionComponent);
            let bulletVelocity = bullet.getComponent(VelocityComponent);
            let pathComponent = bullet.getComponent(PathComponent);

            if (pathComponent != null) {
                if (pathComponent.currentPathIdx === pathComponent.path.length - 2) {
                    EntityManager.destroy(bullet);
                }

                continue;
            }


            // destroy bullet when target monsters are died before the bullet can reach them
            if (bulletVelocity.dynamicEntityId && !bulletVelocity.getDynamicPosition()) {
                EntityManager.destroy(bullet);
                continue;
            }

            // destroy bullet when target monsters is underground


            if (bulletVelocity.getDynamicPosition()) {
                if (Math.abs(bulletVelocity.getDynamicPosition().x - bulletPos.x) <= 10 || Math.abs(bulletVelocity.getDynamicPosition().y - bulletPos.y) <= 10) {
                    // bullet.removeComponent(VelocityComponent);
                    let collisionComponent = bullet.getComponent(CollisionComponent);

                    if (collisionComponent) {
                        collisionComponent.width = collisionComponent.originWidth;
                        collisionComponent.height = collisionComponent.originHeight;
                    }
                }
            }
        }
    }
})
BulletSystem.typeID = GameConfig.SYSTEM_ID.BULLET;
SystemManager.getInstance().registerClass(BulletSystem);
