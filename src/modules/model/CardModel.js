const CardModel = cc.Class.extend({
    ctor: function (id, level, accumulated) {
        this.id = id;
        this.name = JsonReader.getTowerConfig()[id].name;
        this.description = 'description';
        this.level = level;
        this.energy = JsonReader.getTowerConfig()[id].energy;
        this.accumulated = accumulated;
        this.stat = {};

        this.setCardRankByLevel(this.level);
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

    setCardRankByLevel: function (level) {
        if (level <= 1) {
            this.rank = 1;
        } else if (level <= 2) {
            this.rank = 2;
        } else if (level <= 4) {
            this.rank = 3;
        }
    },

    setTypeOfCard: function (id) {
        let towerConfig = JsonReader.getTowerConfig()[id]
        let archetype = towerConfig.archetype;
        if (archetype === 'attack' || archetype === 'magic') {
            this.stat.damage = towerConfig.stat[this.rank].damage;
            this.stat.attackSpeed = towerConfig.stat[this.rank].attackSpeed;
            this.stat.range = towerConfig.stat[this.rank].range;
            this.stat.bulletType = towerConfig.bulletType;
            if (archetype === 'magic') {
                this.setMagicSkillByName(this.name, this.rank)
            }
        } else if (archetype === 'support') {
            this.stat.range = towerConfig.stat[this.rank].range;
            if (towerConfig.name === 'damage - goat') {
                this.setBuffStatByNameAndRank('attackAura - goatAura', this.rank);
            } else if (towerConfig.name === 'attackSpeed - snake') {
                this.setBuffStatByNameAndRank('attackSpeedAura - snakeAura', this.rank);
            }
        }
    },

    setBuffStatByNameAndRank: function (name, rank) {
        let towerBuffId = JsonReader.getTowerBuffIdByName(name);
        this.stat.buffName = JsonReader.getTowerBuffConfig()[towerBuffId].effects[rank][0].name;
        this.stat.buffValue = JsonReader.getTowerBuffConfig()[towerBuffId].effects[rank][0].value;
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
