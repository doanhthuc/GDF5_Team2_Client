const JsonReader = {
    towerConfigData: null,
    towerBuffConfigData: null,
    targetBuffConfigData: null,
    potionConfigData: null,
    treasureConfigData: null,
    monsterConfigData: null,

    getTowerConfig: function () {
        if (this.towerConfigData) {
            return this.towerConfigData;
        }
        cc.loader.loadJson("config/Tower.json", (error, data) => {
            this.towerConfigData = data.tower;
        });
        return this.towerConfigData;
    },

    getTowerBuffConfig: function () {
        if (this.towerBuffConfigData) {
            return this.towerBuffConfigData;
        }
        cc.loader.loadJson("config/TowerBuff.json", (error, data) => {
                this.towerBuffConfigData = data.towerBuff;
            }
        );
        return this.towerBuffConfigData;
    },

    getTowerBuffIdByName: function (name) {
        let towerBuffConfig = this.getTowerBuffConfig();
        for (let key in towerBuffConfig) {
            if (towerBuffConfig[key].name === name) {
                return key;
            }
        }
        return null;
    },

    getCardUpgradeConfig: function () {
        if (this.cardUpgradeConfigData) {
            return this.cardUpgradeConfigData;
        }
        cc.loader.loadJson("config/Card.json", (error, data) => {
            this.cardUpgradeConfigData = data.card;
        });
        return this.cardUpgradeConfigData;
    },

    getTargetBuffConfig: function () {
        if (this.targetBuffConfigData) {
            return this.targetBuffConfigData;
        }
        cc.loader.loadJson("config/TargetBuff.json", (error, data) => {
                this.targetBuffConfigData = data.targetBuff;
            }
        );
        return this.targetBuffConfigData;
    },

    getPotionConfig: function () {
        if (this.potionConfigData) {
            return this.potionConfigData;
        }
        cc.loader.loadJson("config/Potion.json", (error, data) => {
            this.potionConfigData = data.potion;
        });
        return this.potionConfigData;
    },

    getTreasureConfig: function () {
        if (this.treasureConfigData) {
            return this.treasureConfigData;
        }
        cc.loader.loadJson("config/Treasure.json", (error, data) => {
            this.treasureConfigData = data;
        });
        return this.treasureConfigData;
    },

    getMonsterConfig: function () {
        if (this.monsterConfigData) {
            return this.monsterConfigData;
        }
        cc.loader.loadJson("config/Monster.json", (error, data) => {
            this.monsterConfigData = data.monster;
        } );
        return this.monsterConfigData;
    }
}