let LifeSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.LIFE,
    name: "LifeSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(LifeComponent);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            if (lifeComponent.hp <= 0) {
                let pos = entity.getComponent(PositionComponent);
                let monsterInfo = entity.getComponent(MonsterInfoComponent)
                if (pos && monsterInfo) {
                    BattleAnimation.animationPlusEnergy(pos, monsterInfo.gainEnergy, entity.mode);
                    let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
                    deckEnergyProgress.plusEnergy(monsterInfo.gainEnergy);
                }
                EntityManager.destroy(entity);
            }
        }
    }
});
LifeSystem.typeID = GameConfig.SYSTEM_ID.LIFE;
SystemManager.getInstance().registerClass(LifeSystem);