let EntityPool = cc.Class.extend({
    pool: {},

    getInActiveEntity: function (entityTypeID) {
        let invisibleEntity = null;
        if (this.pool[entityTypeID]) {
            for (let i = 0; i < this.pool[entityTypeID].length; i++) {
                if (this.pool[entityTypeID][i].getActive() === false) {
                    invisibleEntity = this.pool[entityTypeID][i];
                    invisibleEntity.setActive(true);
                    break;
                }
            }
        }
        return invisibleEntity;
    },

    push: function (entity) {
        if (entity.typeID in this.pool) {
            this.pool[entity.typeID].push(entity);
        } else {
            this.pool[entity.typeID] = [entity];
        }
    }
});
