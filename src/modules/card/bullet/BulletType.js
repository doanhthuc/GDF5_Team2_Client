const BulletType = cc.Class.extend({
    ctor: function(bulletRadius) {
        if (bulletRadius > 0) {
            this.bulletRadius = 'area';
        } else {
            this.bulletRadius = 'single';
        }
    }
});