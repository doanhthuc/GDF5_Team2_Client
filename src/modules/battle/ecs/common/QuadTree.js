let QuadTreeData = cc.Class.extend({
    ctor: function (pRect, entity) {
        this.pRect = pRect;
        this.entity = entity;
    }
})
let QuadTree = cc.Class.extend({
    ctor: function (level, rect) {
        this.MAX_OBJECTS = 10;
        this.MAX_LEVELS = 15;

        this.currentLevel = level;
        this.boundingBox = rect;
        this.listObjects = [];

        this.nodes = []
    },

    clear: function () {
        this.listObjects = [];

        for (let i = 0; i <= 3; i++) {
            if (this.nodes[i]) {
                this.nodes[i].clear();
            }
        }
    },

    _split: function () {
        // TODO: Should round the number??
        let halfW = Math.floor(this.boundingBox.width / 2);
        let halfH = Math.floor(this.boundingBox.height / 2);
        let x = this.boundingBox.x;
        let y = this.boundingBox.y;

        this.nodes[QuadTree.BOTTOM_LEFT] = new QuadTree(this.currentLevel + 1, cc.rect(x, y, halfW, halfH));
        this.nodes[QuadTree.BOTTOM_RIGHT]  = new QuadTree(this.currentLevel + 1, cc.rect(x + halfW, y, halfW, halfH));
        this.nodes[QuadTree.TOP_LEFT] = new QuadTree(this.currentLevel + 1, cc.rect(x, y + halfH, halfW, halfH));
        this.nodes[QuadTree.TOP_RIGHT] = new QuadTree(this.currentLevel + 1, cc.rect(x + halfW, y + halfH, halfW, halfH));
    },

    getIndex: function (pRect) {
        let idx = -1;
        let verticalMidPoint = this.boundingBox.x + this.boundingBox.width / 2;
        let horizontalMidPoint = this.boundingBox.y + this.boundingBox.height / 2;

        let isTop = (pRect.y > horizontalMidPoint);
        let isBottom = (pRect.y < horizontalMidPoint && pRect.y + pRect.height < horizontalMidPoint);
        let isLeft = (pRect.x < verticalMidPoint && pRect.x + pRect.width < verticalMidPoint);
        let isRight = (pRect.x > verticalMidPoint);

        if (isLeft) {
            if (isTop)
                idx= QuadTree.TOP_LEFT;
            else if (isBottom)
                idx = QuadTree.BOTTOM_LEFT;
        } else if (isRight) {
            if (isTop)
                idx = QuadTree.TOP_RIGHT;
            else if (isBottom)
                idx = QuadTree.BOTTOM_RIGHT;
        }

        return idx;
    },

    insert: function (qTreeData) {
        if (this.nodes.length > 0) {
            let idx = this.getIndex(qTreeData.pRect);

            if (idx !== -1) {
                this.nodes[idx].insert(qTreeData);
                return;
            }
        }

        this.listObjects.push(qTreeData);
        if (this.listObjects.length > this.MAX_OBJECTS && this.currentLevel < this.MAX_LEVELS) {
            if (this.nodes.length === 0) {
                this._split();
            }

            for (let i = 0; i < this.listObjects.length;) {
                let idx = this.getIndex(this.listObjects[i].pRect);
                if (idx !== -1) {
                    this.nodes[idx].insert(this.listObjects[i]);
                    this.listObjects.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    },

    retrieve: function (pRect) {
        let returnObjects = [];
        let idx = this.getIndex(pRect);
        if (this.nodes.length > 0 && idx !== -1) {
            let result = this.nodes[idx].retrieve(pRect);
            if (result.length > 0) {
                for (let object of result) {
                    returnObjects.push(object);
                }
            }
        }

        for (let object of this.listObjects) {
            returnObjects.push(object);
        }

        return returnObjects;
    }
});

QuadTree.TOP_RIGHT = 0;
QuadTree.TOP_LEFT = 1;
QuadTree.BOTTOM_LEFT = 2;
QuadTree.BOTTOM_RIGHT = 3;