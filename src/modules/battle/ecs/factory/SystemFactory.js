let SystemFactory = SystemFactory || {};

SystemFactory.create = function (cls, ...data) {
    let system = new cls(...data);
    SystemManager.getInstance().add(system)
    return system;
}
