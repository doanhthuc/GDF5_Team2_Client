let BattleLoop = cc.Class.extend({
    ctor: function () {
        this._lastTime = 0;
        this._currentTime = 0;
        this._commandFrameRate = 10;
        this._sendCommandBuffer = [];
        this._receiveCommandBuffer = [];
        this._tickNumber = 1;
    },

    start: function () {
        this._currentTime = (new Date()).getMilliseconds();
        if (this._currentTime - this._lastTime >= 1000 / this._commandFrameRate) {
            while (this._sendCommandBuffer.length > 0) {
                let command = this._receiveCommandBuffer.shift();
                // send
            }
            this._tickNumber++;

            this._handleReceiveCommand();
        }
    },

    addSendCommand: function (command) {
        this._sendCommandBuffer.push(command);
        return this;
    },

    addReceiveCommand: function (command) {
        this._receiveCommandBuffer.push(command);
        return this;
    },

    _handleReceiveCommand: function () {
        while (this._receiveCommandBuffer.length > 0) {
            let command = this._receiveCommandBuffer.shift();
            // send
        }
    }
})