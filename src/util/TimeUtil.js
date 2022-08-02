const TimeUtil =  {
    serverTime: 0,
    deltaTime: 0,

    getServerTime : () => {
        return Date.now() + this.deltaTime;
    },

    getDeltaTime : () => this.deltaTime,

    setDeltaTime : (serverTime) => {
        this.deltaTime = serverTime - Date.now();
    }
}