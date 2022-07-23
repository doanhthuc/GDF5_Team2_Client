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
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(CollisionComponent, PositionComponent)

        if (GameConfig.DEBUG) {
            cc.error("Collision entity size = " + entityList.length);
        }

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
                this._handleCollisionBullet(entityList[i]);
            } else if (ValidatorECS.isTrap(entityList[i])) {
                this._handleCollisionTrap(entityList[i], tick);
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
                    if (bulletInfo.type && bulletInfo.type === "frog") {
                        // handle here
                    } else {
                        for (let effect of bulletInfo.effects) {
                            monster.addComponent(effect.clone());
                        }
                        EntityManager.destroy(bullet);
                        // IMPORTANT: 1 bullet can affect only 1 monster
                        break;
                    }
                }
            }
        }
    },

    _handleCollisionTrap: function (trapEntity, dt) {
        if (trapEntity.isTriggered) {
            if (trapEntity.isTriggered > 0) {
                trapEntity.isTriggered -= dt;
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

                let monsterList = [];
                for (let j = 0; j < returnObjects.length; j++) {
                    let entity1 = trapEntity, entity2 = returnObjects[j].entity;
                    if (entity1 !== entity2 && entity1.mode === entity2.mode && ValidatorECS.isMonster(entity2) && this._isCollide(entity1, entity2)) {
                        monsterList.push(entity2);
                    }
                }

                for (let entity of monsterList) {
                    let pos = entity.getComponent(PositionComponent);
                    let pathComponent = entity.getComponent(PathComponent);
                    let appearanceComponent = entity.getComponent(AppearanceComponent);
                    pathComponent.path.unshift({x: pos.x, y: pos.y});
                    pathComponent.currentPathIdx = 0;
                    // let origin = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(entity.mode)[GameConfig.MAP_HEIGH - 1 - 4][0];
                    // entity.removeComponent(VelocityComponent);
                    // entity.removeComponent(PathComponent);
                    entity.removeComponent(PositionComponent);
                    // pos.x = pathComponent.path[0].x;
                    // pos.y = pathComponent.path[0].y;

                    // cc.log("origin position = " + JSON.stringify(origin));
                    let bornPos = Utils.tile2Pixel(GameConfig.MONSTER_BORN_POSITION.x, GameConfig.MONSTER_BORN_POSITION.y, trapEntity.mode);
                    let time = Utils.euclidDistance(pos, bornPos) / (2*GameConfig.TILE_WIDTH);
                    let action = cc.spawn(cc.jumpTo(time, bornPos, 100, 1));
                    entity.trapEffect = {
                        countDown: time
                    }
                    cc.log(time);
                    let tmpEntity = entity;
                    setTimeout(function() {
                        cc.error("Execute");
                        let bornPos = Utils.tile2Pixel(GameConfig.MONSTER_BORN_POSITION.x, GameConfig.MONSTER_BORN_POSITION.y, trapEntity.mode);
                        let newPos = ComponentFactory.create(PositionComponent, bornPos.x, bornPos.y);
                        tmpEntity.addComponent(newPos);
                        tmpEntity.getComponent(PathComponent).currentPathIdx = 1;
                    }, (time+0.5)*1000);

                    appearanceComponent.sprite.runAction(action);
                    delete trapEntity.isTriggered;
                }

                EntityManager.destroy(trapEntity);
            }
        } else {
            if (!trapEntity.countTrigger || trapEntity.countTrigger < 1) {
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
                    if (entity1 !== entity2 && entity1.mode === entity2.mode && this._isCollide(entity1, entity2)) {
                        // The first monster will trigger the trap
                        trapEntity.isTriggered = 0.55;
                        trapEntity.countTrigger = 2;
                        let spriteComponent = trapEntity.getComponent(SpriteSheetAnimationComponent);
                        spriteComponent.changeCurrentState("ATTACK");
                        break;
                    }
                }
            }

        }
    },

    _isCollide: function (entity1, entity2) {
        let pos1 = entity1.getComponent(PositionComponent);
        let pos2 = entity2.getComponent(PositionComponent);
        let collision1 = entity1.getComponent(CollisionComponent);
        let collision2 = entity2.getComponent(CollisionComponent);
        let w1 = collision1.width, h1 = collision1.height;
        let w2 = collision2.width, h2 = collision2.height;


        if ((w1 === 0 && h1 === 0) || (w2 === 0 && h2 === 0)) return false;

        // DEBUG
        // if (this._isMonsterAndBullet(entity1, entity2)
        //     && cc.rectIntersectsRect(cc.rect(pos1.x - w1 / 2, pos1.y - h1 / 2, w1, h1), cc.rect(pos2.x - w2 / 2, pos2.y - h2 / 2, w2, h2))) {
        //     let rect1 = cc.DrawNode.create();
        //     let rect2 = cc.DrawNode.create();
        //     rect1.drawRect(cc.p(pos1.x - (w1 / 2), pos1.y - (h1 / 2)), cc.p(pos1.x + w1/2, pos1.y + h1/2), cc.color(255,255,255,255));
        //     BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(rect1, 100);
        //     rect2.drawRect(cc.p(pos2.x - (w2 / 2), pos2.y - (h2 / 2)), cc.p(pos2.x + w2/2, pos2.y + h2/2), cc.color(255,0,255,255));
        //     BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(rect2, 100);
        // }
        // END DEBUG

        return cc.rectIntersectsRect(cc.rect(pos1.x - w1 / 2, pos1.y - h1 / 2, w1, h1), cc.rect(pos2.x - w2 / 2, pos2.y - h2 / 2, w2, h2));
        // let x1 = pos1.x - w1 / 2, x2 = pos2.x - w2 / 2, y1 = pos1.y - h1 / 2, y2 = pos2.y - h2 / 2;
        // return x1 <= x2 + w2 && x1 + w1 >= x2 && y1 + h1 >= y2 && y2 + h2 >= y1;
    },

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
});
CollisionSystem.typeID = GameConfig.SYSTEM_ID.COLLISION;
SystemManager.getInstance().registerClass(CollisionSystem);