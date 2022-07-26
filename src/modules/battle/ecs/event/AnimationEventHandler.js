EventDispatcher.getInstance()
    .addEventHandler(EventType.CHANGE_STATE_ENTITY, function (data) {
        let {entity, state} = data;
        if (!entity.state) {
            entity.state = state;
            AnimationMap[state](entity);
        }

        if (entity.state === state) return;
        // cc.log("==> Change state = " + state);
        AnimationMap[state](entity);
    })