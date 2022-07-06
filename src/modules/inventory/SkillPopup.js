const SkillPopup = cc.Node.extend({
    ctor: function (skillModel) {
        this._super();
        this.init();
        if (skillModel) this.setModel(skillModel);
    }
});