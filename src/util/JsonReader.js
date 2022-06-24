const JsonReader = {
    towerConfigData: null,
    towerBuffConfigData: null,

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
    }
}