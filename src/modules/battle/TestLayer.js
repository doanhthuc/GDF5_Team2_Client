// let FrozenSpell = cc.Sprite.extend({
//     ctor: function (parent, pos, damage, range) {
//         this._super();
//         this._s = 200;
//         this._t = 0.1;
//
//         cc.log("A")
//         parent.addChild(this, 4);
//         cc.log("B")
//
//         this.pos = pos;
//         this.damage = damage;
//         this.range = range;
//         this._iceSpell = new sp.SkeletonAnimation("textures/potion/effect_atk_ice.json", "textures/potion/effect_atk_ice.atlas");
//         this.addChild(this._iceSpell,2);
//
//         this.exec();
//     },
//
//     exec: function () {
//         cc.log("Exec")
//         this._countdown = this._t;
//         this.setPosition(cc.p(this.pos.x, this.pos.y + this._s));
//         this._iceSpell.setAnimation(0, 'animation_ice_ball', true);
//         this.scheduleUpdate();
//     },
//
//     update: function (dt) {
//         this._countdown -= dt;
//         let pos = this.getPosition();
//         pos.y = pos.y - dt * this._s / this._t;
//         this.setPosition(pos);
//
//         if (this._countdown <= 0) {
//             this.unscheduleUpdate();
//             this._explosionEffect();
//         }
//     },
//
//     _explosionEffect: function () {
//         this._iceSpell.setAnimation(0, 'animation_full', false);
//         // EventDispatcher.getInstance().dispatchEvent(EventType.EXPLOSION_FIRE_SPELL, {position: this.pos, damage: this.damage, range: this.range});
//     },
// })
//
// let TestLayer = cc.Layer.extend({
//     ctor: function () {
//         this._super();
//         let backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 255), cc.winSize.width, cc.winSize.height);
//         this.addChild(backgroundLayer);
//         this._handleEventKey();
//     },
//
//     _handleEventKey: function () {
//         cc.eventManager.addListener(cc.EventListener.create({
//             event: cc.EventListener.TOUCH_ALL_AT_ONCE,
//             onTouchesEnded: function (touches, event) {
//                 if (touches.length <= 0)
//                     return;
//
//                 let pixel = touches[0].getLocation();
//                 let spell = new FrozenSpell(this, pixel, 10, 1.2);
//                 cc.log("Clicked")
//                 // let spine = new sp.SkeletonAnimation("textures/potion/effect_atk_ice.json", "textures/potion/effect_atk_ice.atlas")
//                 // spine.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
//                 // spine.setAnimation(0, 'animation_full', false);
//                 // this.addChild(spine);
//             }.bind(this)
//         }), this)
//     },
//
// });