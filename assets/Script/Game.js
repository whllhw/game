cc.Class({
    extends: cc.Component,

    properties: {
        game_over_node: {
            type: cc.Node,
            default: null
        },
        player_node: {
            type: cc.Node,
            default: null
        }
    },

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.player = this.player_node.getComponent('Player');
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.game_state === 'playing' && this.player.move_left();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.game_state === 'playing' && this.player.move_right();
                break;
            case cc.macro.KEY.space:
                this.game_state === 'playing' && this.player.jump();
                break;
            case cc.macro.KEY.shift:
                this.game_state === 'playing' && this.player.create_bullet();
                break;
            case cc.macro.KEY.r:
                this.game_start();
                break;
        }
    },

    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.player.stop_left();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.player.stop_right();
                break;
        }
    },

    start() {
        this.game_start();

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    game_start() {
        this.game_over_node.active = false;
        this.player.set_postion(0, 0);
        this.game_state = 'playing';
    },

    game_over() {
        this.game_over_node.x = 0;
        this.game_over_node.y = 0;
        this.game_over_node.active = true;
        this.game_state = 'dead';
        this.player.stop_right();
        this.player.stop_left();
        this.player.stop_jump();
    }

});
