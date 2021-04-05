// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 移动加速度
        x_accel: 5,
        x_max_speed: 20,
        // 跳跃加速度
        y_accel: 10,
        y_vo_speed: 100,
        // 跳跃次数
        y_max_times: 2,
        // 子弹速度
        bullet_speed: 10,
        bullet: {
            default: null,
            type: cc.Prefab
        },
        bullet_set: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.body = this.node.getChildByName('body');
        this.anim = this.body.getComponent(cc.Animation);
        this.anim_state = {};

        this.acc_left = false;
        this.acc_right = false;
        this.acc_height = false;

        this.y_times = 0;
        this.x_speed = 0;
        this.y_speed =0;
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                if (!this.acc_left) {
                    this.x_speed = 0;
                }
                this.acc_left = true;
                // this.acc_right = false;
                this.body.scaleX = -Math.abs(this.body.scaleX);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                // this.acc_left = false;
                if (!this.acc_right) {
                    this.x_speed = 0;
                }
                this.acc_right = true;
                this.body.scaleX = Math.abs(this.body.scaleX);
                break;
            case cc.macro.KEY.space:
                if (this.y_times >= this.y_max_times) {
                    return;
                }
                this.acc_height = true;
                this.y_speed = this.y_vo_speed;
                this.y_times ++;
                break;
            case cc.macro.KEY.shift:
                this.create_bullet();
                break;
        }
    },

    onKeyUp: function (event) {
        // console.log(`Release ${event.keyCode} key`);
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.acc_left = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.acc_right = false;
                break;
            case cc.macro.KEY.space:
                break;
        }
    },

    create_bullet() {
        let new_bullet = cc.instantiate(this.bullet);
        this.bullet_set.addChild(new_bullet);
        new_bullet.x = this.node.x;
        new_bullet.y = this.node.y;
        if (this.body.scaleX < 0) {
            new_bullet.getComponent('orb').speed = -this.bullet_speed;
        } else {
            new_bullet.getComponent('orb').speed = this.bullet_speed;
        }
    },


    play_anim(state = 'idle') {
        if (!this.anim_state[state]) {
            this.anim_state[state] = this.anim.play(state);
        } else if (!this.anim_state[state].isPlaying){
            this.anim.play(state);
        }
    },

    play_anim_by_state() {
        if (this.acc_height) {
            this.play_anim(this.y_speed > 0 ? 'jump' : 'down');
        } else if (this.acc_left || this.acc_right) {
            this.play_anim('walk');
        } else {
            this.play_anim('idle');
        }
    },

    move(dt) {
        if (this.acc_left && !this.acc_right) {
            // this.x_speed -= this.x_accel * dt;
            this.x_speed = -this.x_max_speed;
        } else if (this.acc_right && !this.acc_left) {
            // this.x_speed += this.x_accel * dt;
            this.x_speed = this.x_max_speed;
        } else {
            this.x_speed = 0;
        }

        if (Math.abs(this.x_speed) > this.x_max_speed) {
            this.x_speed = this.x_speed > 0 ? this.x_max_speed : -this.x_max_speed;
        }

        this.node.x += this.x_speed;

        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
        }
    },

    jump(dt) {
        this.y_speed -= (this.y_accel * dt);
        this.node.y += this.y_speed;

        if (this.node.y <= 0) {
            this.node.y = 0;
            this.y_speed = 0;
            this.y_times = 0;
            this.acc_height = false;
        } else if (this.node.y > this.node.parent.height / 2) {
            // this.node.y = this.node.parent.height / 2;
        }
    },

    start () {

    },

    update (dt) {
        this.move(dt);
        this.jump(dt);
        this.play_anim_by_state();
    },
});
