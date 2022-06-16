let Utils = Utils || {};

Utils.getVariableName = function(variable) {
    let name = Object.keys({variable})[0];
    return name;
};

Utils.tile2Pixel = function (x, y) {
    // ^ y
    // |
    // |-------->x
    // return center of tile pixel
    let paddingX = (GameConfig.SCREEN_WIDTH - 7*GameConfig.TILE_WIDTH) / 2;
    let paddingY = 200;
    let xx = x*GameConfig.TILE_WIDTH + paddingX + 0.5*GameConfig.TILE_WIDTH;
    let yy = y*GameConfig.TILE_HEIGH + paddingY + 0.5*GameConfig.TILE_HEIGH;
    return {x: xx, y: yy};
};

Utils.pixel2Tile = function (xx, yy) {
    let paddingX = (GameConfig.SCREEN_WIDTH - 7*GameConfig.TILE_WIDTH) / 2;
    let paddingY = 200;
    let x = (xx - paddingX - 0.5*GameConfig.TILE_WIDTH) / GameConfig.TILE_WIDTH;
    let y = (yy - paddingY - 0.5*GameConfig.TILE_HEIGH) / GameConfig.TILE_HEIGH;
    return {x, y};
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

Utils._incrementId = 0;
Utils.genIncrementId = function () {
    return Utils._incrementId++;
}

Utils.calculateVelocityVector = function (startPos, targetPos, velocity) {
    let Xa = startPos.x, Ya = startPos.y, Xb = targetPos.x, Yb = targetPos.y;
    if (Xa - Xb === 0)
        return {speedX: 0, speedY: Math.sign(Yb-Ya)*velocity};
    if (Ya - Yb === 0)
        return {speedX: Math.sign(Xb-Xa)*velocity, speedY: 0};

    let k = Math.abs((Ya-Yb)/(Xa-Xb));
    let speedX = Math.sqrt((velocity*velocity) / (1+k*k));
    let speedY = k*speedX;
    return {
        speedX: Math.sign(Xb-Xa)*speedX,
        speedY: Math.sign(Yb-Ya)*speedY
    }
}