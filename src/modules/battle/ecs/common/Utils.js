let Utils = Utils || {};

Utils.getVariableName = function (variable) {
    let name = Object.keys({variable})[0];
    return name;
};

// FIXME: hard code
const CARD_DECK_HEIGHT = BattleResource.DECK_CARD_HEIGHT;
const RIVER_HEIGHT = BattleResource.RIVER_HEIGHT;

Utils.tile2Pixel = function (x, y, mode) {
    // convert tile to pixel in node space
    // return center of tile pixel

    if (mode === GameConfig.PLAYER) {
        let mapNode = GameConfig.gameLayer.mapLayer.playerMapNode;
        let xx = x*GameConfig.TILE_WIDTH - GameConfig.MAP_WIDTH*GameConfig.TILE_WIDTH/2;
        let yy = y*GameConfig.TILE_HEIGH - GameConfig.MAP_HEIGH*GameConfig.TILE_HEIGH/2;
        let worldPos = GameConfig.gameLayer.mapLayer.convertToNodeSpace(mapNode.convertToWorldSpace(cc.p(xx, yy)));
        return worldPos;
    } else if (mode === GameConfig.OPPONENT) {
        // x <---------o
        //             |
        //             |
        //             V
        //             y
        let mapNode = GameConfig.gameLayer.mapLayer.opponentMapNode;
        let xx = GameConfig.MAP_WIDTH*GameConfig.TILE_WIDTH/2 - x*GameConfig.TILE_WIDTH;
        let yy = GameConfig.MAP_HEIGH*GameConfig.TILE_HEIGH/2 - y*GameConfig.TILE_HEIGH;
        let worldPos = GameConfig.gameLayer.mapLayer.convertToNodeSpace(mapNode.convertToWorldSpace(cc.p(xx, yy)));
        return worldPos;
    }
};

Utils.validateTilePos = function (tilePos) {
    return tilePos.x >= 0 && tilePos.x < GameConfig.MAP_WIDTH && tilePos.y >= 0 && tilePos.y < GameConfig.MAP_HEIGH;
}

Utils.pixel2Tile = function (xx, yy, mode) {
    // xx, yy is world space (layer or scene space), not map node space
    if (!mode) {
        mode = GameConfig.PLAYER;
    }

    if (mode === GameConfig.PLAYER) {
        let mapNode = GameConfig.gameLayer.mapLayer.playerMapNode;
        let pos = mapNode.convertToNodeSpace(cc.p(xx, yy));
        xx = pos.x + GameConfig.MAP_WIDTH*GameConfig.TILE_WIDTH/2;
        yy = pos.y + GameConfig.MAP_HEIGH*GameConfig.TILE_HEIGH/2;

        let x = Math.floor(xx / GameConfig.TILE_WIDTH);
        let y = Math.floor(yy / GameConfig.TILE_HEIGH);

        return {x, y};
    } else if (mode === GameConfig.OPPONENT) {
        let mapNode = GameConfig.gameLayer.mapLayer.opponentMapNode;
        let pos = mapNode.convertToNodeSpace(cc.p(xx, yy));
        xx = GameConfig.MAP_WIDTH*GameConfig.TILE_WIDTH/2 - pos.x;
        yy = GameConfig.MAP_HEIGH*GameConfig.TILE_HEIGH/2 - pos.y;

        let x = Math.floor(xx / GameConfig.TILE_WIDTH);
        let y = Math.floor(yy / GameConfig.TILE_HEIGH);

        return {x, y};
    }
}

Utils.tileArray2PixelArray = function (positionArr, mode) {
    let result = [];
    for (let pos of positionArr) {
        result.push(Utils.tile2Pixel(pos.x, pos.y, mode));
    }
    return result;
}

