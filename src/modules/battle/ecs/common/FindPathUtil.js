let FindPathUtil = FindPathUtil || {};

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
    // y
    // ^
    // |
    // |
    // -----------> x
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
            if (map[nextY][nextX] !== 0) continue;

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
    let current = path[dest.y][dest.x];
    let storePath = [dest];

    while (!(current.x === start.x && current.y === start.y)) {
        storePath.push(current);
        current = path[current.y][current.x]
    }
    storePath.push(start);

    return storePath.reverse();
}