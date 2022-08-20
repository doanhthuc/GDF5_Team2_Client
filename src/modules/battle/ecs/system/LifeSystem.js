let LifeSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.LIFE,
    name: "LifeSystem",

    ctor: function () {
        this._super();
    },

    _run: function (dt) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === LifeComponent.typeID;
    },

    updateData: function () {
        for (let entityID in this.getEntityStore()) {
            let entity = this.getEntityStore()[entityID];
            if (!entity._hasComponent(LifeComponent)) continue;
            
            let lifeComponent = entity.getComponent(LifeComponent);

            if (lifeComponent.hp <= 0) {
                let pos = entity.getComponent(PositionComponent);
                let monsterInfo = entity.getComponent(MonsterInfoComponent)

                if (pos && monsterInfo) {
                    BattleAnimation.animationPlusEnergy(pos, monsterInfo.gainEnergy, entity.mode);
                    let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
                    deckEnergyProgress.plusEnergy(monsterInfo.gainEnergy);
                }

                if (entity.mode === GameConfig.USER1()) soundManager.playMonsterDie(entity.typeID);
                EntityManager.destroy(entity);
            }
        }
    }
});
LifeSystem.typeID = GameConfig.SYSTEM_ID.LIFE;
SystemManager.getInstance().registerClass(LifeSystem);