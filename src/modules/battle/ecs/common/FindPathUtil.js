let FindPathUtil = FindPathUtil || {};

FindPathUtil.mapObstacles = {
    1: res.map_forest_obstacle_1,
    2: res.map_forest_obstacle_2,
    3: res.map_forest_obstacle_3,
    4: res.map_monster_gate_enemy,
    5: res.map_house
};

FindPathUtil.randomIntRange = function (lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower));
}

FindPathUtil.randomItemInArray = function(arr) {
    let idx = FindPathUtil.randomIntRange(0, arr.length);
    return arr[idx];
}

/**
 * Create the 2D matrix with the default value
 * @param numRow
 * @param numCol
 * @param defaultValue
 * @returns {*[]}
 */
FindPathUtil.create2DMatrix = function(numRow, numCol, defaultValue) {
    let matrix = [];

    for (let i = 0; i < numRow; i++) {
        matrix[i] = [];
        for (let j = 0; j < numCol; j++) {
            matrix[i].push(defaultValue);
        }
    }

    return matrix;
}

FindPathUtil.findShortestPath = function(map, start, dest) {
    let visited = FindPathUtil.create2DMatrix(map.length, map[0].length, false);

    function getNeigbors(point) {
        // x: chi so hang, y: chi so cot trong matrix 2D
        let dY = [0, +1, 0, -1];
        let dX = [-1, 0, +1, 0];
        let neighbors = [];

        for (let i = 0; i < dX.length; i++) {
            let nextX = point.x + dX[i];
            let nextY = point.y + dY[i];
            if (nextX < 0 || nextY < 0 || nextX >= map.length
                || nextY >= map[0].length) continue;
            if (visited[nextX][nextY]) continue;
            if (map[nextX][nextY] !== 0) continue;

            neighbors.push({x: nextX, y: nextY});
            visited[nextX][nextY] = true;
        }

        return neighbors;
    }

    function bfs(start, dest) {
        let queue = [start];
        let path = FindPathUtil.create2DMatrix(map.length, map[0].length, null);
        visited[start.x][start.y] = true;
        while (queue.length > 0) {
            let current = queue.shift();
            if (current.x === dest.x && current.y === dest.y) {
                return path;
            }
            let neighbors = getNeigbors(current);
            for (let neighbor of neighbors) {
                path[neighbor.x][neighbor.y] = current;
                queue.push(neighbor);
            }
        }

        return [];
    }

    let path = bfs(start, dest)
    let current = path[dest.x][dest.y];
    let storePath = [dest];

    while (!(current.x === start.x && current.y === start.y)) {
        storePath.push(current);
        current = path[current.x][current.y]
    }
    storePath.push(start);

    // convert to another coordination
    for (let i = 0; i < storePath.length; i++) {
        let tmp = storePath[i].y;
        storePath[i].y = 6 - storePath[i].x;
        storePath[i].x = tmp;
    }
    return storePath.reverse();
}

/**
 * Generate map
 * @param mapSize{width: int, height: int} Size of map
 * @param gatePos {x: int, y: int} Monster gate position
 * @param housePos {x: int, y: int} House position
 * @param obstacleIds {Array[int]} Id of obstacle
 * @param numObstacle {number} Number of obstacle in map
 */
FindPathUtil.genMap = function(mapSize, gatePos, housePos, obstacleIds, numObstacle) {
    // truc toa do: x => Tay sang Dong, y => Bac xuong Nam
    let map = FindPathUtil.create2DMatrix(mapSize.height, mapSize.width, 0);

    function hasObstacleAt(map, x, y) {
        if ((x === gatePos.x && y === gatePos.y) || (x === housePos.x && y === housePos.y)) return true;
        return map[y][x] !== 0;
    }

    function hasAnyNeighbors(x, y) {
        // x: columnIdx of map, y: rowIdx of map
        // Bac, Dong Bac, Dong, Dong Nam, Nam, Tay Nam, Tay, Tay Bac

        // let dX = [0, +1, +1, +1, 0, -1, -1, -1];
        // let dY = [-1, -1, 0, +1, +1, +1, 0, -1];

        let dX = [0, +1, 0, -1];
        let dY = [-1,0, +1, 0];
        for (let i = 0; i < dX.length; i++) {
            let nextX = x + dX[i];
            let nextY = y + dY[i];
            if (nextX < 0 || nextY < 0 || nextX >= map[0].length || nextY >= map.length) continue;
            if (hasObstacleAt(map, nextX, nextY)) {
                return true;
            }
        }
        return false;
    }


    let countObstacleGenerated = 0;
    while (countObstacleGenerated < numObstacle) {
        let x = FindPathUtil.randomIntRange(0, mapSize.width);
        let y = FindPathUtil.randomIntRange(0, mapSize.height);

        if (hasObstacleAt(map, x, y)) continue;
        if (x === gatePos.x && y === gatePos.y) continue;
        if (x === housePos.x && y === housePos.y) continue;
        if (hasAnyNeighbors(x, y)) continue;

        map[y][x] = FindPathUtil.randomItemInArray(obstacleIds);
        countObstacleGenerated++;
    }

    return map;
}