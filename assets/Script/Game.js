cc.Class({
    extends: cc.Component,

    properties: {
        game_over_node: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    start() {
        this.game_start();

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    game_start() {
        this.game_over_node.active = false;
    },

    game_over() {
        this.game_over_node.x = 0;
        this.game_over_node.y = 0;
        this.game_over_node.active = true;
    }

   
});
