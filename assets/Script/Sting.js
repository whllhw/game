// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        game_node: {
            type: cc.Node,
            default: null
        }
    },

    onLoad () {
        this.game = this.game_node.getComponent('Game');
    },

    start () {
        
    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        this.game.game_over();
    }
});
