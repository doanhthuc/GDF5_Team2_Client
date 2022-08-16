let SkeletonAnimationComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SKELETON,

    ctor: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode) {
        this._super();
        this.reset(fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode);
    },

    reset: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, parent, addChild=true) {
        this.fileJson = fileJson;
        this.fileAtlas = fileAtlas;
        this.timeLine = timeLine;
        this.sequenceAnim = sequenceAnim;
        this.sequenceAnimLoop = sequenceAnimLoop;
        this.accTime = 0;
        this.currentIdx = 0;

        this.spine = new sp.SkeletonAnimation(this.fileJson, this.fileAtlas);
        this.spine.retain();
        if (addChild) {
            parent.addChild(this.spine, 0);
        }
    },

    clone: function () {
        return ComponentFactory.create(SkeletonAnimationComponent, this.fileJson, this.fileAtlas, this.timeLine, this.sequenceAnim, this.sequenceAnimLoop, null, false);
    },
});
SkeletonAnimationComponent.typeID = GameConfig.COMPONENT_ID.SKELETON;
ComponentManager.getInstance().registerClass(SkeletonAnimationComponent);