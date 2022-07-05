const FrozenCard = PotionCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.idConfig = 1;
        this.targetBuffType = JsonReader.getPotionConfig()[this.idConfig].adjust.player.value;
        this.towerBuffType = JsonReader.getPotionConfig()[this.idConfig].adjust.enemy.value;
        this.frozenTime = JsonReader.getTargetBuffConfig()[this.targetBuffType].duration[1];
        this.energy = this.getEnergyFromJson();
    },

    getCardStat: function () {
        let stat = this._super();
        stat.frozenTime = this.frozenTime;
        return stat;
    }
});