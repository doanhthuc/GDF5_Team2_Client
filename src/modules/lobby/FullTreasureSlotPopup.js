const FullTreasureSlotPopup = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_FULL_TREASURE_SLOT;
        this._super();
        this.init();
    },

    init: function () {
        this.node = ccs.load(TreasureSlotResources.FULL_TREASURE_SLOT_POPUP, '').node;
        this.addChild(this.node);
        this.modal = this.node.getChildByName('modal');
        this.modal.addTouchEventListener(this.onModalClick.bind(this), this);
        this.closeBtn = this.node.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseBtnClick.bind(this), this);
        this.continueBtn = this.node.getChildByName('continueBtn');
        this.continueBtn.addTouchEventListener(this.onContinueBtnClick.bind(this), this);
    },

    onCloseBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onModalClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onContinueBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
            cc.log("FullTreasureSlotPopup line onContinueBtnClick");
            let scene = new MatchingScene();
            let transitionTime = 1.2;
            cc.director.runScene(new cc.TransitionFade(transitionTime, scene));
        }
    }
});