let testLayer;
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
                let spine = new sp.SkeletonAnimation();

                spine.setPosition(pixel);
                spine.setAnimation(0, "hit_target_bullet", true);
                this.addChild(spine);

            }.bind(this)
        }), this)
    },

});