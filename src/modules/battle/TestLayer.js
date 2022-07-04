let TestLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        let backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 255), cc.winSize.width, cc.winSize.height);
        this.addChild(backgroundLayer);
        this.schedule(this.exec, 2, 100000);
    },

    exec: function () {
        this.s = 200;
        this.t = 0.3;

        this.fireSpell = new sp.SkeletonAnimation('textures/potion/effect_atk_fire.json', 'textures/potion/effect_atk_fire.atlas');
        this.addChild(this.fireSpell, 4);
        this.fireSpell.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2 + this.s));
        this.fireSpell.setAnimation(0, 'animation_fireball', true);

        this.countdown = this.t;
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.countdown -= dt;
        let pos = this.fireSpell.getPosition();
        pos.y = pos.y - dt * this.s / this.t;
        this.fireSpell.setPosition(pos);

        if (this.countdown <= 0) {
            this.explosionEffect();
            this.unscheduleUpdate();
        }
    },

    // animation_top
    // animation_full
    // animation_fireball
    // animation_bottom
    explosionEffect: function () {
        this.fireSpell.setAnimation(1, 'animation_full', false);
    },

});