const CardModel = cc.Class.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this.id = id;
        this.name = '';
        this.description = 'description';
        this.level = level;
        this.accumulated = accumulated;
        this.isBattleDeck = isBattleDeck;
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
        } else if (level > 1 && level <= 3) {
            this.rank = 2;
        } else if (level >= 4) {
            this.rank = 3;
        }
    },

    setTypeOfCard: function (id) {
        let isSpell = isSpellCard(id);
        if (isSpell === true) {
            switch (id) {
                case 7:
                    this.name = JsonReader.getPotionConfig()[0].name;
                    this.energy = JsonReader.getPotionConfig()[0].energy;
                    this.map = JsonReader.getPotionConfig()[0].map;
                    this.stat.radius = JsonReader.getPotionConfig()[0].radius;
                    this.stat.damage = JsonReader.getPotionConfig()[0].adjust.player.value;
                    break;
                case 8:
                    this.name = JsonReader.getPotionConfig()[1].name;
                    this.energy = JsonReader.getPotionConfig()[1].energy;
                    this.stat.frozenTime = JsonReader.getTargetBuffConfig()[
                        JsonReader.getPotionConfig()[1].adjust.player.value].duration['1'];
                    break;
                case 9:
                    this.name = CARD_TYPE.SPELL[9].name;
                    this.energy = CARD_TYPE.SPELL[9].energy;
                    break;
            }
            return;
        }
        let towerConfig = JsonReader.getTowerConfig()[id]
        this.name = JsonReader.getTowerConfig()[id].name;
        this.energy = JsonReader.getTowerConfig()[id].energy;
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
                let towerBuffId = towerConfig.auraTowerBuffType;
                // this.setBuffStatByNameAndRank('attackAura - goatAura', this.rank);
                this.stat.damageUp = JsonReader.getTowerBuffConfig()[towerBuffId].effects[this.rank][0].value;
            } else if (towerConfig.name === 'attackSpeed - snake') {
                // this.setBuffStatByNameAndRank('attackSpeedAura - snakeAura', this.rank);
                let towerBuffId = towerConfig.auraTowerBuffType;
                // this.setBuffStatByNameAndRank('attackAura - goatAura', this.rank);
                this.stat.attackSpeedUp = JsonReader.getTowerBuffConfig()[towerBuffId].effects[this.rank][0].value;
            }
        }
    },

    // setBuffStatByNameAndRank: function (name, rank) {
    //     let towerBuffId = JsonReader.getTowerBuffIdByName(name);
    //     this.stat.buffName = JsonReader.getTowerBuffConfig()[towerBuffId].effects[rank][0].name;
    //     this.stat.buffValue = JsonReader.getTowerBuffConfig()[towerBuffId].effects[rank][0].value;
    // },

    setMagicSkillByName: function (name, rank) {
        if (name === 'iceGun - polarBear') {
            this.stat.frozenTime = JsonReader.getTargetBuffConfig()['1'].duration[rank];
        } else if (name === 'oilGun - bunny') {
            this.stat.slowPercent = JsonReader.getTargetBuffConfig()['0'].effects[rank][0].value;
            // this.affectedTime =
        }
    },

    upgradeCardModel: function (level, accumulated) {
        this.level = level;
        this.accumulated = accumulated;
        this.setCardRankByLevel(this.level);
        this.setTypeOfCard(this.id);
    },

    updateCardModelAccumulated: function (accumulated) {
        this.accumulated += accumulated;
    }
});
