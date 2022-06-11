let InfoComponent = Component.extend({
    name: "InfoComponentECS",
});

let LifeComponent = InfoComponent.extend({
    name: "LifeComponentECS",

    properties: {
        id: 1,
        hp: 0
    },

    ctor: function(hp) {
        this.hp =hp;
    },

});

let MonsterInfoComponent = InfoComponent.extend({
    name: "MonsterInfoComponentECS",

    properties: {

    }
});

let TowerInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",

    properties: {

    }
});

let TowerInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",

    properties: {

    },

});