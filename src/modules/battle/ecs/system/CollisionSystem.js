let mapWidth = GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH;
let mapHeight = GameConfig.MAP_HEIGH * GameConfig.TILE_HEIGH;

let quadTreePlayer = new QuadTree(0, cc.rect(-mapWidth / 2, -mapHeight / 2, mapWidth, mapHeight));
let quadTreeOpponent = new QuadTree(0, cc.rect(-mapWidth / 2, -mapHeight / 2, mapWidth, mapHeight));

let CollisionSystem = System.extend({
        typeID: GameConfig.SYSTEM_ID.COLLISION,
        name: "CollisionSystem",

        ctor: function () {
            this._super();
            cc.log("new " + this.name);
        },

        _run: function (tick) {

        },

        updateData: function () {
            const dt = tickManager.getTickRate() / 1000;
            let entityList = EntityManager.getInstance()
                .getEntitiesHasComponents(CollisionComponent, PositionComponent)

            // construct quad tree
            quadTreePlayer.clear();
            quadTreeOpponent.clear();
            for (let i = 0; i < entityList.length - 1; i++) {
                let pos = entityList[i].getComponent(PositionComponent);
                let collisionComponent = entityList[i].getComponent(CollisionComponent);

                let w = collisionComponent.width, h = collisionComponent.height;

                let rect = cc.rect(pos.x - w / 2, pos.y - h / 2, w, h);

                if (entityList[i].mode === GameConfig.PLAYER) {
                    quadTreePlayer.insert(new QuadTreeData(rect, entityList[i]));
                } else {
                    quadTreeOpponent.insert(new QuadTreeData(rect, entityList[i]));
                }
            }

            for (let i = 0; i < entityList.length; i++) {
                if (ValidatorECS.isBullet(entityList[i])) {
                    let bulletInfoComponent = entityList[i].getComponent(BulletInfoComponent);

                    if (bulletInfoComponent.radius) {
                        this._handleRadiusBullet(entityList[i]);
                    } else {
                        this._handleCollisionBullet(entityList[i]);
                    }

                } else if (ValidatorECS.isTrap(entityList[i])) {
                    this._handleCollisionTrap(entityList[i], dt);
                }
            }
        },

        _handleCollisionBullet: function (bulletEntity) {
            let pos = bulletEntity.getComponent(PositionComponent);
            let collisionComponent = bulletEntity.getComponent(CollisionComponent);

            let w = collisionComponent.width, h = collisionComponent.height;

            let returnObjects = null;
            if (bulletEntity.mode === GameConfig.PLAYER) {
                returnObjects = quadTreePlayer.retrieve(cc.rect(pos.x - w / 2, pos.y - h / 2, w, h));
            } else {
                returnObjects = quadTreeOpponent.retrieve(cc.rect(pos.x - w / 2, pos.y - h / 2, w, h));
            }

            for (let j = 0; j < returnObjects.length; j++) {
                let entity1 = bulletEntity, entity2 = returnObjects[j].entity;
                if (entity1 !== entity2 && entity1.mode === entity2.mode && this._isCollide(entity1, entity2)) {
                    let data = this._isMonsterAndBullet(entity1, entity2)
                    if (data) {
                        let monster = data.monster, bullet = data.bullet;
                        let bulletInfo = bullet.getComponent(BulletInfoComponent);
                        let underGroundComponent = monster.getComponent(UnderGroundComponent);

                        // The bullet can't reach the under ground monsters
                        if (underGroundComponent && underGroundComponent.isInGround) {
                            continue;
                        }

                        //Handle Frog Bullet
                        if (bulletInfo.type && bulletInfo.type === "frog") {
                            let pathComponent = bullet.getComponent(PathComponent)

                            //check the the bullet is in first path
                            if (pathComponent.currentPathIdx <= pathComponent.path.length / 2) {
                                if (bulletInfo.hitMonster.has(monster.id) === false) {
                                    for (let effect of bulletInfo.effects) {
                                        monster.addComponent(effect.clone());
                                        bulletInfo.hitMonster.set(monster.id, GameConfig.FROG_BULLET.HIT_FIRST_TIME);
                                    }
                                }
                            } else { //check the second path
                                // check if this monster was not hit in First Path
                                if (bulletInfo.hitMonster.has(monster.id) === false) {
                                    for (let effect of bulletInfo.effects) {
                                        monster.addComponent(effect.clone());
                                        bulletInfo.hitMonster.set(monster.id, GameConfig.FROG_BULLET.HIT_SECOND_TIME);
                                    }
                                    // else if this monster is hit in First Path
                                } else if (bulletInfo.hitMonster.get(monster.id) === GameConfig.FROG_BULLET.HIT_FIRST_TIME) {
                                    for (let effect of bulletInfo.effects) {
                                        if (effect.typeID === GameConfig.COMPONENT_ID.DAMAGE_EFFECT) {
                                            let newDamageEffect = effect.clone();

                                            for (let effect of bulletInfo.effects) {
                                                if (effect.typeID === FrogBulletSkillComponent.typeID) {
                                                    newDamageEffect.damage = newDamageEffect.damage * 1.5;
                                                }
                                            }
                                            monster.addComponent(newDamageEffect);
                                            bulletInfo.hitMonster.set(monster.id, GameConfig.FROG_BULLET.HIT_BOTH_TIME);
                                        }
                                    }
                                }
                            }

                        } else {
                            // IMPORTANT: 1 bullet can affect only 1 monster
                            for (let effect of bulletInfo.effects) {
                                monster.addComponent(effect.clone());
                            }
                            EntityManager.destroy(bullet);
                            break;

                        }
                    }
                }
            }
        },

        _handleRadiusBullet: function (bullet) {
            let bulletPos = bullet.getComponent(PositionComponent);
            let bulletVelocity = bullet.getComponent(VelocityComponent);
            let bulletInfo = bullet.getComponent(BulletInfoComponent);

            if ((Math.abs(bulletVelocity.staticPosition.x - bulletPos.x) <= 10)
                && (Math.abs(bulletVelocity.staticPosition.y - bulletPos.y) <= 10)) {
                //getMonsterInRadius
                let monsterInBulletRadius = [];
                let monsterList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent, PositionComponent);
                for (let monster of monsterList) {
                    if (monster.mode === bullet.mode) {
                        if (Utils.euclidDistance(monster.getComponent(PositionComponent), bulletPos) <= bulletInfo.radius) {
                            monsterInBulletRadius.push(monster);
                        }
                    }
                }
                //Handle Damage of bullet
                for (let effect of bulletInfo.effects) {
                    if (effect.typeID === WizardBulletSkillComponent.typeID) {
                        let amountMonster = effect.amountMonster;
                        if (monsterInBulletRadius.length >= amountMonster) {
                            for (let damageEffect of bulletInfo.effects)
                                if (damageEffect.typeID === DamageEffect.typeID) damageEffect.damage += 10;
                        }
                    }
                }
                for (let monster of monsterInBulletRadius)
                    for (let effect of bulletInfo.effects)
                        monster.addComponent(effect.clone());
                BattleAnimation.addAnimationForBullet(bullet);
                EntityManager.destroy(bullet);
            }

        },

        _handleCollisionTrap: function (trapEntity, dt) {
            let trapInfo = trapEntity.getComponent(TrapInfoComponent);

            if (trapInfo.isTriggered) {
                if (trapInfo.delayTrigger > 0) {
                    trapInfo.delayTrigger -= dt;
                } else {
                    let pos = trapEntity.getComponent(PositionComponent);
                    let collisionComponent = trapEntity.getComponent(CollisionComponent);

                    let w = collisionComponent.width, h = collisionComponent.height;

                    let returnObjects = null;
                    if (trapEntity.mode === GameConfig.PLAYER) {
                        returnObjects = quadTreePlayer.retrieve(cc.rect(pos.x - w / 2, pos.y - h / 2, w, h));
                    } else {
                        returnObjects = quadTreeOpponent.retrieve(cc.rect(pos.x - w / 2, pos.y - h / 2, w, h));
                    }

                    for (let j = 0; j < returnObjects.length; j++) {
                        let entity1 = trapEntity, entity2 = returnObjects[j].entity;
                        if (entity1 !== entity2
                            && entity1.mode === entity2.mode
                            && ValidatorECS.isMonster(entity2)
                            && this._isCollide(entity1, entity2)) {

                            let monsterInfo = entity2.getComponent(MonsterInfoComponent);
                            let underGroundComponent = entity2.getComponent(UnderGroundComponent);

                            // trap doesn't affect to Boss and Air monster, under ground monster
                            if (monsterInfo.classs === GameConfig.MONSTER.CLASS.AIR) continue;
                            if (monsterInfo.category === GameConfig.MONSTER.CATEGORY.BOSS) continue;
                            if (underGroundComponent && underGroundComponent.isInGround) continue;

                            entity2.addComponent(ComponentFactory.create(TrapEffect));
                        }
                    }

                    EntityManager.destroy(trapEntity);
                }
            } else {
                let pos = trapEntity.getComponent(PositionComponent);
                let collisionComponent = trapEntity.getComponent(CollisionComponent);

                let w = collisionComponent.width, h = collisionComponent.height;

                let returnObjects = null;
                if (trapEntity.mode === GameConfig.PLAYER) {
                    returnObjects = quadTreePlayer.retrieve(cc.rect(pos.x - w / 2, pos.y - h / 2, w, h));
                } else {
                    returnObjects = quadTreeOpponent.retrieve(cc.rect(pos.x - w / 2, pos.y - h / 2, w, h));
                }

                for (let j = 0; j < returnObjects.length; j++) {
                    let entity1 = trapEntity, entity2 = returnObjects[j].entity;
                    if (entity1 !== entity2
                        && entity1.mode === entity2.mode
                        && ValidatorECS.isMonster(entity2)
                        && this._isCollide(entity1, entity2)) {

                        // trap only trigger when monster traverse (except air class monster, under ground monster)
                        let monsterInfo = entity2.getComponent(MonsterInfoComponent);
                        let underGroundComponent = entity2.getComponent(UnderGroundComponent);

                        if (monsterInfo.classs === GameConfig.MONSTER.CLASS.AIR) continue;
                        if (underGroundComponent && underGroundComponent.isInGround) continue;

                        trapInfo.setTrigger(true);
                        let spriteComponent = trapEntity.getComponent(SpriteSheetAnimationComponent);
                        spriteComponent.changeCurrentState("ATTACK");

                        // only the first monster triggers this trap
                        break;
                    }
                }
            }
        }

        ,

        _isCollide: function (entity1, entity2) {
            let pos1 = entity1.getComponent(PositionComponent);
            let pos2 = entity2.getComponent(PositionComponent);
            let collision1 = entity1.getComponent(CollisionComponent);
            let collision2 = entity2.getComponent(CollisionComponent);
            let w1 = collision1.width, h1 = collision1.height;
            let w2 = collision2.width, h2 = collision2.height;


            if ((w1 === 0 && h1 === 0) || (w2 === 0 && h2 === 0)) return false;

            //DEBUG
            // if (this._isMonsterAndBullet(entity1, entity2)
            //     && cc.rectIntersectsRect(cc.rect(pos1.x - w1 / 2, pos1.y - h1 / 2, w1, h1), cc.rect(pos2.x - w2 / 2, pos2.y - h2 / 2, w2, h2))) {
            //     let rect1 = cc.DrawNode.create();
            //     let rect2 = cc.DrawNode.create();
            //     rect1.drawRect(cc.p(pos1.x - (w1 / 2), pos1.y - (h1 / 2)), cc.p(pos1.x + w1/2, pos1.y + h1/2), cc.color(255,255,255,255));
            //     BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(rect1, 100);
            //     rect2.drawRect(cc.p(pos2.x - (w2 / 2), pos2.y - (h2 / 2)), cc.p(pos2.x + w2/2, pos2.y + h2/2), cc.color(255,0,255,255));
            //     BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(rect2, 100);
            // }
            //END DEBUG

            return cc.rectIntersectsRect(cc.rect(pos1.x - w1 / 2, pos1.y - h1 / 2, w1, h1), cc.rect(pos2.x - w2 / 2, pos2.y - h2 / 2, w2, h2));
            // let x1 = pos1.x - w1 / 2, x2 = pos2.x - w2 / 2, y1 = pos1.y - h1 / 2, y2 = pos2.y - h2 / 2;
            // return x1 <= x2 + w2 && x1 + w1 >= x2 && y1 + h1 >= y2 && y2 + h2 >= y1;
        }
        ,

        _isMonsterAndBullet: function (entity1, entity2) {
            // TODO: check entity2 is monster, not only sword man
            if ((ValidatorECS.isBullet(entity1) && ValidatorECS.isMonster(entity2))
                || (ValidatorECS.isBullet(entity2) && ValidatorECS.isMonster(entity1))) {
                let bullet = ValidatorECS.isBullet(entity1) ? entity1 : entity2;
                let monster = ValidatorECS.isMonster(entity1) ? entity1 : entity2;
                return {bullet, monster}
            }
            return null
        }
    })
;
CollisionSystem.typeID = GameConfig.SYSTEM_ID.COLLISION;
SystemManager.getInstance().registerClass(CollisionSystem);