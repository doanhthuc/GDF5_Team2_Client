let FrozenSpell = cc.Sprite.extend({
    ctor: function (parent, pos, damage, duration, range) {
        this._super();
        this._s = 200;
        this._t = 0.1;

        parent.addChild(this, 4);
        this.pos = pos;
        this.damage = damage;
        this.duration = duration;
        this.range = range;
        this._iceSpell = new sp.SkeletonAnimation("textures/potion/effect_atk_ice.json", "textures/potion/effect_atk_ice.atlas");
        this.addChild(this._iceSpell,2);

        this.exec();
    },

    exec: function () {
        cc.log("Exec")
        this._countdown = this._t;
        this.setPosition(cc.p(this.pos.x, this.pos.y + this._s));
        this._iceSpell.setAnimation(0, 'animation_ice_ball', true);
        this.scheduleUpdate();
    },

    update: function (dt) {
        this._countdown -= dt;
        let pos = this.getPosition();
        pos.y = pos.y - dt * this._s / this._t;
        this.setPosition(pos);

        if (this._countdown <= 0) {
            this.unscheduleUpdate();
            this._explosionEffect();
        }
    },

    _explosionEffect: function () {
        this._iceSpell.setAnimation(0, 'animation_full', false);
        EventDispatcher.getInstance().dispatchEvent(EventType.EXPLOSION_FROZEN_SPELL,
            {position: this.pos, damage: this.damage, range: this.range, duration: this.duration});
    },
})