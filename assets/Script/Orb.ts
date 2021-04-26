const {ccclass, property} = cc._decorator;

@ccclass
export default class Orb extends cc.Component {

    @property(cc.Integer)
    speed: number = 10;

    update (dt) {
        this.node.x += this.speed;
    }
}
