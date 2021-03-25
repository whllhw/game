cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        player: {
            default: null,
            type: cc.Node
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.body = this.player.getChildByName('body');
        this.anim = this.body.getComponent(cc.Animation);
        this.animState = this.anim.play();
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                console.log(`Press ${event.keyCode} key`);
                this.move('left');
                break;
            case cc.macro.KEY.d:
                console.log(`Press ${event.keyCode} key`);
                this.move('right');
                break;
        }
    },

    onKeyUp: function (event) {
        console.log(`release ${event.keyCode} key`);
        [cc.macro.KEY.a, cc.macro.KEY.d].filter((x) => {
            return event.keyCode === x;
        }).find((x) => {
            this.stop();
        });
    },

    move: function (diretion) {
        if (diretion === 'left') {
            this.body.scaleX = -Math.abs(this.body.scaleX);
        } else {
            this.body.scaleX = Math.abs(this.body.scaleX);
        }
        console.log(this.animState);
        if (this.animState.isPlaying) {
            this.anim.play('walk');
        }
    },

    stop: function () {
        if (!this.animState.isPlaying) {
            this.anim.play('idle');
        }
    },

    // called every frame
    update: function (dt) {

    },
});
