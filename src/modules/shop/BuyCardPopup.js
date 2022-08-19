const BuyCardPopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();
    },

    _setupUI: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD;
        this.setName(this.name);
        this.popupNode = ccs.load(ShopResources.BUY_CARD_POPUP_NODE, '').node;
        this.addChild(this.popupNode);

        this.blur = this.popupNode.getChildByName("blur");
        this.blur.addTouchEventListener(this.onCloseClick.bind(this), this);
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

        this.fakeCardImage = ccs.load(ShopResources.FAKE_CARD_IMAGE, '').node;
        this.fakeCardBoder = this.fakeCardImage.getChildByName('borderImg');
        this.fakeCardBackground = this.fakeCardImage.getChildByName('backgroundImg');
        this.fakeTowerImg = this.fakeCardImage.getChildByName('towerImg');
        this.popupNode.addChild(this.fakeCardImage);
        this.fakeCardImage.setVisible(false);
        this.fakeCardImage.setPosition(this.cardImageNode.getPosition());
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
        this.quantity = quantity;
        this.popupNode.getChildByName("quantity").setString("x" + quantity);
    },

    setPrice: function (price) {
        this.price = price;
        this.buyBtn.getChildByName("priceTxt").setString(price);
    },

    setImage: function (image) {
        this.popupNode.getChildByName("card").getChildByName("cardImage").setTexture(image);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY).hideNotification();
        }
    },

    onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[BuyCardPopup.js] click on buy btn, card id = " + this.id);
            let user = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).user;
            if (user.gold < this.price) {
                let notify = PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY);
                notify.setNotifyTxt('Không Đủ Vàng');
                notify.showNotify();
                return;
            }
            this.runBuyCardAnimation(this.card.cardType);
        }
    },

    onCardClick: function (sender, type) {
        if (this.card && type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[BuyCardPopup.js] click on card, card id = " + this.type);
            let cardNode = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                .cardNodeMap.get(this.card.cardType);
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL).setCardModel(cardNode.cardModel);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL);
        }
    },

    setFakeCardImageTexture: function (cardId) {
        // this.fakeCardBackground.setTexture(CARD_CONST[cardId].background);
        this.fakeTowerImg.setTexture(CARD_CONST[cardId].cardImage);
        this.fakeCardImage.setScale(1);
    },

    runBuyCardAnimation: function (cardId) {
        this.setFakeCardImageTexture(cardId);
        this.fakeCardImage.setPosition(this.cardImageNode.getPosition());
        this.fakeCardImage.setVisible(true);
        cc.log("[BuyCardPopup.js] run buy card animation: " + JSON.stringify(this.progressBorderImg.getContentSize().width));
        let destinationPos = cc.p(
            this.upgradeProgressNode.getPosition().x - this.progressBorderImg.getContentSize().width / 2,
            this.upgradeProgressNode.getPosition().y
        );
        let moveTo = cc.moveTo(0.5, destinationPos);
        let scaleTo = cc.scaleTo(0.5, 0.3);
        this.fakeCardImage.runAction(cc.sequence(moveTo, scaleTo, cc.callFunc(function () {
                this.fakeCardImage.setVisible(false);
                this.runUpdateProgressAnimation(this.card.amount, this.quantity);
            }.bind(this)),
            cc.callFunc(function () {
                    ShopNetwork.connector.sendBuyDailyShop(this.id)
                }.bind(this)
            )));
    },

    runUpdateProgressAnimation: function (accumulatedCard, additionQuantity) {
        if (this.card.cardLevel >= MAX_CARD_LEVEL) {
            return;
        }
        let scaleXFrom = accumulatedCard / JsonReader.getCardUpgradeConfig()[this.card.cardLevel + 1].fragments;
        scaleXFrom = scaleXFrom > 1 ? 1 : scaleXFrom;
        let scaleXTo = (accumulatedCard + additionQuantity) / JsonReader.getCardUpgradeConfig()[this.card.cardLevel + 1].fragments;
        scaleXTo = scaleXTo > 1 ? 1 : scaleXTo;
        let scaleAction = cc.scaleTo(0.5, scaleXTo, 1);
        this.progressBackgroundImg.runAction(scaleAction);
    }
})