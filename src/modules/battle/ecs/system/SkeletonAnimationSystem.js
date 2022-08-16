let SkeletonAnimationSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.SKELETON,
    name: "SkeletonAnimationSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity) {
        return entity._hasComponent(SkeletonAnimationComponent);
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(SkeletonAnimationComponent);

        for (let entity of entityList) {
            let skeletonComponent = entity.getComponent(SkeletonAnimationComponent);
            if (skeletonComponent.accTime >= skeletonComponent.timeLine[skeletonComponent.currentIdx]) {
                skeletonComponent.spine.setAnimation(0, skeletonComponent.sequenceAnim[skeletonComponent.currentIdx], skeletonComponent.sequenceAnimLoop[skeletonComponent.currentIdx]);
                skeletonComponent.currentIdx++;
            }
            skeletonComponent.accTime += tick;
        }
    }
});
SkeletonAnimationSystem.typeID = GameConfig.SYSTEM_ID.SKELETON;
SystemManager.getInstance().registerClass(SkeletonAnimationSystem);