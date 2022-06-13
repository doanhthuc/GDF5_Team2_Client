let EntityPool = cc.Class.extend({
    pool: {},

    getInvisibleEntity: function (entityId) {
        let invisibleEntity = null;
        if (this.pool[entityId]) {
            for (let i = 0; i < this.pool[entityId].length; i++) {
                if (this.pool[entityId][i].getVisible() === false) {
                    invisibleEntity = this.pool[entityId][i];
                    break;
                }
            }
        }
        return invisibleEntity;
    },

    push: function (entity) {
        let entityId = entity.id;
        if (entityId in this.pool) {
            this.pool[entityId] = entity;
        } else {
            this.pool[entityId] = [entity];
        }
    }
});
