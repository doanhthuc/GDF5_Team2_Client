const AttackTowerCard = TowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.damage = this.getDamageFromJson(level);
        this.attackSpeed = this.getAttackSpeedFromJson(level);
        this.bulletRadius = this.getBulletRadiusFromJson(level);
        this.bulletType = new BulletType(this.bulletRadius);
    },

    getDamageFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTowerConfig()[this.id].stat[rank].damage;
    },

    getAttackSpeedFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTowerConfig()[this.id].stat[rank].attackSpeed;
    },

    getBulletRadiusFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTowerConfig()[this.id].stat[rank].bulletRadius;
    },

    getCardStat: function () {
        return {
            damage: this.damage,
            attackSpeed: this.attackSpeed,
            range: this.range,
            bulletType: this.bulletType.type,
        }
    },

    getCardStatByLevel: function (level) {
        let damage = this.getDamageFromJson(level);
        let attackSpeed = this.getAttackSpeedFromJson(level);
        let range = this.getRangeFromJson(level);
        return {
            damage: this.calculateCardStatByLevel(damage, level),
            attackSpeed: (this.calculateCardStatByLevel(attackSpeed, level) / 1000).toFixed(2),
            range: this.calculateCardStatByLevel(range, level),
            bulletType: this.bulletType.type,
        }
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.damage = this.getDamageFromJson(level);
        this.attackSpeed = this.getAttackSpeedFromJson(level);
        this.bulletRadius = this.getBulletRadiusFromJson(level);
    }
});