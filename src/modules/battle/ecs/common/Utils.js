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
 * @returns {{x: number, y: number}|{x: *, y: *}|{x: *, y: *}}
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

Utils.playerPixel2OpponentPixel = function (x, y) {
    return cc.p(-x, -y);
}

/**
 * Convert pixel map node coordination to tile coordination
 * @param xx {Number}
 * @param yy {Number}
 * @param mode {GameConfig.PLAYER | GameConfig.OPPONENT}
 * @returns {{x: number, y: number}|{x: *, y: *}|{x: *, y: *}}
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

/**
 *
 * @param worldPos {pixel}
 * @param mode {GameConfig.PLAYER | GameConfig.OPPONENT}
 * @returns {vec2_object|cc.Point|*}
 */
Utils.convertWorldSpace2MapNodeSpace = function (worldPos, mode) {
    Utils.validateMode(mode);

    if (mode === GameConfig.PLAYER) {
        return BattleManager.getInstance().getBattleLayer().getPlayerMapNode().convertToNodeSpace(worldPos);
    } else {
        return BattleManager.getInstance().getBattleLayer().getOpponentMapNode().convertToNodeSpace(worldPos);
    }
}

Utils.convertMapNodeSpace2WorldSpace = function (pixelPos, mode) {
    Utils.validateMode(mode);

    if (mode === GameConfig.PLAYER) {
        return BattleManager.getInstance().getBattleLayer().getPlayerMapNode().convertToWorldSpace(pixelPos);
    } else {
        return BattleManager.getInstance().getBattleLayer().getOpponentMapNode().convertToWorldSpace(pixelPos);
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
        direction2 = (nextPost.y - currentPos.y) / Math.abs(nextPost.y - currentPos.y) * 3;
    }

    return direction1 + direction2;
};

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
        x = (cellX + 1) * cellWidth - mapWidthPixel / 2 - cellWidth / 2;
        y = (cellY + 1) * cellHeight - mapHeightPixel / 2 - cellHeight / 2;
    } else if (mode === GameConfig.OPPONENT) {
        x = mapWidthPixel / 2 - (cellX + 1) * cellWidth + cellWidth / 2;
        y = mapHeightPixel / 2 - (cellY + 1) * cellHeight + cellHeight / 2;
    }
    return cc.p(x, y);
}

/**
 * Convert cell coordination to tile coordination (1 tile = 11 cells)
 * @param cellX
 * @param cellY
 * @returns {{x: number, y: number}|{x: *, y: *}|{x: *, y: *}} tile position
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
 * @returns {{x: number, y: number}|{x: *, y: *}|{x: *, y: *}}
 */
Utils.pixel2Cell = function (x, y, mode) {
    Utils.validateMode(mode);
    const tilePos = Utils.pixel2Tile(x, y, GameConfig.PLAYER);
    if (Utils.validateTilePos(tilePos) === false) {
        throw new Error("Pixel (x = " + x + ", y = " + y + ") is invalid");
    }
    let cellX, cellY;
    const paddingLeftX = Utils.cell2Pixel(0, 0).x - cellWidth / 2;
    const paddingBottomY = Utils.cell2Pixel(0, 0).y - cellHeight / 2;

    if (mode === GameConfig.PLAYER) {
        cellX = Math.floor((x - paddingLeftX) / cellWidth);
        cellY = Math.floor((y - paddingBottomY) / cellHeight);
    } else if (mode === GameConfig.OPPONENT) {
        cellX = cellsX - 1 - Math.floor((x - paddingLeftX) / cellWidth);
        cellY = cellsY - 1 - Math.floor((y - paddingBottomY) / cellHeight);
    }
    return cc.p(cellX, cellY);
}

