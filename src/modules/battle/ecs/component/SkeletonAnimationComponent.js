let SkeletonAnimationComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SKELETON,

    ctor: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position) {
        this._super();
        this.reset(fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position);
    },

    reset: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position) {
        this.fileJson = fileJson;
        this.fileAtlas = fileAtlas;
        this.timeLine = timeLine;
        this.sequenceAnim = sequenceAnim;
        this.sequenceAnimLoop = sequenceAnimLoop;
        this.accTime = 0;
        this.currentIdx = 0;
        this.position = position;

        this.spine = new sp.SkeletonAnimation(this.fileJson, this.fileAtlas);
        GameConfig.gameLayer.mapLayer.addChild(this.spine, 4);
    },

    clone: function () {
        return new SkeletonAnimationComponent(this.fileJson, this.fileAtlas, this.timeLine, this.sequenceAnim, this.sequenceAnimLoop);
    }

});
SkeletonAnimationComponent.typeID = GameConfig.COMPONENT_ID.SKELETON;
ComponentManager.getInstance().registerClass(SkeletonAnimationComponent);