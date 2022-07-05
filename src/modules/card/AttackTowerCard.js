const AttackTowerCard = TowerCard.extend({
    ctor: function (id, level, accumulated, energy, bulletRadius, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, isBattleDeck);
        this.skill = null;
        this.damage = this.getDamageFromJson();
        this.attackSpeed = this.getAttackSpeedFromJson();
        this.bulletType = new BulletType(bulletRadius);
    },

    getDamageFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].damage;
    },

    getAttackSpeedFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].attackSpeed;
    },

    getCardStat: function () {
        return {
            damage: this.damage,
            attackSpeed: this.attackSpeed,
            range: this.range,
            bulletType: this.bulletType,
        }
    }
});