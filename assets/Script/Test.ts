const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(cc.Node)
    body: cc.Node = null;

    @property(cc.Label)
    x_label: cc.Label = null;

    @property(cc.Label)
    y_label: cc.Label = null;

    @property(cc.Label)
    vx_label: cc.Label = null;

    @property(cc.Label)
    vy_label: cc.Label = null;

    _rigidBody: cc.RigidBody;

    onLoad () {
        this._rigidBody = this.body.getComponent(cc.RigidBody);
    }

    update (dt) {
        this.x_label.string = (String)(Math.floor(this.body.x));
        this.y_label.string = (String)(Math.floor(this.body.y));
        let velocity = this._rigidBody.linearVelocity;
        this.vx_label.string = (String)(Math.floor(velocity.x));
        this.vy_label.string = (String)(Math.floor(velocity.y));
    }
}
