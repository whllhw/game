// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        player: {
            default: null,
            type: cc.Node,
        },
        x_label: {
            type: cc.Label,
            default: null,
        },
        y_label: {
            type: cc.Label,
            default: null,
        },
        vx_label: {
            type: cc.Label,
            default: null,
        },
        vy_label: {
            type: cc.Label,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.last_x = this.player.x;
        this.last_y = this.player.y;
    },

    start () {
        // console.log(this.player);
    },

    update (dt) {
        this.x_label.string = Math.floor(this.player.x);
        this.y_label.string = Math.floor(this.player.y);
        this.vx_label.string = Math.floor(this.player.x - this.last_x);
        this.vy_label.string = Math.floor(this.player.y - this.last_y);
        this.last_x = this.player.x;
        this.last_y = this.player.y;
    },
});
