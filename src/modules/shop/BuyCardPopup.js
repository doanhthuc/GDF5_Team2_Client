const BuyCardPopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();
    },

    _setupUI: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD;
        this.popupNode = ccs.load(ShopResources.BUY_CARD_POPUP_NODE, '').node;
        this.addChild(this.popupNode);

        this.blur = this.popupNode.getChildByName("blur");
        UiUtil.setImageFullScreen(this.blur);
        this.closeBtn = this.popupNode.getChildByName('closeBtn');
        this.buyBtn = this.popupNode.getChildByName("buy_btn");
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
        this.buyBtn.getChildByName("backgroundBtn").addTouchEventListener(this.onBuyBtnClick.bind(this), this);

        this.upgradeProgressNode = this.popupNode.getChildByName('progress');
        this.progressBorderImg = this.upgradeProgressNode.getChildByName('progressBorderImg');
        this.progressBackgroundImg = this.progressBorderImg.getChildByName('progressBackgroundImg');
        this.accumulateTxt = this.progressBorderImg.getChildByName('accumulateTxt');

        this.cardImageNode = this.popupNode.getChildByName('card');
        this.cardBackgroundBtn = this.cardImageNode.getChildByName('cardBackgroundBtn');
        this.cardBorderImg = this.cardImageNode.getChildByName('cardBorderImage');
        this.cardBackgroundBtn.addTouchEventListener(this.onCardClick.bind(this), this);

        this.upgradeReadyAnimation = new sp.SkeletonAnimation('textures/lobby/fx/card_upgrade_ready.json', 'textures/lobby/fx/card_upgrade_ready.atlas');
        this.upgradeReadyAnimation.setPosition(0, this.cardBorderImg.height / 2 + 20);
        this.upgradeReadyAnimation.setAnimation(0, 'card_upgrade_ready', true);
        this.addChild(this.upgradeReadyAnimation, 4);
        this.upgradeReadyAnimationTxt = new cc.LabelTTF("", "font/SVN-Supercell Magic.ttf");
        this.upgradeReadyAnimation.addChild(this.upgradeReadyAnimationTxt);
        this.upgradeReadyAnimation.setVisible(false);
    },

    setId: function (id) {
        this.id = id;
    },

    setType: function (type) {
        this.type = type;
        let card = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT)
            .getCardById(this.type);
        this.card = card;
        let amount = 0;
        if (card) {
            amount = card.amount;
            this.setUpgradeProgressBar(amount);
        }
        // let percent = amount / JsonReader.getCardUpgradeConfig()[card.cardLevel + 1].fragments;
        // percent = percent > 1 ? 1 : percent;
        // this.progressBackgroundImg.setScaleX(percent);
        // this.accumulateTxt.setString(amount + '/' + JsonReader.getCardUpgradeConfig()[card.cardLevel + 1].fragments);
    },

    setUpgradeProgressBar: function (accumulatedCard) {
        //TODO: exception when max level
        if (this.card.cardLevel >= MAX_CARD_LEVEL) {
            this.progressBorderImg.setVisible(true);
            this.upgradeReadyAnimation.setVisible(false);
            this.accumulateTxt.setString('MAX');
            this.progressBackgroundImg.setScaleX(1);
        } else if (accumulatedCard < JsonReader.getCardUpgradeConfig()[this.card.cardLevel + 1].fragments) {
            this.progressBorderImg.setVisible(true);
            this.upgradeReadyAnimation.setVisible(false);
            this.progressBackgroundImg.setScaleX(accumulatedCard / JsonReader.getCardUpgradeConfig()[this.card.cardLevel + 1].fragments);
            this.accumulateTxt.setString(accumulatedCard + '/' + JsonReader.getCardUpgradeConfig()[this.card.cardLevel + 1].fragments);
        } else {
            this.progressBorderImg.setVisible(false);
            this.upgradeReadyAnimation.setVisible(true);
            this.upgradeReadyAnimationTxt.setString(accumulatedCard + '/' + JsonReader.getCardUpgradeConfig()[this.card.cardLevel + 1].fragments);
        }
    },

    setTitle: function (title) {
        this.popupNode.getChildByName("cardNameTxt").ignoreContentAdaptWithSize(true);
        this.popupNode.getChildByName("cardNameTxt").setString(title);
    },

    setQuantity: function (quantity) {
        this.popupNode.getChildByName("quantity").setString("x" + quantity);
    },

    setPrice: function (price) {
        this.buyBtn.getChildByName("priceTxt").setString(price);
    },

    setImage: function (image) {
        this.popupNode.getChildByName("card").getChildByName("cardImage").setTexture(image);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[BuyCardPopup.js] click on buy btn, card id = " + this.id);
            ShopNetwork.connector.sendBuyDailyShop(this.id)
        }
    },

    onCardClick: function(sender, type) {
        if (this.card && type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[BuyCardPopup.js] click on card, card id = " + this.type);
            let cardNode = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                .cardNodeMap.get(this.card.cardType);
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL).setCardModel(cardNode.cardModel);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL);
        }
    }
})