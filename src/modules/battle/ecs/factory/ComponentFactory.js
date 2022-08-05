let ComponentFactory = ComponentFactory || {};
ComponentFactory.pool = ComponentFactory.pool || ComponentPool.getInstance();

ComponentFactory.create = function (cls, ...data) {
    let component = this.pool.checkOut(cls);

    if (component) {
        component.reset(...data);
        component.setActive(true);
        if (component.saveData) {
            component.saveData();
        }
    } else {
        component = new cls(...data);
        // FIXME: invalid native object
        ComponentFactory.pool.checkIn(component);
    }

    ComponentManager.getInstance().add(component, true);

    return component;
}
