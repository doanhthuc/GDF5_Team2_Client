let Utils = Utils || {};

Utils.getVariableName = function (variable) {
    let name = Object.keys({variable})[0];
    return name;
};

Utils.tile2Pixel = function (x, y) {
    // ^ y
    // |
    // |-------->x
    // return center of tile pixel

    // center of map y = 4
    let centerY = (cc.winSize.height - 200) / 2 + 200 - (50 + GameConfig.TILE_HEIGH / 2);
    let startX = (cc.winSize.width - GameConfig.MAP_WIDTH * GameConfig.TILE_WIDTH) / 2 + GameConfig.TILE_WIDTH / 2;

    let yy = centerY - (GameConfig.MAP_HEIGH - 1 - y) * GameConfig.TILE_HEIGH;
    let xx = startX + GameConfig.TILE_WIDTH * x;
    return {x: xx, y: yy};
};

Utils.pixel2Tile = function (xx, yy) {
    let paddingX = (cc.winSize.width - 7 * GameConfig.TILE_WIDTH) / 2;
    let x = Math.floor((xx - paddingX) / GameConfig.TILE_WIDTH);

    let paddingY = (cc.winSize.height - 200) / 2 + 200 - (50 + GameConfig.TILE_HEIGH * GameConfig.MAP_HEIGH);
    let y = Math.floor((yy - paddingY) / GameConfig.TILE_HEIGH);

    return {x, y};
}

Utils.tileArray2PixelArray = function (positionArr) {
    let result = [];
    for (let pos of positionArr) {
        result.push(Utils.tile2Pixel(pos.x, pos.y));
    }
    return result;
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