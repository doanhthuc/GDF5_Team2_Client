let PathComponent = Component.extend({
    name: "PathComponent",
    typeID: GameConfig.COMPONENT_ID.PATH,

    ctor: function (pathTile, mode) {
        this._super();
        this.reset(pathTile, mode);
    },

    reset: function (pathTile, mode) {
        this.path = Utils.tileArray2PixelArray(pathTile, mode);
        this.currentPathIdx = 0;
    },

    clone: function () {
        return new PathComponent(this.path);
    }
});
PathComponent.typeID = GameConfig.COMPONENT_ID.PATH;
ComponentManager.getInstance().registerClass(PathComponent);