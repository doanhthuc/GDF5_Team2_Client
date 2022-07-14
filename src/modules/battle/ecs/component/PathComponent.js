let PathComponent = Component.extend({
    name: "PathComponent",
    typeID: GameConfig.COMPONENT_ID.PATH,

    ctor: function (pathTile, mode, isConvert=true) {
        this._super();
        this.reset(pathTile, mode, isConvert);
    },

    reset: function (pathTile, mode, isConvert=true) {
        if (isConvert) {
            let pathTile2 = Utils.tileArray2PixelArray(pathTile, mode);
            this.path = pathTile2;
        } else {
            this.path = pathTile;
        }
        this.mode = mode;
        this.currentPathIdx = 0;
    },

    clone: function () {
        return ComponentFactory.create(PathComponent, this.path, this.mode, false);
    }
});
PathComponent.typeID = GameConfig.COMPONENT_ID.PATH;
ComponentManager.getInstance().registerClass(PathComponent);