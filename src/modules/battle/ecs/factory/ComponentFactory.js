let ComponentFactory = ComponentFactory || {};
ComponentFactory.pool = ComponentFactory.pool || ComponentPool.getInstance();

ComponentFactory.create = function (cls, ...data) {
    // let component = this.pool.checkOut(cls);
    let component = null;
    if (component) {
        component.reset(...data);
        component.setActive(true);
        // ComponentManager.getInstance().add(component, true);
    } else {
        component = new cls(...data);
        // FIXME: invalid native object
        // ComponentFactory.pool.checkIn(component);
    }

    return component;
}
