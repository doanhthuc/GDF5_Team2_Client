let FindPathUtil = FindPathUtil || {};

FindPathUtil.create2DMatrix = function (numRow, numCol, defaultValue) {
    if (!defaultValue) {
        defaultValue = 0;
    }
    let matrix = [];

    for (let i = 0; i < numRow; i++) {
        matrix[i] = [];
        for (let j = 0; j < numCol; j++) {
            matrix[i].push(defaultValue);
        }
    }

    return matrix;
}

/**
 *
 * @param map
 * @param startt {cc.p} tile position
 * @param destt {cc.p} tile position
 * @returns {{x, y: number}[]|null}
 */
FindPathUtil.findShortestPath = function (map, startt, destt) {
    // convert tile
    let start = {x: startt.x, y: GameConfig.MAP_HEIGH - 1 - startt.y}
    let dest = {x: destt.x, y: GameConfig.MAP_HEIGH - 1 - destt.y}
    // -----------> x
    // |
    // |
    // |
    // V y
    let visited = FindPathUtil.create2DMatrix(map.length, map[0].length, false);

    function getNeigbors(point) {
        // x: chi so hang, y: chi so cot trong matrix 2D
        let dX = [0, +1, 0, -1];
        let dY = [-1, 0, +1, 0];
        let neighbors = [];

        for (let i = 0; i < dX.length; i++) {
            let nextX = point.x + dX[i];
            let nextY = point.y + dY[i];
            if (nextX < 0 || nextY < 0 || nextX >= map[0].length
                || nextY >= map.length) continue;
            if (visited[nextY][nextX]) continue;

            if (map[nextY][nextX] !== GameConfig.MAP.NONE
                && map[nextY][nextX] !== GameConfig.MAP.ATTACK_SPEED
                && map[nextY][nextX] !== GameConfig.MAP.ATTACK_DAMAGE
                && map[nextY][nextX] !== GameConfig.MAP.ATTACK_RANGE) continue;

            neighbors.push({x: nextX, y: nextY});
            visited[nextY][nextX] = true;
        }

        return neighbors;
    }

    function bfs(start, dest) {
        let queue = [start];
        let path = FindPathUtil.create2DMatrix(map.length, map[0].length, null);
        visited[start.y][start.x] = true;
        while (queue.length > 0) {
            let current = queue.shift();
            if (current.x === dest.x && current.y === dest.y) {
                return path;
            }
            let neighbors = getNeigbors(current);

            for (let neighbor of neighbors) {
                path[neighbor.y][neighbor.x] = current;
                queue.push(neighbor);
            }
        }

        return [];
    }

    let path = bfs(start, dest)
    if (path.length === 0 || !path[dest.y] || !path[dest.y][dest.x]) {
        return null;
    }
    let current = path[dest.y][dest.x];
    let storePath = [dest];

    while (!(current.x === start.x && current.y === start.y)) {
        storePath.push(current);
        current = path[current.y][current.x]
    }
    storePath.push(start);

    // convert to matrix coordination to tile coordination
    for (let i = 0; i < storePath.length; i++) {
        storePath[i].y = GameConfig.MAP_HEIGH - 1 - storePath[i].y;
    }
    return storePath.reverse();
}

FindPathUtil.findShortestPathForEachTile = function (mode) {
    let map = BattleManager.getInstance().getBattleData().getMap(mode);
    let shortestPathForEachTiles = FindPathUtil.create2DMatrix(map.length, map[0].length, null);

    cc.log("^^^^^^^^^")
    for (let r = 0; r < map.length; r++) {
        let str = "";
        for (let c = 0; c < map[0].length; c++) {
            str += map[r][c] + "\t";
        }
        cc.log(str);
    }

    function findPathAble(x) {
        return (x === GameConfig.MAP.NONE || x === GameConfig.MAP.ATTACK_DAMAGE || x === GameConfig.MAP.ATTACK_RANGE || x === GameConfig.MAP.ATTACK_SPEED);
    }

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (findPathAble(map[row][col])) {
                let path = FindPathUtil.findShortestPath(map, cc.p(col, GameConfig.MAP_HEIGH - 1 - row), cc.p(GameConfig.HOUSE_POSITION.x, GameConfig.HOUSE_POSITION.y));
                if (path && path.length > 0) {
                    shortestPathForEachTiles[row][col] = path;
                }
            }
        }
    }

    if (shortestPathForEachTiles && shortestPathForEachTiles[0][0]) {
        BattleManager.getInstance().getBattleData().setShortestPathForEachTile(shortestPathForEachTiles, mode);
    }
    return BattleManager.getInstance().getBattleData().getShortestPathForEachTile(mode);
}