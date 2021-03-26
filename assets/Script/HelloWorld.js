cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        move_speed: {
            default: 10,
        },
        move_time: {
            default: 0.1
        },
        stop_move_speed: {
            default: 5,
        },
        jump_height: {
            default: 5,
        },
        jump_time: {
            default: 0.1
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.body = this.player.getChildByName('body');
        this.anim = this.body.getComponent(cc.Animation);
        this.animState = this.anim.play();
        // 1 move_left 2 move_right 4 jump
        this.player_state = 0;
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {

        console.log(`Press ${event.keyCode} key`);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.move('left');
                break;
            case cc.macro.KEY.d:
                this.move('right');
                break;
            case cc.macro.KEY.space:
                this.jump();
                break;
        }
    },

    onKeyUp: function (event) {
        console.log(`Release ${event.keyCode} key`);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.stop('left');
                break;
            case cc.macro.KEY.d:
                this.stop('right');
                break;
            case cc.macro.KEY.space:
                this.jump_canel();
                break;
        }
    },

    jump: function () {
        console.log(this.player.y);
        // if (this.player_state !== 0) {
        //     return;
        // }
        this.player_state |= 4;
        // cc.tween(this.player)
        //     .by(this.jump_time, { y: this.jump_height })
        //     .by(this.jump_time, { y: -this.jump_height })
        //     .call(() => {this.player_state = 0;})
        //     .start();
    },

    jump_canel: function () {


    },

    move: function (diretion) {
        if (diretion === 'left') {
            this.body.scaleX = -Math.abs(this.body.scaleX);
            this.player_state |= 1;
        } else {
            this.body.scaleX = Math.abs(this.body.scaleX);
            this.player_state |= 2;
        }
        if (this.animState.isPlaying) {
            this.anim.play('walk');
        }
        // let _move_speed = this.move_speed;
        // if (diretion === 'left') {
        //     _move_speed = -_move_speed;
        // }
        console.log(this.player.x);
        // this.player.x += _move_speed;
        // cc.tween(this.player)
        //     .by(this.move_time, {x: _move_speed})
        //     .start();
    },

    stop: function (diretion) {
        let _move_speed = this.stop_move_speed;
        if (diretion === 'left') {
            _move_speed = -_move_speed;
        }
        this.player_state &= (0xffff - 3);
        // cc.tween(this.player)
        //     .by(1, { x: _move_speed })
        //     .call(() => {
        if (!this.animState.isPlaying) {
            this.anim.play('idle');
        }
        // })
        // .start();
    },

    // called every frame
    update: function (dt) {
        // console.log(dt);
        let params = {};
        if (this.player_state & 1) {
            // tween_list.push(
            //     cc.tween().by(dt, {x: -this.move_speed})
            // );
            params['x'] = -this.move_speed;
        } else if (this.player_state & 2) {
            // tween_list.push(
            //     cc.tween().by(dt, {x: this.move_speed})
            // );
            params['x'] = this.move_speed;
        }
        if (this.player_state & 4) {
            // tween_list.push(
            //     cc.tween().by(dt, {y: this.jump_height})
            // );
            params['y'] = this.jump_height;
        }
        this.player_state = 0;
        if ('x' in params || 'y' in params) {

        } else {
            return;
        }
        let tween = cc.tween(this.player);
        if ('x' in params) {
            tween = tween
                .by(dt, { x: params['x'] })
        }
        if ('y' in params) {
            tween = tween
                .by(dt * 10, { y: params['y'] })
                .by(dt * 10, { y: -params['y'] })
        }
        tween.start();
    },
});
