let PathComponent = Component.extend({
    name: "PathComponent",
    typeID: GameConfig.COMPONENT_ID.PATH,

    ctor: function (pathTile, mode, isConvert = true) {
        this._super();
        this.reset(pathTile, mode, isConvert);
        this.saveData();
    },

    reset: function (pathTile, mode, isConvert = true) {
        if (isConvert === true) {
            let pathTile2 = Utils.tileArray2PixelCellArray(pathTile, mode);
            this.path = pathTile2;
        } else {
            this.path = pathTile;
        }
        this.mode = mode;
        this.currentPathIdx = 0;
    },

    clone: function () {
        return ComponentFactory.create(PathComponent, this.path, this.mode, false);
    },

    saveData: function () {
        const pathCloned = [];
        for (let i = 0; i < this.path.length; i++) {
            pathCloned.push({x: this.path[i].x, y: this.path[i].y});
        }

        tickManager.getTickData()
            .saveComponentData(this.id, {mode: this.mode, currentPathIdx: this.currentPathIdx, path: pathCloned});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        cc.warn(this.name + " = " + JSON.stringify(componentData));
        this.path = componentData.path;
        this.mode = componentData.mode;
        this.currentPathIdx = componentData.currentPathIdx;
    },
});
PathComponent.typeID = GameConfig.COMPONENT_ID.PATH;
ComponentManager.getInstance().registerClass(PathComponent);