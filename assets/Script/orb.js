cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
    },

    onLoad () {
        
    },

    start () {

    },

    check() {
        
    },

    update (dt) {
        this.node.x += this.speed;
        // if (this.check()) {
        //     this.node.destory();
        // }
    },
});
