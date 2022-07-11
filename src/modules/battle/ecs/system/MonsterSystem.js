let MonsterSystem = System.extend({
    id: GameConfig.SYSTEM_ID.MONSTER,
    name: "MonsterSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let monsterList = EntityManager.getInstance()
            .getEntitiesHasComponents(MonsterInfoComponent);

        for (let monster of monsterList) {
            let monsterPos = monster.getComponent(PositionComponent);
            let posTile = Utils.pixel2Tile(monsterPos.x, monsterPos.y, monster.mode);
            if (posTile.x === GameConfig.HOUSE_POSITION.x && posTile.y === GameConfig.HOUSE_POSITION.y) {
                let monsterInfo = monster.getComponent(MonsterInfoComponent);
                BattleUILayer.minusHouseEnergy(monsterInfo.damageEnergy, monster.mode);
                EntityManager.destroy(monster);
            }
        }
    }
})