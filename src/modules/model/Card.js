const Card = cc.Class.extend({
    ctor: function(id, level, accumulated) {
        this.id = id;
        this.name = JsonReader.getTowerConfig().tower[id].name;
        this.description = 'description';
        this.level = level;
        this.energy = JsonReader.getTowerConfig().tower[id].energy;
        this.accumulated = accumulated;
    }
});
