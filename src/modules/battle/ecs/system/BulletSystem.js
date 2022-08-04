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

            bulletPos.updateDataFromLatestTick();
            bulletVelocity.updateDataFromLatestTick();

            if (pathComponent != null) {
                if (pathComponent.currentPathIdx === pathComponent.path.length - 2) {
                    EntityManager.destroy(bullet);
                }
                continue;
            }


            if (bulletVelocity.dynamicPosition) {
                if ((bulletVelocity.dynamicPosition).getActive() === false) {
                    bulletVelocity.dynamicPosition = null;
                    EntityManager.destroy(bullet);
                    continue;
                }

                if (Math.abs(bulletVelocity.dynamicPosition.x - bulletPos.x) <= 11 || Math.abs(bulletVelocity.dynamicPosition.y - bulletPos.y) <= 11) {
                    // bullet.removeComponent(VelocityComponent);
                    let collisionComponent = bullet.getComponent(CollisionComponent);

                    collisionComponent.updateDataFromLatestTick();

                    if (collisionComponent) {
                        collisionComponent.width = collisionComponent.originWidth;
                        collisionComponent.height = collisionComponent.originHeight;
                        collisionComponent.saveData();
                    }
                }
            }
        }
    }
})
BulletSystem.typeID = GameConfig.SYSTEM_ID.BULLET;
SystemManager.getInstance().registerClass(BulletSystem);

// FIXME: when dynamic position is not active ==> remove velocity and destroy entity???
// if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive() === false) {
//     velocityComponent.dynamicPosition = null;
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