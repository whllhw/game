window.__require=function t(e,s,i){function a(c,o){if(!s[c]){if(!e[c]){var h=c.split("/");if(h=h[h.length-1],!e[h]){var l="function"==typeof __require&&__require;if(!o&&l)return l(h,!0);if(n)return n(h,!0);throw new Error("Cannot find module '"+c+"'")}c=h}var _=s[c]={exports:{}};e[c][0].call(_.exports,function(t){return a(e[c][1][t]||t)},_,_.exports,t,e,s,i)}return s[c].exports}for(var n="function"==typeof __require&&__require,c=0;c<i.length;c++)a(i[c]);return a}({Body:[function(t,e,s){"use strict";cc._RF.push(e,"91e490pCoFFOZEgR3HmjQrW","Body"),cc.Class({extends:cc.Component,properties:{game_node:{type:cc.Node,default:null}},onLoad:function(){this.game=this.game_node.getComponent("Game"),this.player=this.node.parent.getComponent("Player")},start:function(){},onCollisionEnter:function(t,e){"sting"===t.node.name&&this.game.game_over(),"wall"===t.node.name&&this.player.stop_jump()},onCollisionExit:function(t,e){"wall"===t.node.name&&this.player.fall_down()}}),cc._RF.pop()},{}],Game:[function(t,e,s){"use strict";cc._RF.push(e,"280c3rsZJJKnZ9RqbALVwtK","Game"),cc.Class({extends:cc.Component,properties:{game_over_node:{type:cc.Node,default:null},player_node:{type:cc.Node,default:null}},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.player=this.player_node.getComponent("Player")},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:"playing"===this.game_state&&this.player.move_left();break;case cc.macro.KEY.d:case cc.macro.KEY.right:"playing"===this.game_state&&this.player.move_right();break;case cc.macro.KEY.space:"playing"===this.game_state&&this.player.jump();break;case cc.macro.KEY.shift:"playing"===this.game_state&&this.player.create_bullet();break;case cc.macro.KEY.r:this.game_start()}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:this.player.stop_left();break;case cc.macro.KEY.d:case cc.macro.KEY.right:this.player.stop_right()}},start:function(){this.game_start(),cc.director.getCollisionManager().enabled=!0},game_start:function(){this.game_over_node.active=!1,this.player.init(),this.game_state="playing"},game_over:function(){this.game_over_node.x=0,this.game_over_node.y=0,this.game_over_node.active=!0,this.game_state="dead",this.player.stop_right(),this.player.stop_left(),this.player.stop_jump()}}),cc._RF.pop()},{}],Orb:[function(t,e,s){"use strict";cc._RF.push(e,"1f94aATYP9BJbqeaeLdXf0l","Orb"),cc.Class({extends:cc.Component,properties:{speed:0},onLoad:function(){},start:function(){},check:function(){},update:function(t){this.node.x+=this.speed},onCollisionEnter:function(t,e){this.node.active=!1}}),cc._RF.pop()},{}],Player:[function(t,e,s){"use strict";cc._RF.push(e,"1b469ktLplEsol+L1GrjyJM","Player"),cc.Class({extends:cc.Component,properties:{x_max_speed:20,y_accel:10,y_vo_speed:100,y_max_speed:20,y_max_times:2,bullet_speed:10,bullet:{default:null,type:cc.Prefab},bullet_set:{default:null,type:cc.Node}},onLoad:function(){this.body=this.node.getChildByName("body"),this.anim=this.body.getComponent(cc.Animation),this.anim_state={}},move_left:function(){this.acc_left||(this.x_speed=0),this.acc_left=!0,this.body.scaleX=-Math.abs(this.body.scaleX)},stop_left:function(){this.acc_left=!1},move_right:function(){this.acc_right||(this.x_speed=0),this.acc_right=!0,this.body.scaleX=Math.abs(this.body.scaleX)},stop_right:function(){this.acc_right=!1},jump:function(){this.y_times>=this.y_max_times||(this.acc_height=!0,this.y_speed=this.y_vo_speed,this.y_times++)},stop_jump:function(){this.y_speed=0,this.y_times=0,this.acc_height=!1},fall_down:function(){this.acc_height||(this.y_speed=0,this.y_times=0,this.acc_height=!0)},create_bullet:function(){var t=cc.instantiate(this.bullet);this.bullet_set.addChild(t),t.x=this.node.x,t.y=this.node.y,this.body.scaleX<0?t.getComponent("Orb").speed=-this.bullet_speed:t.getComponent("Orb").speed=this.bullet_speed},init:function(){this.acc_left=!1,this.acc_right=!1,this.acc_height=!0,this.y_times=0,this.x_speed=0,this.y_speed=0,this.node.x=0,this.node.y=0,console.log("init")},play_anim:function(t){void 0===t&&(t="idle"),this.anim_state[t]?this.anim_state[t].isPlaying||this.anim.play(t):this.anim_state[t]=this.anim.play(t)},play_anim_by_state:function(){this.acc_height?this.play_anim(this.y_speed>0?"jump":"down"):this.acc_left||this.acc_right?this.play_anim("walk"):this.play_anim("idle")},move_dt:function(t){this.acc_left&&!this.acc_right?this.x_speed=-this.x_max_speed:this.acc_right&&!this.acc_left?this.x_speed=this.x_max_speed:this.x_speed=0,Math.abs(this.x_speed)>this.x_max_speed&&(this.x_speed=this.x_speed>0?this.x_max_speed:-this.x_max_speed),this.node.x+=this.x_speed,this.node.x>this.node.parent.width/2?this.node.x=this.node.parent.width/2:this.node.x<-this.node.parent.width/2&&(this.node.x=-this.node.parent.width/2)},jump_dt:function(t){this.acc_height&&(this.y_speed-=this.y_accel*t,Math.abs(this.y_speed)>this.y_max_speed?this.node.y+=this.y_speed>0?this.y_max_speed:-this.y_max_speed:this.node.y+=this.y_speed)},start:function(){},update:function(t){this.move_dt(t),this.jump_dt(t),this.play_anim_by_state()}}),cc._RF.pop()},{}],Test:[function(t,e,s){"use strict";cc._RF.push(e,"4a6e60UpY1IeLB78HQDcLLt","Test"),cc.Class({extends:cc.Component,properties:{player:{default:null,type:cc.Node},x_label:{type:cc.Label,default:null},y_label:{type:cc.Label,default:null},vx_label:{type:cc.Label,default:null},vy_label:{type:cc.Label,default:null}},onLoad:function(){this.last_x=this.player.x,this.last_y=this.player.y},start:function(){},update:function(t){this.x_label.string=Math.floor(this.player.x),this.y_label.string=Math.floor(this.player.y),this.vx_label.string=Math.floor(this.player.x-this.last_x),this.vy_label.string=Math.floor(this.player.y-this.last_y),this.last_x=this.player.x,this.last_y=this.player.y}}),cc._RF.pop()},{}]},{},["Body","Game","Orb","Player","Test"]);