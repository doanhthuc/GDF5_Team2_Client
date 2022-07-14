let Utils = Utils || {};

Utils.getVariableName = function (variable) {
    let name = Object.keys({variable})[0];
    return name;
};

/**
 *  Convert tile map coordination to pixel map node coordination (center of a cell)
 * @param x {Number}
 * @param y {Number}
 * @param mode {GameConfig.PLAYER | GameConfig.OPPONENT}
 * @returns {cc.Point}
 */
Utils.tile2Pixel = function (x, y, mode) {
    Utils.validateMode(mode);

    let xx, yy;
    if (mode === GameConfig.PLAYER) {
        xx = x * GameConfig.TILE_WIDTH - GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH / 2 + GameConfig.TILE_WIDTH / 2;
        yy = y * GameConfig.TILE_HEIGH - GameConfig.MAP_HEIGH * GameConfig.TILE_HEIGH / 2 + GameConfig.TILE_HEIGH / 2;
    } else if (mode === GameConfig.OPPONENT) {
        // x <---------o
        //             |
        //             |
        //             V
        //             y
        xx = GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH / 2 - x * GameConfig.TILE_WIDTH - GameConfig.TILE_WIDTH / 2;
        yy = GameConfig.MAP_HEIGH * GameConfig.TILE_HEIGH / 2 - y * GameConfig.TILE_HEIGH - GameConfig.TILE_HEIGH / 2;
    }
    return cc.p(xx, yy);
};

/**
 * Convert pixel map node coordination to tile coordination
 * @param xx {Number}
 * @param yy {Number}
 * @param mode {GameConfig.PLAYER | GameConfig.OPPONENT}
 * @returns {cc.Point}
 */
Utils.pixel2Tile = function (xx, yy, mode) {
    Utils.validateMode(mode);

    if (mode === GameConfig.PLAYER) {
        xx = xx + GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH / 2;
        yy = yy + GameConfig.MAP_HEIGH * GameConfig.TILE_HEIGH / 2;
    } else if (mode === GameConfig.OPPONENT) {
        xx = GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH / 2 - xx;
        yy = GameConfig.MAP_HEIGH * GameConfig.TILE_HEIGH / 2 - yy;
    }
    let x = Math.floor(xx / GameConfig.TILE_WIDTH);
    let y = Math.floor(yy / GameConfig.TILE_HEIGH);

    return cc.p(x, y);
}

Utils.validateMode = function (mode) {
    if (mode !== GameConfig.PLAYER && mode !== GameConfig.OPPONENT) {
        throw new Error("mode is invalid");
    }
}

Utils.convertWorldSpace2MapNodeSpace = function (worldPos, mode) {
    Utils.validateMode(mode);

    if (mode === GameConfig.PLAYER) {
        return BattleManager.getInstance().getBattleLayer().getPlayerMapNode().convertToNodeSpace(worldPos);
    } else {
        return BattleManager.getInstance().getBattleLayer().getOpponentMapNode().convertToNodeSpace(worldPos);
    }
}

Utils.validateTilePos = function (tilePos) {
    return tilePos.x >= 0 && tilePos.x < GameConfig.MAP_WIDTH && tilePos.y >= 0 && tilePos.y < GameConfig.MAP_HEIGH;
}

Utils.tileArray2PixelArray = function (positionArr, mode) {
    if (mode !== GameConfig.PLAYER && mode !== GameConfig.OPPONENT) {
        throw new Error("Mode is invalid")
    }
    let result = [];
    for (let pos of positionArr) {
        result.push(Utils.tile2Pixel(pos.x, pos.y, mode));
    }
    return result;
}

/**
 *
 * @param pixelPos {cc.Point} position via map node coordination (can use {Utils.convertWorldSpace2MapNodeSpace})
 * @param mode
 * @returns {boolean}
 */
Utils.isPixelPositionInMap = function (pixelPos, mode) {
    Utils.validateMode(mode);

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
    if (mode === GameConfig.PLAYER) {
        return pixelPos.x >= tile00.x && pixelPos.x <= tile64.x && pixelPos.y >= tile00.y && pixelPos.y <= tile64.y;
    } else if (mode === GameConfig.OPPONENT) {
        return pixelPos.x <= tile00.x && pixelPos.x >= tile64.x && pixelPos.y <= tile00.y && pixelPos.y >= tile64.y;
    }
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

/**
 * Convert cell coordination to pixel map node coordination (anchor 0.5, 0.5)
 * @param cellX
 * @param cellY
 * @param mode
 * @returns {cc.Point}
 */
const cellsEachTile = 11;
const cellWidth = GameConfig.TILE_WIDTH / cellsEachTile;
const cellHeight = GameConfig.TILE_HEIGH / cellsEachTile;
const cellsX = GameConfig.MAP_WIDTH * cellsEachTile;
const cellsY = GameConfig.MAP_HEIGH * cellsEachTile;
const mapWidthPixel = GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH;
const mapHeightPixel = GameConfig.MAP_HEIGH * GameConfig.TILE_HEIGH;

Utils.cell2Pixel = function (cellX, cellY, mode) {
    Utils.validateMode(mode);
    if (cellX < 0 || cellX >= cellsX || cellY < 0 || cellY >= cellsY) {
        throw new Error("Cell position is invalid (cellX = " + cellX + ", cellY = " + cellY + ")");
    }
    let x, y;
    if (mode === GameConfig.PLAYER) {
        x = (cellX+1) * cellWidth - mapWidthPixel / 2 - cellWidth / 2;
        y = (cellY+1) * cellHeight - mapHeightPixel / 2 - cellHeight / 2;
    } else if (mode === GameConfig.OPPONENT) {
        x =  mapWidthPixel / 2 - (cellX+1) * cellWidth + cellWidth / 2;
        y = mapHeightPixel / 2 - (cellY+1) * cellHeight + cellHeight / 2;
    }
    return cc.p(x, y);
}

/**
 * Convert cell coordination to tile coordination (1 tile = 11 cells)
 * @param cellX
 * @param cellY
 * @returns {cc.Point}
 */
Utils.cell2Tile = function (cellX, cellY) {
    if (cellX < 0 || cellX >= cellsX || cellY < 0 || cellY >= cellsY) {
        throw new Error("Cell position is invalid (cellX = " + cellX + ", cellY = " + cellY + ")");
    }
    const tileX = cellX % cellsEachTile;
    const tileY = cellY % cellsEachTile;
    return cc.p(tileX, tileY);
}

/**
 * Convert pixel map node coordination to cell coordination
 * @param x
 * @param y
 * @param mode
 * @returns {cc.Point}
 */
Utils.pixel2Cell = function (x, y, mode) {
    Utils.validateMode(mode);
    const tilePos = Utils.pixel2Tile(x, y, GameConfig.PLAYER);
    if (Utils.validateTilePos(tilePos) === false) {
        throw new Error("Pixel (x = " + x + ", y = " + y + ") is invalid");
    }
    let cellX, cellY;
    const paddingLeftX = Utils.cell2Pixel(0, 0).x - cellWidth/2;
    const paddingBottomY = Utils.cell2Pixel(0, 0).y - cellHeight/2;

    if (mode === GameConfig.PLAYER) {
        cellX = Math.floor((x - paddingLeftX) / cellWidth);
        cellY = Math.floor((y - paddingBottomY) / cellHeight);
    } else if (mode === GameConfig.OPPONENT) {
        cellX = cellsX - 1 - Math.floor((x - paddingLeftX) / cellWidth);
        cellY = cellsY - 1 - Math.floor((y - paddingBottomY) / cellHeight);
    }
    return cc.p(cellX, cellY);
}