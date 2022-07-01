var fr = fr || {}

fr._sceneId = 0;
fr.cached = {};
fr.view = function (Screen, transitionTime) {
    if (!transitionTime) {
        transitionTime = 1.2;
    }

    if (Screen.id && fr.cached[Screen.id]) {
        cc.log("Run cached here id = " + Screen.id)
        cc.director.runScene(new cc.TransitionFade(transitionTime, fr.cached[Screen.id]));
        return;
    }
    var layer = new Screen();
    layer.setName("screen");
    var scene = new cc.Scene();
    scene.addChild(layer);
    Screen.id = fr._sceneId;
    fr.cached[Screen.id] = scene;
    fr._sceneId++;

    // FIXME: only retain with MainScreen
    scene.retain();
    cc.director.runScene(new cc.TransitionFade(transitionTime, scene));

};
fr.getCurrentScreen = function () {
    return cc.director.getRunningScene().getChildByName("screen");
};

