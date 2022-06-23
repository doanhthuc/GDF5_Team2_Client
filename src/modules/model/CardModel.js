const CardModel = cc.Class.extend({
    ctor: function (id, level, accumulated) {
        this.id = id;
        this.name = JsonReader.getTowerConfig()[id].name;
        this.description = 'description';
        this.level = level;
        this.energy = JsonReader.getTowerConfig()[id].energy;
        this.accumulated = accumulated;
        this.stat = {};
        this.setTypeOfCard(this.id);
    },

    logCardInfo: function () {
        cc.log("id: " + this.id + " name: " + this.name + " description: " + this.description + " level: " + this.level + " energy: " + this.energy + " accumulated: " + this.accumulated);
        for (let key in this.stat) {
            cc.log(key + ": " + this.stat[key]);
        }
        cc.log("-----------------------------------------------------");
        cc.log(JSON.stringify(this.stat));
    },

    setTypeOfCard: function (id) {
        let towerConfig = JsonReader.getTowerConfig()[id]
        let archetype = towerConfig.archetype;
        if (archetype === 'attack' || archetype === 'magic') {
            this.stat.damage = towerConfig.stat[this.level].damage;
            this.stat.attackSpeed = towerConfig.stat[this.level].attackSpeed;
            this.stat.range = towerConfig.stat[this.level].range;
            this.stat.bulletType = towerConfig.bulletType;
            if (archetype === 'magic') {
                this.setMagicSkillByName(this.name, this.level)
            }
        } else if (archetype === 'support') {
            this.stat.range = towerConfig.stat[this.level].range;
            if (towerConfig.name === 'damage - goat') {
                this.setBuffStatByName('attackAura - goatAura', this.level);
            } else if (towerConfig.name === 'attackSpeed - snake') {
                this.setBuffStatByName('attackSpeedAura - snakeAura', this.level);
            }
        }
    },

    setBuffStatByName: function (name, level) {
        let towerBuffId = JsonReader.getTowerBuffIdByName(name);
        this.stat.buffName = JsonReader.getTowerBuffConfig()[towerBuffId].effects[this.level][0].name;
        this.stat.buffValue = JsonReader.getTowerBuffConfig()[towerBuffId].effects[this.level][0].value;
    },

    setMagicSkillByName: function (name, level) {
        if (name === 'iceGun - polarBear') {
            // this.stat.frozenTime = JsonReader.getTowerBuffConfig()['iceGun'].effects[level][0].value;
        } else if (name === 'oilGun - bunny') {
            // this.stat.slowPercent = JsonReader.getTowerBuffConfig()['oilGun'].effects[level][0].value;
            // this.affectedTime =
        }
    }
});
