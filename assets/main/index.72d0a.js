window.__require=function t(e,o,i){function n(c,s){if(!o[c]){if(!e[c]){var a=c.split("/");if(a=a[a.length-1],!e[a]){var p="function"==typeof __require&&__require;if(!s&&p)return p(a,!0);if(r)return r(a,!0);throw new Error("Cannot find module '"+c+"'")}c=a}var _=o[c]={exports:{}};e[c][0].call(_.exports,function(t){return n(e[c][1][t]||t)},_,_.exports,t,e,o,i)}return o[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<i.length;c++)n(i[c]);return n}({Body:[function(t,e,o){"use strict";cc._RF.push(e,"6d5b05trlhOdIqIb3LXuZJj","Body");var i=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),n=this&&this.__decorate||function(t,e,o,i){var n,r=arguments.length,c=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,s=r.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.game_node=null,e}return i(e,t),e.prototype.onLoad=function(){this.game=this.game_node.getComponent("Game"),this.body=this.getComponent(cc.RigidBody)},e.prototype.start=function(){},e.prototype.onBeginContact=function(t,e,o){"sting"===o.node.name&&this.game.game_over()},n([s(cc.Node)],e.prototype,"game_node",void 0),e=n([c],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],Game:[function(t,e,o){"use strict";cc._RF.push(e,"ef644dqKH1GcomtLsuPd4PA","Game");var i=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),n=this&&this.__decorate||function(t,e,o,i){var n,r=arguments.length,c=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0}),o.Game=void 0;var r=cc._decorator,c=r.ccclass,s=r.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.game_over_node=null,e.player_node=null,e.player=null,e}return i(e,t),e.prototype.onLoad=function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.player=this.player_node.getComponent("Player"),cc.director.getPhysicsManager().enabled=!0},e.prototype.onDestroy=function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},e.prototype.start=function(){this.game_start()},e.prototype.game_start=function(){this.game_over_node.active=!1,this.player.init(),this.game_state="playing",console.log("game_start")},e.prototype.game_over=function(){this.game_over_node.x=0,this.game_over_node.y=0,this.game_over_node.active=!0,this.game_state="dead",this.player.stop_right(),this.player.stop_left(),this.player.stop_jump()},e.prototype.onKeyDown=function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:"playing"===this.game_state&&this.player.move_left();break;case cc.macro.KEY.d:case cc.macro.KEY.right:"playing"===this.game_state&&this.player.move_right();break;case cc.macro.KEY.space:"playing"===this.game_state&&this.player.jump();break;case cc.macro.KEY.shift:"playing"===this.game_state&&this.player.create_bullet();break;case cc.macro.KEY.r:this.game_start()}},e.prototype.onKeyUp=function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:this.player.stop_left();break;case cc.macro.KEY.d:case cc.macro.KEY.right:this.player.stop_right()}},n([s(cc.Node)],e.prototype,"game_over_node",void 0),n([s(cc.Node)],e.prototype,"player_node",void 0),e=n([c],e)}(cc.Component);o.Game=a,cc._RF.pop()},{}],Orb:[function(t,e,o){"use strict";cc._RF.push(e,"9b651Jony5IQKNmvP3Jytzp","Orb");var i=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),n=this&&this.__decorate||function(t,e,o,i){var n,r=arguments.length,c=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,s=r.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.speed=10,e}return i(e,t),e.prototype.update=function(t){this.node.x+=this.speed},n([s(cc.Integer)],e.prototype,"speed",void 0),e=n([c],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],Player:[function(t,e,o){"use strict";cc._RF.push(e,"1a15dgu2eZP7YoE37Xmc9cM","Player");var i=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),n=this&&this.__decorate||function(t,e,o,i){var n,r=arguments.length,c=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0}),o.Player=void 0;var r=cc._decorator,c=r.ccclass,s=r.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.x_accel=1500,e.x_max_speed=300,e.y_v0_speed=500,e.y_max_times=2,e.bullet_speed=10,e.bullet=null,e.bullet_set=null,e.body=null,e.anim=null,e.anim_state=null,e.rigidBody=null,e.acc_left=!1,e.acc_right=!1,e.y_times=0,e}return i(e,t),e.prototype.onLoad=function(){this.anim=this.body.getComponent(cc.Animation),this.anim_state=new Set,this.rigidBody=this.body.getComponent(cc.RigidBody)},e.prototype.start=function(){},e.prototype.update=function(t){this.move_dt(t),this.play_anim_by_state()},e.prototype.init=function(){this.acc_left=!1,this.acc_right=!1,this.acc_height=!1,this.y_times=0,this.x_speed=0,this.y_speed=0,this.node.x=0,this.node.y=0,this.body.x=0,this.body.y=0,this.init_rigid_body(),console.log("init")},e.prototype.init_rigid_body=function(t){void 0===t&&(t=3),this.rigidBody.linearVelocity=cc.v2(),this.rigidBody.gravityScale=t},e.prototype.move_left=function(){this.acc_left||(this.x_speed=0),this.acc_left=!0,this.body.scaleX=-Math.abs(this.body.scaleX)},e.prototype.stop_left=function(){this.acc_left=!1},e.prototype.move_right=function(){this.acc_right||(this.x_speed=0),this.acc_right=!0,this.body.scaleX=Math.abs(this.body.scaleX)},e.prototype.stop_right=function(){this.acc_right=!1},e.prototype.jump=function(){this.y_times>=this.y_max_times||(this.acc_height=!0,this.y_speed=this.y_v0_speed,this.y_times++)},e.prototype.stop_jump=function(){this.y_speed=0,this.y_times=0,this.acc_height=!1,this.init_rigid_body(0)},e.prototype.move_dt=function(t){this.acc_left&&!this.acc_right?this.x_speed-=this.x_accel*t:this.acc_right&&!this.acc_left?this.x_speed+=this.x_accel*t:this.x_speed=0,Math.abs(this.x_speed)>this.x_max_speed&&(this.x_speed=this.x_speed>0?this.x_max_speed:-this.x_max_speed);var e=this.rigidBody.linearVelocity;e.x=this.x_speed,this.acc_height?(this.y_speed=this.y_v0_speed,e.y=this.y_speed,this.acc_height=!1):this.y_speed=e.y,e.y<1&&(this.y_times=0),this.rigidBody.linearVelocity=e,this.node.x=this.body.x,this.node.y=this.body.y},e.prototype.create_bullet=function(){var t=cc.instantiate(this.bullet);this.bullet_set.addChild(t),t.x=this.node.x,t.y=this.node.y,this.body.scaleX<0?t.getComponent("Orb").speed=-this.bullet_speed:t.getComponent("Orb").speed=this.bullet_speed},e.prototype.play_anim=function(t){void 0===t&&(t="idle"),this.anim_state[t]?this.anim_state[t].isPlaying||this.anim.play(t):this.anim_state[t]=this.anim.play(t)},e.prototype.play_anim_by_state=function(){Math.abs(this.y_speed)>1?this.play_anim(this.y_speed>1?"jump":"down"):this.acc_left||this.acc_right?this.play_anim("walk"):this.play_anim("idle")},n([s(cc.Integer)],e.prototype,"x_accel",void 0),n([s(cc.Integer)],e.prototype,"x_max_speed",void 0),n([s(cc.Integer)],e.prototype,"y_v0_speed",void 0),n([s(cc.Integer)],e.prototype,"y_max_times",void 0),n([s(cc.Integer)],e.prototype,"bullet_speed",void 0),n([s(cc.Prefab)],e.prototype,"bullet",void 0),n([s(cc.Node)],e.prototype,"bullet_set",void 0),n([s(cc.Node)],e.prototype,"body",void 0),e=n([c],e)}(cc.Component);o.Player=a,cc._RF.pop()},{}],Test:[function(t,e,o){"use strict";cc._RF.push(e,"d1f78CSPTpEwrcSNKQMZruX","Test");var i=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),n=this&&this.__decorate||function(t,e,o,i){var n,r=arguments.length,c=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(c=(r<3?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var r=cc._decorator,c=r.ccclass,s=r.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.body=null,e.x_label=null,e.y_label=null,e.vx_label=null,e.vy_label=null,e}return i(e,t),e.prototype.onLoad=function(){this._rigidBody=this.body.getComponent(cc.RigidBody)},e.prototype.update=function(t){this.x_label.string=String(Math.floor(this.body.x)),this.y_label.string=String(Math.floor(this.body.y));var e=this._rigidBody.linearVelocity;this.vx_label.string=String(Math.floor(e.x)),this.vy_label.string=String(Math.floor(e.y))},n([s(cc.Node)],e.prototype,"body",void 0),n([s(cc.Label)],e.prototype,"x_label",void 0),n([s(cc.Label)],e.prototype,"y_label",void 0),n([s(cc.Label)],e.prototype,"vx_label",void 0),n([s(cc.Label)],e.prototype,"vy_label",void 0),e=n([c],e)}(cc.Component);o.default=a,cc._RF.pop()},{}]},{},["Body","Game","Orb","Player","Test"]);