let System = cc.Class.extend({
    name: "SystemECS", // Class name
    properties: {
        id: 0
    },

    run: function (entities) {
        throw new MyNotImplementedError();
    },
});

let CollisionSystem = System.extend({
    name: "CollisionSystemECS",

    properties: {
        id: 1
    },

    run: function () {
        // let collisionComponentID = 1;
        // let entities = EntityManager.getInstance().getEntitiesByComponent(collisionComponentID, positionComponentID);
        // for (let i = 0; i < entities.length; i++) {
        //     let entity = entities[i];
        //
        // }
    }
});