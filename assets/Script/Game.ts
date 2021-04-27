const {ccclass, property} = cc._decorator;
import {Player} from './Player';

@ccclass
export class Game extends cc.Component {

    @property(cc.Node)
    game_over_node: cc.Node = null;

    @property(cc.Node)
    player_node: cc.Node = null;

    @property(cc.Button)
    attack_button: cc.Button = null;

    @property(cc.Button)
    jump_button: cc.Button = null;
    
    @property(cc.Button)
    left_button: cc.Button = null;

    @property(cc.Button)
    right_button: cc.Button = null;

    @property(cc.Button)
    reset_button: cc.Button = null;
    
    player: Player = null;
    game_state: string;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.player = this.player_node.getComponent('Player');

        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit;
        
        this.attack_button.node.on(cc.Node.EventType.TOUCH_START, () => {this.onKeyDown({keyCode: cc.macro.KEY.shift})}, this);
        this.jump_button.node.on(cc.Node.EventType.TOUCH_START, () => {this.onKeyDown({keyCode: cc.macro.KEY.space})}, this);
        this.left_button.node.on(cc.Node.EventType.TOUCH_START, () => {this.onKeyDown({keyCode: cc.macro.KEY.a})}, this);
        this.right_button.node.on(cc.Node.EventType.TOUCH_START, () => {this.onKeyDown({keyCode: cc.macro.KEY.d})}, this);
        this.reset_button.node.on(cc.Node.EventType.TOUCH_START, () => {this.onKeyDown({keyCode: cc.macro.KEY.r})}, this);

        this.attack_button.node.on(cc.Node.EventType.TOUCH_END, () => {this.onKeyUp({keyCode: cc.macro.KEY.shift})}, this);
        this.jump_button.node.on(cc.Node.EventType.TOUCH_END, () => {this.onKeyUp({keyCode: cc.macro.KEY.space})}, this);
        this.left_button.node.on(cc.Node.EventType.TOUCH_END, () => {this.onKeyUp({keyCode: cc.macro.KEY.a})}, this);
        this.right_button.node.on(cc.Node.EventType.TOUCH_END, () => {this.onKeyUp({keyCode: cc.macro.KEY.d})}, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {
        this.game_start();
    }

    game_start() {
        this.game_over_node.active = false;
        this.player.init();
        this.game_state = 'playing';

        console.log('game_start');
    }

    game_over() {
        this.game_over_node.x = 0;
        this.game_over_node.y = 0;
        this.game_over_node.active = true;
        this.game_state = 'dead';
        this.player.stop_right();
        this.player.stop_left();
        this.player.stop_jump();
    }

    onKeyDown(event) {
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
    }

    onKeyUp(event) {
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
    }
}
