let PathComponent = Component.extend({
    name: "PathComponent",
    typeID: GameConfig.COMPONENT_ID.PATH,

    ctor: function (pathTile, mode, isConvert = true) {
        this._super();
        this.reset(pathTile, mode, isConvert);
    },

    reset: function (pathTile, mode, isConvert = true) {
        if (pathTile && isConvert === true) {
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

    readData: function (data) {
        this._super(data);
        this.mode = data.mode;
        this.path = data.path;
        this.currentPathIdx = data.currentPathIdx;
    },
});
PathComponent.typeID = GameConfig.COMPONENT_ID.PATH;
ComponentManager.getInstance().registerClass(PathComponent);

PathComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.mode = Utils.convertShortToMode(inPacket.getShort());
    data.currentPathIdx = inPacket.getInt();

    let pathSize = inPacket.getInt();
    let path = [];
    for (let i = 1; i <= pathSize; i++) {
        if (GameConfig.USER1() === "opponent") {
            path.push(cc.p((-1) * inPacket.getDouble(), (-1) * inPacket.getDouble()));

        } else {
            path.push(cc.p(inPacket.getDouble(), inPacket.getDouble()));
        }
    }
    data.path = path;

    return data;
}