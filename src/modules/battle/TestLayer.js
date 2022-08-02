let testLayer;

let GoldAnimation = cc.Class.extend({
    ctor: function (initPos, targetPos, parent) {
        this.initPos = initPos;
        this.targetPos = targetPos;
        this.parent = parent;
    },

    run: function () {

        let rotateAction = cc.rotateBy(1, 0, -360);
        let moveAction = cc.spawn(cc.moveTo(1, this.targetPos), cc.rotateBy(1, 0, -360));
        let cleanFunc = cc.callFunc((sender) => {
            sender.setVisible(false);
            sender.removeFromParent();
        });
        let compositeAction = cc.sequence(rotateAction, moveAction.easing(cc.easeBackIn()), cleanFunc);

        for (let i = 0; i < 7; i++) {
            let sp = new cc.Sprite("res/textures/common/common_icon_gold_small.png");
            let x = Math.floor(Math.random() * 10) - 5;
            let y = Math.floor(Math.random() * 10) - 5;
            let bornPos = cc.p(this.initPos.x + x * 10, this.initPos.y + y * 10)
            sp.setPosition(bornPos);
            sp.setScale(0.4);
            sp.runAction(compositeAction.clone());
            this.parent.addChild(sp);
        }
    }
});
let TestLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        testLayer = this;
        this.i = 1;
        let backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 255), cc.winSize.width, cc.winSize.height);
        this.addChild(backgroundLayer);

        // let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_cannon_fx.json", "textures/tower/fx/tower_cannon_fx.atlas");
        // spine.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        // spine.setAnimation(0, "attack_1", true);
        // this.addChild(spine);

        this._handleEventKey();
    },

    _handleEventKey: function () {
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                if (touches.length <= 0)
                    return;

                let pixel = touches[0].getLocation();
                let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_cannon_fx.json", "textures/tower/fx/tower_cannon_fx.atlas");

                spine.setPosition(pixel);
                spine.setAnimation(0, "attack_1", true);
                this.addChild(spine);

                // let targetPos = cc.p(cc.winSize.width / 2, cc.winSize.height - 50);
                // let goldAnimation = new GoldAnimation(pixel, targetPos, this);
                // goldAnimation.run();

            }.bind(this)
        }), this)
    },

});