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
        x_accel: 1500,
        // 最大移动速度
        x_max_speed: 300,
        // 跳跃速度
        y_v0_speed: 500,
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
        },
        body: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        // this.body = this.node.getChildByName('body');
        this.anim = this.body.getComponent(cc.Animation);
        this.anim_state = {};
        this.rigidBody = this.body.getComponent(cc.RigidBody);
    },

    move_left() {
        if (!this.acc_left) {
            this.x_speed = 0;
        }
        this.acc_left = true;
        this.body.scaleX = -Math.abs(this.body.scaleX);
    },

    stop_left() {
        this.acc_left = false;
    },

    move_right() {
        if (!this.acc_right) {
            this.x_speed = 0;
        }
        this.acc_right = true;
        this.body.scaleX = Math.abs(this.body.scaleX);
    },

    stop_right() {
        this.acc_right = false;
    },

    jump() {
        if (this.y_times >= this.y_max_times) {
            return;
        }
        this.acc_height = true;
        this.y_speed = this.y_v0_speed;
        this.y_times ++;
    },

    stop_jump() {
        this.y_speed = 0;
        this.y_times = 0;
        this.acc_height = false;

        this.init_rigid_body(0);
    },

    fall_down() {
        if (!this.acc_height) {
            this.y_speed = 0;
            this.y_times = 0;
            this.acc_height = true;
        }
    },

    create_bullet() {
        let new_bullet = cc.instantiate(this.bullet);
        this.bullet_set.addChild(new_bullet);
        new_bullet.x = this.node.x;
        new_bullet.y = this.node.y;
        if (this.body.scaleX < 0) {
            new_bullet.getComponent('Orb').speed = -this.bullet_speed;
        } else {
            new_bullet.getComponent('Orb').speed = this.bullet_speed;
        }
    },

    init() {
        this.acc_left = false;
        this.acc_right = false;
        this.acc_height = false;

        this.y_times = 0;
        this.x_speed = 0;
        this.y_speed = 0;

        this.node.x = 0;
        this.node.y = 0;

        this.body.x = 0;
        this.body.y = 0;

        this.init_rigid_body();

        console.log('init');        
    },

    init_rigid_body(gravityScale = 3) {
        this.rigidBody.linearVelocity = cc.v2();
        this.rigidBody.gravityScale = gravityScale;
    },


    play_anim(state = 'idle') {
        if (!this.anim_state[state]) {
            this.anim_state[state] = this.anim.play(state);
        } else if (!this.anim_state[state].isPlaying){
            this.anim.play(state);
        }
    },

    play_anim_by_state() {
        if (Math.abs(this.y_speed) > 1) {
            this.play_anim(this.y_speed > 1 ? 'jump' : 'down');
        } else if (this.acc_left || this.acc_right) {
            this.play_anim('walk');
        } else {
            this.play_anim('idle');
        }
    },

    move_dt(dt) {
        if (this.acc_left && !this.acc_right) {
            this.x_speed -= this.x_accel * dt;
        } else if (this.acc_right && !this.acc_left) {
            this.x_speed += this.x_accel * dt;
        } else {
            this.x_speed = 0;
        }

        if (Math.abs(this.x_speed) > this.x_max_speed) {
            this.x_speed = this.x_speed > 0 ? this.x_max_speed : -this.x_max_speed;
        }

        let velocity = this.rigidBody.linearVelocity;
        velocity.x = this.x_speed;
        if (this.acc_height) {
            this.y_speed = this.y_v0_speed;
            velocity.y = this.y_speed;
            this.acc_height = false;
        } else {
            this.y_speed = velocity.y;
        }

        if (velocity.y < 1) {
            this.y_times = 0;
        }

        this.rigidBody.linearVelocity = velocity;
        this.node.x = this.body.x;
        this.node.y = this.body.y;
    },

    start () {
        console.log('start');
    },

    update (dt) {
        this.move_dt(dt);
        this.play_anim_by_state();
    },
});
