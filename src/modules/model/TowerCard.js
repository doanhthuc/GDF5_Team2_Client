const TowerCard = Card.extend({
    ctor: function (id, name, description, level, energy) {
        this._super(id, name, description, level, energy);
        this.damge = 10;
    },

    logCard: function () {
        // cc.log('TowerCard: id: ' + this.id + ' name' + this.name + ' ' + this.level + ' damage: ' + this.damge);

    }

});