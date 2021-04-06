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
        },
    },

    onLoad () {
        this.game = this.game_node.getComponent('Game');
        this.player = this.node.parent.getComponent('Player');
    },

    start () {
        
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === 'sting') {
            this.game.game_over();
        }
        if (other.node.name === 'wall') {
            this.player.stop_jump();
        }
    },

    onCollisionExit: function (other, self) {
        if (other.node.name === 'wall') {
            this.player.fall_down();
        }
    }

    // update (dt) {}
});
