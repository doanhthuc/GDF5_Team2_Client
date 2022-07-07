let ComponentFactory = ComponentFactory || {};
ComponentFactory.pool = ComponentFactory.pool || ComponentPool.getInstance();

ComponentFactory.create = function (cls, ...data) {
    let component = this.pool.checkOut(cls);
    if (component) {
        component.reset(...data);
    } else {
        component = new cls(...data);
        ComponentManager.getInstance().add(component);
        ComponentFactory.pool.checkIn(component);
    }
    return component;
}
