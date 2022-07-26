let CircleTarget = cc.Node.extend({
    ctor: function () {
        this._super();

        this.rootNode = ccs.load("ui/battle/battle_ui_layer/target_strategy/CircleTarget.json", "").node;
        this.addChild(this.rootNode);

        this.cancelBtn = this.rootNode.getChildByName("cancel_button");
        this.minHp = this.rootNode.getChildByName("min_hp");
        this.maxHp = this.rootNode.getChildByName("max_hp");
        this.minDistance = this.rootNode.getChildByName("min_distance");
        this.maxDistance = this.rootNode.getChildByName("max_distance");

        this.mappingFunction = [
            {node: this.minHp, handler: this._handlerMinHP},
            {node: this.maxHp, handler: this._handlerMaxHP},
            {node: this.minDistance, handler: this._handlerMinDistance},
            {node: this.maxDistance, handler: this._handlerMaxDistance},
            {node: this.cancelBtn, handler: this._handlerCancelBtn},
        ];

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this._onTouchBegan.bind(this),
        }, this);
    },

    _onTouchBegan: function (touch, event) {
        let globalPos = touch.getLocation();
        for (let i = 0; i < this.mappingFunction.length; i++) {
            let data = this.mappingFunction[i];
            let localPos = data.node.convertToNodeSpace(globalPos);
            let minHpBoundingBox = cc.rect(0, 0, data.node.width, data.node.height);
            let isTouched = cc.rectContainsPoint(minHpBoundingBox, localPos) === true;
            if (isTouched) {
                data.handler();
                return false;
            }
        }
        this.destroy();
        return false;
    },

    destroy: function () {
        this.parent.removeChild(this);
    },

    _handlerCancelBtn: function () {
        cc.error("cancel_btn");
    },

    _handlerMinHP: function () {
        cc.error("min_hp")
    },

    _handlerMaxHP: function () {
        cc.error("max_hp")
    },

    _handlerMinDistance: function () {
        cc.error("min_distance")
    },

    _handlerMaxDistance: function () {
        cc.error("max_distance")
    }
});