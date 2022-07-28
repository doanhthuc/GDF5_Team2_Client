let TowerConfig = TowerConfig || {};

TowerConfig.getTowerConfigFromJson =  (towerId, level) => {
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
    let cloneConfig = _.clone(targetBuffConfigData);
    cloneConfig.slowDuration = targetBuffConfigData.duration[towerRank];
    cloneConfig.slowValue = targetBuffConfigData.effects[towerRank][0].value;
    return cloneConfig;
}

TowerConfig.getBearIceGunTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let targetBuffConfigData = JsonReader.getTargetBuffConfig()[towerConfig.bulletTargetBuffType]
    let cloneConfig = _.clone(targetBuffConfigData);
    cloneConfig.frozenDuration = targetBuffConfigData.duration[towerRank];
    return cloneConfig;
}

TowerConfig.getDamageGoatTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let towerBuffConfigData = JsonReader.getTowerBuffConfig()[towerConfig.auraTowerBuffType]
    let cloneConfig = _.clone(towerBuffConfigData);
    cloneConfig.damageUpValue = towerBuffConfigData.effects[towerRank][0].value;
    return cloneConfig;
}

TowerConfig.getAttackSpeedSnakeTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let towerBuffConfigData = JsonReader.getTowerBuffConfig()[towerConfig.auraTowerBuffType]
    let cloneConfig = _.clone(towerBuffConfigData);
    cloneConfig.attackSpeedUpValue = towerBuffConfigData.effects[towerRank][0].value;
    return cloneConfig;
}
