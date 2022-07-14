let SkeletonAnimationComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SKELETON,

    ctor: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode) {
        this._super();
        this.reset(fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode);
    },

    reset: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode) {
        Utils.validateMode(mode);
        this.fileJson = fileJson;
        this.fileAtlas = fileAtlas;
        this.timeLine = timeLine;
        this.sequenceAnim = sequenceAnim;
        this.sequenceAnimLoop = sequenceAnimLoop;
        this.accTime = 0;
        this.currentIdx = 0;
        this.position = position;

        this.spine = new sp.SkeletonAnimation(this.fileJson, this.fileAtlas);
        if (mode === GameConfig.PLAYER) {
            BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(this.spine, 4);
        } else if (mode === GameConfig.OPPONENT) {
            BattleManager.getInstance().getBattleLayer().getOpponentMapNode().addChild(this.spine, 4);
        }
    },

    clone: function () {
        return ComponentFactory.create(SkeletonAnimationComponent, this.fileJson, this.fileAtlas, this.timeLine, this.sequenceAnim, this.sequenceAnimLoop);
    }
});
SkeletonAnimationComponent.typeID = GameConfig.COMPONENT_ID.SKELETON;
ComponentManager.getInstance().registerClass(SkeletonAnimationComponent);