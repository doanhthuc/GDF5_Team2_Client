let TowerConfig = TowerConfig || {};

TowerConfig.getTowerConfigFromJson = (towerId, level) => {
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = JsonReader.getTowerConfig()[towerId];
    let cloneConfig = _.clone(towerConfig);
    cloneConfig.stat = towerConfig.stat[towerRank];
    return cloneConfig;
}

TowerConfig.getBunnyOilGunTowerConfigFromJson = (level) => {
    let towerId = GameConfig.ENTITY_ID.BUNNY_TOWER;
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let targetBuffConfigData = JsonReader.getTargetBuffConfig()[towerConfig.bulletTargetBuffType]
    let cloneConfig = _.clone(towerConfig);
    cloneConfig.slowDuration = targetBuffConfigData.duration[towerRank];
    cloneConfig.slowValue = targetBuffConfigData.effects[towerRank][0].value;
    return cloneConfig;
}

TowerConfig.getBearIceGunTowerConfigFromJson = (level) => {
    let towerId = GameConfig.ENTITY_ID.BEAR_TOWER;
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let targetBuffConfigData = JsonReader.getTargetBuffConfig()[towerConfig.bulletTargetBuffType]
    // let cloneConfig = _.clone(towerConfig);
    towerConfig.frozenDuration = targetBuffConfigData.duration[towerRank];
    return towerConfig;
}

TowerConfig.getDamageGoatTowerConfigFromJson = (level) => {
    let towerId = GameConfig.ENTITY_ID.GOAT_TOWER;
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let towerBuffConfigData = JsonReader.getTowerBuffConfig()[towerConfig.auraTowerBuffType]
    towerConfig.damageUpValue = towerBuffConfigData.effects[towerRank][0].value;
    return towerConfig;
}

TowerConfig.getAttackSpeedSnakeTowerConfigFromJson = (level) => {
    let towerId = GameConfig.ENTITY_ID.SNAKE_TOWER;
    let towerRank = ReadConfigUtils.getTowerRankByLevel(level);
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, level);
    let towerBuffConfigData = JsonReader.getTowerBuffConfig()[towerConfig.auraTowerBuffType]
    towerConfig.attackSpeedUpValue = towerBuffConfigData.effects[towerRank][0].value;
    return towerConfig;
}
