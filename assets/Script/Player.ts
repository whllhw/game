const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property(cc.Integer)
    x_accel: number = 1500;

    @property(cc.Integer)
    x_max_speed: number = 300;

    @property(cc.Integer)
    y_v0_speed: number = 500;

    @property(cc.Integer)
    y_max_times: number = 2;

    @property(cc.Integer)
    bullet_speed: number = 10;

    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(cc.Node)
    bullet_set: cc.Node = null;

    @property(cc.Node)
    body: cc.Node = null;

    anim: cc.Animation = null;
    anim_state: Set<any> = null;
    rigidBody: cc.RigidBody = null;
    acc_left: boolean = false;
    x_speed: number;
    acc_right: boolean = false;
    y_times: number = 0;
    acc_height: boolean;
    y_speed: number;

    onLoad () {
        this.anim = this.body.getComponent(cc.Animation);
        this.anim_state = new Set();
        this.rigidBody = this.body.getComponent(cc.RigidBody);
    }

    start () {

    }

    update (dt) {
        this.move_dt(dt);
        this.play_anim_by_state();
    }

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
    }

    init_rigid_body(gravityScale = 3) {
        this.rigidBody.linearVelocity = cc.v2();
        this.rigidBody.gravityScale = gravityScale;
    }

    move_left() {
        if (!this.acc_left) {
            this.x_speed = 0;
        }
        this.acc_left = true;
        this.body.scaleX = -Math.abs(this.body.scaleX);
    }

    stop_left() {
        this.acc_left = false;
    }

    move_right() {
        if (!this.acc_right) {
            this.x_speed = 0;
        }
        this.acc_right = true;
        this.body.scaleX = Math.abs(this.body.scaleX);
    }

    stop_right() {
        this.acc_right = false;
    }

    jump() {
        if (this.y_times >= this.y_max_times) {
            return;
        }
        this.acc_height = true;
        this.y_speed = this.y_v0_speed;
        this.y_times ++;
    }

    stop_jump() {
        this.y_speed = 0;
        this.y_times = 0;
        this.acc_height = false;

        this.init_rigid_body(0);
    }

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
    }

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
    }

    play_anim(state = 'idle') {
        if (!this.anim_state[state]) {
            this.anim_state[state] = this.anim.play(state);
        } else if (!this.anim_state[state].isPlaying){
            this.anim.play(state);
        }
    }

    play_anim_by_state() {
        if (Math.abs(this.y_speed) > 1) {
            this.play_anim(this.y_speed > 1 ? 'jump' : 'down');
        } else if (this.acc_left || this.acc_right) {
            this.play_anim('walk');
        } else {
            this.play_anim('idle');
        }
    }

}
