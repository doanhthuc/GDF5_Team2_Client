let TowerConfig = TowerConfig || {};

TowerConfig.getTowerConfigFromJson = function (towerId, level) {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = JsonReader.getTowerConfig()[towerId];
    let cloneConfig = _.clone(towerConfig);
    cloneConfig.stat = towerConfig.stat[towerRank];
    return cloneConfig;
}

TowerConfig.getBunnyOilGunTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let targetBuffConfigData = JsonReader.getTargetBuffConfig()[towerConfig.bulletTargetBuffType]
    towerConfig.slowDuration = targetBuffConfigData.duration[towerRank];
    towerConfig.slowValue = targetBuffConfigData.effects[towerRank][0].value;
}

TowerConfig.getBearIceGunTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let targetBuffConfigData = JsonReader.getTargetBuffConfig()[towerConfig.bulletTargetBuffType]
    towerConfig.frozenDuration = targetBuffConfigData.duration[towerRank];
}

TowerConfig.getDamageGoatTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let towerBuffConfigData = JsonReader.getTowerBuffConfig()[towerConfig.auraTowerBuffType]
    towerConfig.damageUpValue = towerBuffConfigData.effects[towerRank][0].value;
}

TowerConfig.getAttackSpeedSnakeTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let towerBuffConfigData = JsonReader.getTowerBuffConfig()[towerConfig.auraTowerBuffType]
    towerConfig.attackSpeedUpValue = towerBuffConfigData.effects[towerRank][0].value;
}
