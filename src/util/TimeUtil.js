const TimeUtil =  {
    serverTime: 0,
    deltaTime: 0,

    getServerTime : () => this.serverTime,

    getDeltaTime : () => this.deltaTime,

    setDeltaTime : (serverTime) => {
        this.deltaTime = serverTime - Date.now();
    },

    setServerTime: (time) => {
        this.serverTime = time;
    }
}