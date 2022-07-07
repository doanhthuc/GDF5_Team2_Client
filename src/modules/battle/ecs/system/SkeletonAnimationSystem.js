let SkeletonAnimationSystem = System.extend({
    id: GameConfig.SYSTEM_ID.SKELETON,
    name: "SkeletonAnimationSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
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
    },
});