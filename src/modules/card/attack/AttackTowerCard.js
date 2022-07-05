const AttackTowerCard = TowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.damage = this.getDamageFromJson();
        this.attackSpeed = this.getAttackSpeedFromJson();
        this.bulletRadius = this.getBulletRadiusFromJson();
        this.bulletType = new BulletType(this.bulletRadius);
    },

    getDamageFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].damage;
    },

    getAttackSpeedFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].attackSpeed;
    },

    getBulletRadiusFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].bulletRadius;
    },

    getCardStat: function () {
        return {
            damage: this.damage,
            attackSpeed: this.attackSpeed,
            range: this.range,
            bulletType: this.bulletType.type,
        }
    },

    upgradeCard: function (level, accumulated) {
        this._super(level, accumulated);
        this.damage = this.getDamageFromJson();
        this.attackSpeed = this.getAttackSpeedFromJson();
        this.bulletRadius = this.getBulletRadiusFromJson();
    }
});