Utils.tileArray2PixelCellArray = function (tileArr, mode) {
    if (tileArr.length < 2) {
        return;
    }

    let cellArr = [];
    let cellX, cellY, tmp, beforeCellX, beforeCellY;

    // for (let i = 0; i < tileArr.length; i++) {
    //     let direction, direction2;
    //     if (i === 0) {
    //         direction = Utils.getDirectionOf2Tile(tileArr[0], tileArr[1]);
    //     } else if (i === tileArr.length - 1) {
    //         direction = Utils.getDirectionOf2Tile(tileArr[tileArr.length - 2], tileArr[tileArr.length - 1]);
    //     } else {
    //         direction = Utils.getDirectionOf2Tile(tileArr[i], tileArr[i + 1]);
    //     }
    // }
    let magicNumber = 27;
    let moduleCellRange = 4;
    let cellBound = 4;
    let divideAmount = 3;
    for (let i = 0; i < tileArr.length - 1; i++) {
        let direction;
        if (i === 0) {
            direction = Utils.getDirectionOf2Tile(tileArr[0], tileArr[1]);
        } else if (i === tileArr.length - 1) {
            direction = Utils.getDirectionOf2Tile(tileArr[tileArr.length - 2], tileArr[tileArr.length - 1]);
        } else {
            direction = Utils.getDirectionOf2Tile(tileArr[i], tileArr[i + 1]);
        }
        if (i === 0) {
            beforeCellX = cellBound;
            beforeCellY = cellBound;
        }
        // switch (direction) {
        //     case GameConfig.DIRECTION.LEFT:
        //         if (!beforeCellY) {
        //             beforeCellY = Math.floor(Math.random() * cellsEachTile)
        //         }
        //         cellY = tileArr[i].y * cellsEachTile + beforeCellY;
        //         for (let c = (tileArr[i].x + 1) * cellsEachTile - 1; c >= (tileArr[i].x) * cellsEachTile; c--) {
        //             cellArr.push(Utils.cell2Pixel(c, cellY, mode))
        //         }
        //         break;
        //     case GameConfig.DIRECTION.RIGHT:
        //         if (!beforeCellY) {
        //             beforeCellY = Math.floor(Math.random() * cellsEachTile)
        //         }
        //         cellY = tileArr[i].y * cellsEachTile + beforeCellY;
        //
        //         for (let c = tileArr[i].x * cellsEachTile; c < (tileArr[i].x + 1) * cellsEachTile; c++) {
        //             cellArr.push(Utils.cell2Pixel(c, cellY, mode))
        //         }
        //         break;
        //     case GameConfig.DIRECTION.BOTTOM:
        //         if (!beforeCellX) {
        //             beforeCellX = Math.floor(Math.random() * cellsEachTile);
        //         }
        //         cellX = tileArr[i].x * cellsEachTile + beforeCellX;
        //
        //         for (let r = (tileArr[i].y + 1) * cellsEachTile - 1; r >= (tileArr[i].y) * cellsEachTile; r--) {
        //             cellArr.push(Utils.cell2Pixel(cellX, r, mode))
        //         }
        //         break;
        //     case GameConfig.DIRECTION.TOP:
        //         if (!beforeCellX) {
        //             beforeCellX = Math.floor(Math.random() * cellsEachTile);
        //         }
        //         cellX = tileArr[i].x * cellsEachTile + beforeCellX;
        //
        //         for (let r = (tileArr[i].y) * cellsEachTile; r < (tileArr[i].y + 1) * cellsEachTile; r++) {
        //             cellArr.push(Utils.cell2Pixel(cellX, r, mode))
        //         }
        //         break;
        //     case GameConfig.DIRECTION.RIGHT_BOTTOM:
        //         direction2 = Utils.getDirectionOf2Tile(tileArr[i], tileArr[i + 1]);
        //         switch (direction2) {
        //             case GameConfig.DIRECTION.RIGHT:
        //                 tmp = beforeCellY;
        //                 cellX = tileArr[i].x * cellsEachTile + beforeCellX;
        //                 cellY = tileArr[i].y * cellsEachTile;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX + c, cellY + (tmp - c), mode))
        //                 }
        //                 beforeCellX = tmp;
        //                 break;
        //             case GameConfig.DIRECTION.BOTTOM:
        //                 tmp = cellsEachTile - 1 - beforeCellX;
        //                 cellX = tileArr[i].x * cellsEachTile;
        //                 cellY = (tileArr[i].y + 1) * cellsEachTile - 1;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX + c, cellY - c, mode))
        //                 }
        //                 beforeCellY = cellsEachTile - 1 - tmp;
        //                 break;
        //         }
        //         break;
        //     case GameConfig.DIRECTION.LEFT_BOTTOM:
        //         direction2 = Utils.getDirectionOf2Tile(tileArr[i], tileArr[i + 1]);
        //         switch (direction2) {
        //             case GameConfig.DIRECTION.LEFT:
        //                 tmp = beforeCellY;
        //                 cellX = (tileArr[i].x + 1) * cellsEachTile - 1;
        //                 cellY = tileArr[i].y * cellsEachTile;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX - c, cellY + (tmp - c), mode))
        //                 }
        //                 beforeCellX = tmp;
        //                 break;
        //             case GameConfig.DIRECTION.BOTTOM:
        //                 tmp = beforeCellX;
        //                 cellX = tileArr[i].x * cellsEachTile;
        //                 cellY = (tileArr[i].y + 1) * cellsEachTile - 1;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX + (tmp - c), cellY - c, mode))
        //                 }
        //                 beforeCellY = tmp;
        //                 break;
        //         }
        //         break;
        //     case GameConfig.DIRECTION.RIGHT_TOP:
        //         direction2 = Utils.getDirectionOf2Tile(tileArr[i], tileArr[i + 1]);
        //         switch (direction2) {
        //             case GameConfig.DIRECTION.RIGHT:
        //                 tmp = cellsEachTile - 1 - beforeCellY;
        //                 cellX = tileArr[i].x * cellsEachTile - 1;
        //                 cellY = tileArr[i].y * cellsEachTile + beforeCellY;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX + c, cellY + c, mode))
        //                 }
        //                 beforeCellX = tmp;
        //                 break;
        //             case GameConfig.DIRECTION.TOP:
        //                 tmp = cellsEachTile - 1 - beforeCellX;
        //                 cellX = tileArr[i].x * cellsEachTile + beforeCellX;
        //                 cellY = tileArr[i].y * cellsEachTile;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX + c, cellY + c, mode))
        //                 }
        //                 beforeCellY = tmp;
        //                 break;
        //         }
        //         break;
        //     case GameConfig.DIRECTION.LEFT_TOP:
        //         direction2 = Utils.getDirectionOf2Tile(tileArr[i], tileArr[i + 1]);
        //         switch (direction2) {
        //             case GameConfig.DIRECTION.RIGHT:
        //                 tmp = cellsEachTile - 1 - beforeCellY;
        //                 cellX = (tileArr[i].x + 1) * cellsEachTile - 1;
        //                 cellY = tileArr[i].y * cellsEachTile + beforeCellY;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX - c, cellY + c, mode))
        //                 }
        //                 beforeCellX = tmp;
        //                 break;
        //             case GameConfig.DIRECTION.TOP:
        //                 tmp = beforeCellX;
        //                 cellX = tileArr[i].x * cellsEachTile + beforeCellX;
        //                 cellY = tileArr[i].y * cellsEachTile;
        //                 for (let c = 0; c <= tmp; c++) {
        //                     cellArr.push(Utils.cell2Pixel(cellX + (tmp - c), cellY + c, mode))
        //                 }
        //                 beforeCellY = tmp;
        //                 break;
        //         }
        //         break;
        // }
        if (cellArr.length === 0) cellArr.push(Utils.cell2Pixel(tileArr[i].x * cellsEachTile + beforeCellX, (tileArr[i].y) * cellsEachTile + beforeCellY, mode));
        switch (direction) {
            case GameConfig.DIRECTION.BOTTOM:
                //Hình minh họa: https://drive.google.com/file/d/1Dj7JGcYk96uMo2GFs2ZjFHR0hJNmrQTk/view?usp=sharing
                if (beforeCellX >= cellBound && beforeCellX < cellBound + moduleCellRange) {
                    cellX = tileArr[i].x * cellsEachTile + beforeCellX;
                    cellY = (tileArr[i].y - 1) * cellsEachTile + beforeCellY;
                }
                //Hình minh họa : https://drive.google.com/file/d/1GT3Iq4VKiKe3VukIlYxqmEntlNaLMsLC/view?usp=sharing
                else {
                    cellX = tileArr[i].x * cellsEachTile + (beforeCellY + magicNumber) % moduleCellRange + cellBound;
                    cellY = (tileArr[i].y - 1) * cellsEachTile + moduleCellRange + cellBound;
                    beforeCellX = (beforeCellY + magicNumber) % moduleCellRange + cellBound;

                    if (cellArr.length != 0) {
                        let lastCell = cellArr[cellArr.length - 1];
                        let nextCell = Utils.cell2Pixel(cellX, cellY, mode);
                        let divideGapCellPath = Utils.divideCellPath(lastCell, nextCell, divideAmount);
                        for (let cell of divideGapCellPath) cellArr.push(cell);
                    }
                }


                cellArr.push(Utils.cell2Pixel(cellX, cellY, mode));

                beforeCellY = cellsEachTile - 1;

                break;
            case GameConfig.DIRECTION.RIGHT:
                //Hình minh họa https://drive.google.com/file/d/1npVhnqsittXffy4Bt_Qm2K_UJKQ8Vdxt/view?usp=sharing
                if (beforeCellY >= cellBound && beforeCellY < cellBound + moduleCellRange) {
                    cellX = (tileArr[i].x + 1) * cellsEachTile;
                    cellY = (tileArr[i].y) * cellsEachTile + beforeCellY;
                } else {
                    cellX = (tileArr[i].x + 1) * cellsEachTile;
                    cellY = tileArr[i].y * cellsEachTile + (beforeCellX + magicNumber) % moduleCellRange + cellBound;
                    beforeCellY = (beforeCellX + magicNumber) % moduleCellRange + cellBound;

                    let lastCell = cellArr[cellArr.length - 1];
                    let nextCell = Utils.cell2Pixel(cellX, cellY, mode);

                    let divideGapCellPath = Utils.divideCellPath(lastCell, nextCell, divideAmount);
                    for (let cell of divideGapCellPath) cellArr.push(cell);
                }
                cellArr.push(Utils.cell2Pixel(cellX, cellY, mode));
                beforeCellX = 0;
                break;
            case GameConfig.DIRECTION.LEFT:
                if (beforeCellY >= cellBound && beforeCellY < cellBound + moduleCellRange) {
                    cellX = (tileArr[i].x - 1) * cellsEachTile + cellsEachTile - 1;
                    cellY = (tileArr[i].y) * cellsEachTile + beforeCellY;
                } else {
                    cellX = (tileArr[i].x - 1) * cellsEachTile + cellsEachTile - 1;
                    cellY = tileArr[i].y * cellsEachTile + (beforeCellX + magicNumber) % moduleCellRange + cellBound;
                    beforeCellY = (beforeCellX + magicNumber) % moduleCellRange + cellBound;

                    let lastCell = cellArr[cellArr.length - 1];
                    let nextCell = Utils.cell2Pixel(cellX, cellY, mode);

                    let divideGapCellPath = Utils.divideCellPath(lastCell, nextCell, divideAmount);
                    for (let cell of divideGapCellPath) cellArr.push(cell);

                }
                cellArr.push(Utils.cell2Pixel(cellX, cellY, mode));
                beforeCellX = cellsEachTile - 1;
                break;
            case GameConfig.DIRECTION.TOP:
                if (beforeCellX >= cellBound && beforeCellX < cellBound + moduleCellRange) {
                    cellX = tileArr[i].x * cellsEachTile + beforeCellX;
                    cellY = (tileArr[i].y + 1) * cellsEachTile;
                } else {
                    cellX = tileArr[i].x * cellsEachTile + (beforeCellY + magicNumber) % moduleCellRange + cellBound;
                    cellY = (tileArr[i].y + 1) * cellsEachTile;
                    beforeCellX = (beforeCellY + magicNumber) % moduleCellRange + cellBound;

                    let lastCell = cellArr[cellArr.length - 1];
                    let nextCell = Utils.cell2Pixel(cellX, cellY, mode);

                    let divideGapCellPath = Utils.divideCellPath(lastCell, nextCell, divideAmount);
                    for (let cell of divideGapCellPath) cellArr.push(cell);
                }
                cellArr.push(Utils.cell2Pixel(cellX, cellY, mode));

                beforeCellY = 0;

                break;


        }
    }
    return cellArr;
}
Utils.divideCellPath = function (pointA, pointB, divideAmount) {
    let cellArr = [];
    for (let i = 1; i <= divideAmount - 1; i++) {
        let cellX = pointA.x + (pointB.x - pointA.x) * i / divideAmount;
        let cellY = pointA.y + (pointB.y - pointA.y) * i / divideAmount;
        cellArr.push({x: cellX, y: cellY});
    }
    return cellArr;
}
