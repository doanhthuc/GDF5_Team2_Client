const JsonReader = {
    towerConfigData: null,
    getTowerConfig: function () {
        if (this.TowerConfig) {
            return this.towerConfigData;
        }
        cc.loader.loadJson("config/Tower.json",(error, data) => {
            this.towerConfigData = data;
        });
    }
}