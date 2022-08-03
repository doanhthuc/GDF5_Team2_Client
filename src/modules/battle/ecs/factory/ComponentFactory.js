let ComponentFactory = ComponentFactory || {};
ComponentFactory.pool = ComponentFactory.pool || ComponentPool.getInstance();

ComponentFactory.create = function (cls, ...data) {
    let component = this.pool.checkOut(cls);
    if (component) {
        component.reset(...data);
        if (component.typeID === PositionComponent.typeID
            || component.typeID === VelocityComponent.typeID
            || component.typeID === PathComponent.typeID
            || component.typeID === DamageEffect.typeID
            || component.typeID === LifeComponent.typeID
            || component.type === AttackComponent.typeID) {
            component.saveData();
        }
    } else {
        component = new cls(...data);
        ComponentManager.getInstance().add(component);
        // FIXME: invalid native object
        ComponentFactory.pool.checkIn(component);
    }
    return component;
}
