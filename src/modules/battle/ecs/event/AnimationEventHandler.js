EventDispatcher.getInstance()
    .addEventHandler(EventType.CHANGE_STATE_ENTITY, function (data) {
        let {entity, state} = data;
        // cc.log("==> Change state = " + state);
        AnimationMap[state](entity);
    })