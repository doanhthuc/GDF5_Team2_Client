let BulletSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.BULLET,
    name: "BulletSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {

    },

    updateData: function () {
        let bulletList = EntityManager.getInstance()
            .getEntitiesHasComponents(VelocityComponent, PositionComponent, BulletInfoComponent);

        for (let bullet of bulletList) {
            let bulletPos = bullet.getComponent(PositionComponent);
            let bulletVelocity = bullet.getComponent(VelocityComponent);
            let pathComponent = bullet.getComponent(PathComponent);

            if (pathComponent != null) {
                if (pathComponent.currentPathIdx === pathComponent.path.length - 2) {
                    EntityManager.destroy(bullet);
                }

                continue;
            }


            if (bulletVelocity.getDynamicPosition()) {
                if ((bulletVelocity.getDynamicPosition()).getActive() === false) {
                    EntityManager.destroy(bullet);
                    continue;
                }

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

// FIXME: when dynamic position is not active ==> remove velocity and destroy entity???
// if (velocityComponent.getDynamicPosition() && velocityComponent.getDynamicPosition().getActive() === false) {
//     velocityComponent.getDynamicPosition() = null;
//     entity.setActive(false);
//     // set sprite false
// }

// // FIXME: what is this?
// if (entity.hasAllComponent(BulletInfoComponent)) {
//     let bulletInfoComponent = entity.getComponent(BulletInfoComponent);
//     if (bulletInfoComponent.type === "frog") {
//         let appearanceComponent = entity.getComponent(AppearanceComponent)
//         if (appearanceComponent) {
//             appearanceComponent.sprite.setVisible(false);
//         }
//     }
// }