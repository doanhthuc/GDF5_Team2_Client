const NotEnoughUpgradeResPopup = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_NOT_ENOUGH_UPGRADE_RES;
        this._super();
        this.init();
    },

    init: function () {
        this.node = ccs.load(InventoryResources.NOT_ENOUGH_UPGRADE_RES_POPUP_NODE, '').node;
        this.addChild(this.node);
        this.modal = this.node.getChildByName('modal');
        this.modal.addTouchEventListener(this.onModalClick.bind(this), this);
        this.closeBtn = this.node.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseBtnClick.bind(this), this);
        this.goToShopBtn = this.node.getChildByName('goToShopBtn');
        this.goToShopBtn.addTouchEventListener(this.onGoToShopBtnClick.bind(this), this);
        this.titleTxt = this.node.getChildByName('titleTxt');
        this.contentTxt = this.node.getChildByName('contentTxt');
        this.type = InventoryResources.RESOURCE_TYPE.GOLD;
        UiUtil.setImageFullScreen(this.modal);
    },

    setType: function (type) {
        this.type = type;
        this.setPopupTextByResType(this.type);
    },

    setPopupTextByResType: function (type) {
        switch (type) {
            case InventoryResources.RESOURCE_TYPE.GOLD:
                this.titleTxt.setString('Không đủ vàng');
                this.contentTxt.setString('Bạn không đủ vàng');
                break;
            case InventoryResources.RESOURCE_TYPE.CARD:
                this.titleTxt.setString('Không đủ thẻ');
                this.contentTxt.setString('Bạn không đủ thẻ để nâng cấp');
                break;
            case InventoryResources.RESOURCE_TYPE.GEM:
                this.titleTxt.setString('Không đủ gem');
                this.contentTxt.setString('Bạn không đủ gem');
            default:
                break;
        }
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

    onGoToShopBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
            // ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.)
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL).setVisible(false);
            this.parent.mainPageView.scrollToPage(NavResources.TAB_LIST.SHOP_TAB.index)
            cc.log("NotEnoughUpgradeResPopup line onGoToShopBtnClick");
        }
    }
})