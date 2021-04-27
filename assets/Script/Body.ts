const {ccclass, property} = cc._decorator;
import {Game} from './Game';

@ccclass
export default class Body extends cc.Component {

    @property(cc.Node)
    game_node: cc.Node = null;

    game: Game;
    body: cc.RigidBody;

    onLoad () {
        this.game = this.game_node.getComponent('Game');
        this.body = this.getComponent(cc.RigidBody);
    }

    start () {

    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact (contact:any, selfCollider:cc.RigidBody, otherCollider:cc.RigidBody) {
        if (otherCollider.node.name === 'sting') {
            this.game.game_over();
        }
    }

    update (dt) {
        let x = this.node.x;
        let y = this.node.y;
        if (Math.abs(x) > this.node.parent.width / 2
            || Math.abs(y) > this.node.parent.height / 2) {
            this.game.game_over();
        }
    }
    
}
