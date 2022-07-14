const BulletType = cc.Class.extend({
    ctor: function (bulletRadius) {
        if (bulletRadius > 0) {
            this.type = 'area';
        } else {
            this.type = 'single';
        }
    }
});