Utils.isPixelPositionInMap = function (pixelPos, mode) {
    let tile00 = Utils.tile2Pixel(0, 0, mode);
    let tile64 = Utils.tile2Pixel(6, 4, mode);
    if (mode === GameConfig.PLAYER) {
        tile00.x = tile00.x - GameConfig.TILE_WIDTH / 2;
        tile00.y = tile00.y - GameConfig.TILE_HEIGH / 2;
        tile64.x = tile64.x + GameConfig.TILE_WIDTH / 2;
        tile64.y = tile64.y + GameConfig.TILE_HEIGH / 2;
    } else {
        tile00.x = tile00.x + GameConfig.TILE_WIDTH / 2;
        tile00.y = tile00.y + GameConfig.TILE_HEIGH / 2;
        tile64.x = tile64.x - GameConfig.TILE_WIDTH / 2;
        tile64.y = tile64.y - GameConfig.TILE_HEIGH / 2;
    }

    return pixelPos.x >= tile00.x && pixelPos.x <= tile64.x && pixelPos.y >= tile00.y && pixelPos.y <= tile64.y;
}
Utils.getDirectionOf2Tile = function (currentPos, nextPost) {
    let direction1 = 0;
    let direction2 = 0;
    if (currentPos.x !== nextPost.x) {
        direction1 = (nextPost.x - currentPos.x) / Math.abs(nextPost.x - currentPos.x);
    }

    if (currentPos.y !== nextPost.y) {
        direction2 = (currentPos.y - nextPost.y) / Math.abs(nextPost.y - currentPos.y) * 2;
    }

    return direction1 + direction2;
};

Utils.UUID = (function () {
    let _instanceID = 0;
    let _componentTypeID = 0;

    return {
        genComponentTypeID: function () {
            return ++_componentTypeID;
        },

        genInstanceID: function () {
            return ++_instanceID;
        }
    }
})();

Utils.calculateVelocityVector = function (startPos, targetPos, speed) {
    let Xa = startPos.x, Ya = startPos.y, Xb = targetPos.x, Yb = targetPos.y;
    if (Xa - Xb === 0)
        return {speedX: 0, speedY: Math.sign(Yb - Ya) * speed};
    if (Ya - Yb === 0)
        return {speedX: Math.sign(Xb - Xa) * speed, speedY: 0};

    let k = Math.abs((Ya - Yb) / (Xa - Xb));
    let speedX = Math.sqrt((speed * speed) / (1 + k * k));
    let speedY = k * speedX;
    return {
        speedX: Math.sign(Xb - Xa) * speedX,
        speedY: Math.sign(Yb - Ya) * speedY
    }
}

Utils.euclidDistance = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

Utils.isMonster = function (entity) {
    for (let id of GameConfig.GROUP_ID.MONSTER_ENTITY) {
        if (id === entity.typeID) {
            return true;
        }
    }
    return false;
}

Utils.isTower = function (entity) {
    for (let id of GameConfig.GROUP_ID.TOWER_ENTITY) {
        if (id === entity.typeID) {
            return true;
        }
    }
    return false;
}

Utils.isBullet = function (entity) {
    for (let id of GameConfig.GROUP_ID.BULLET_ENTITY) {
        if (id === entity.typeID) {
            return true;
        }
    }
    return false;
}

Utils.radian2Degree = function (radian) {
    return radian * 180 / Math.PI;
}

Utils.calcSlopeOfLine = function (pointA, pointB) {
    let Xa = pointA.x, Ya = pointA.y;
    let Xb = pointB.x, Yb = pointB.y;
    let k = (Yb - Ya) / (Xb - Xa);

    let alpha = 0;

    if (k < 0) {
        alpha = Math.PI - Math.atan(-k);
    } else {
        alpha = Math.atan(k);
    }

    alpha = Utils.radian2Degree(alpha);
    if (Ya > Yb) {
        alpha = alpha + 180;
    }
    if (alpha === 0 && Xa > Xb) {
        alpha = alpha + 180;
    }

    return alpha;
}