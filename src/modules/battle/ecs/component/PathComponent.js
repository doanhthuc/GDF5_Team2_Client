let PathComponent = Component.extend({
    name: "PathComponent",
    typeID: GameConfig.COMPONENT_ID.PATH,

    ctor: function (pathTile, mode, isConvert = true) {
        this._super();
        this.reset(pathTile, mode, isConvert);
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
});
PathComponent.typeID = GameConfig.COMPONENT_ID.PATH;
ComponentManager.getInstance().registerClass(PathComponent);

PathComponent.prototype.readSnapshot = function (inPacket) {
    // cc.log("PathComponent.readSnapshot()")
    // let component = Component.readSnapshot(inPacket);
    //
    // component.mode = inPacket.getShort() === 1 ? GameConfig.PLAYER : GameConfig.OPPONENT;
    // component.currentPathIdx = inPacket.getInt();
    //
    // let pathSize = inPacket.getInt();
    // let path = [];
    // for (let i = 1; i <= pathSize; i++) {
    //     path.push(cc.p(inPacket.getDouble(), inPacket.getDouble()));
    // }
    // component.path = path;
    //
    // return component;
}