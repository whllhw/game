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
    },

    onCollisionEnter: function (other, self) {
        this.node.active = false;
    },
});
