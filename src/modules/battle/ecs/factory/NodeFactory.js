let NodeFactory = NodeFactory || {};

NodeFactory.createTrapNode = function () {
    let node = new cc.Node();
    let trapSprite = new cc.Sprite();

    node.addChild(trapSprite, 0, "trap");
    return node;
}