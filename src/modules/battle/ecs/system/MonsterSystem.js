let MonsterSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.MONSTER,
    name: "MonsterSystem",

    ctor: function () {
        this._super();
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === MonsterInfoComponent.typeID;
    },

    updateData: function () {
        for (let entityID in this.getEntityStore()) {
            let monster = this.getEntityStore()[entityID];
            if (!monster._hasComponent(PositionComponent)) continue;
            let monsterPos = monster.getComponent(PositionComponent);

            let posTile = Utils.pixel2Tile(monsterPos.x, monsterPos.y, monster.mode);

            if (posTile.x === GameConfig.HOUSE_POSITION.x && posTile.y === GameConfig.HOUSE_POSITION.y) {
                let monsterInfo = monster.getComponent(MonsterInfoComponent);

                BattleUILayer.minusHouseEnergy(monsterInfo.damageEnergy, monster.mode);
                BattleAnimation.animationHouse(monster.mode);
                BattleAnimation.animationPlusEnergy(monsterPos, monsterInfo.damageEnergy, monster.mode);

                if (monster.mode === GameConfig.USER1()) {
                    let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
                    deckEnergyProgress.plusEnergy(monsterInfo.damageEnergy * 10);
                    soundManager.playMainTowerHit();
                }

                EntityManager.destroy(monster);
            }
        }
    }
});
MonsterSystem.typeID = GameConfig.SYSTEM_ID.MONSTER;
SystemManager.getInstance().registerClass(MonsterSystem);