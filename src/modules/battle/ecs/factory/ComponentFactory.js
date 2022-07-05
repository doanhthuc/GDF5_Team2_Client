let ComponentFactory = ComponentFactory || {};
ComponentFactory.pool = ComponentFactory.pool || new ComponentPool();

ComponentFactory.create = function (cls, ...data) {
    let component = this.pool.checkOut(cls.typeID);
    if (component) {
        component.reset(...data);
    } else {
        component = new cls(...data);
        ComponentManager.getInstance().add(component);
    }
    return component;
}
