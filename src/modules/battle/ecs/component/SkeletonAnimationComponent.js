let SkeletonAnimationComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SKELETON,

    ctor: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode) {
        this._super();
        this.reset(fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, position, mode);
    },

    reset: function (fileJson, fileAtlas, timeLine, sequenceAnim, sequenceAnimLoop, parent) {
        this.fileJson = fileJson;
        this.fileAtlas = fileAtlas;
        this.timeLine = timeLine;
        this.sequenceAnim = sequenceAnim;
        this.sequenceAnimLoop = sequenceAnimLoop;
        this.accTime = 0;
        this.currentIdx = 0;

        this.spine = new sp.SkeletonAnimation(this.fileJson, this.fileAtlas);
        parent.addChild(this.spine, 4);
    },

    clone: function () {
        return ComponentFactory.create(SkeletonAnimationComponent, this.fileJson, this.fileAtlas, this.timeLine, this.sequenceAnim, this.sequenceAnimLoop);
    },

    saveData: function () {
        let sequenceAnimCloned = [];
        let sequenceAnimLoopCloned = [];

        for (let i = 0; i < this.sequenceAnimLoop; i++) {
            sequenceAnimCloned.push(this.sequenceAnimLoop[i]);
        }

        for (let i = 0; i < this.sequenceAnim; i++) {
            sequenceAnimCloned.push(this.sequenceAnim[i]);
        }

        const data = {
            fileJson: this.fileJson,
            fileAtlas: this.fileAtlas,
            timeLine: this.timeLine,
            sequenceAnim: sequenceAnimCloned,
            sequenceAnimLoop: sequenceAnimLoopCloned,
            accTime: this.accTime,
            currentIdx: this.currentIdx,
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);

        this.fileJson = componentData.fileJson;
        this.fileAtlas = componentData.fileAtlas;
        this.timeLine = componentData.timeLine;
        this.sequenceAnim = componentData.sequenceAnim;
        this.sequenceAnimLoop = componentData.sequenceAnimLoop;
        this.accTime = 0;
        this.currentIdx = 0;

        this.spine = componentData.spine;
    },
});
SkeletonAnimationComponent.typeID = GameConfig.COMPONENT_ID.SKELETON;
ComponentManager.getInstance().registerClass(SkeletonAnimationComponent);