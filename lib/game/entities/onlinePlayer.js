ig.module(
	'game.entities.onlinePlayer'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityOnlinePlayer = ig.Entity.extend({

	size: {x:90, y:50},
	offset: {x:5, y:65},

	maxVel: {x: 100, y: 100},
	friction: {x: 1000, y: 1000},
  pos: {x: 0, y: 0},

	type: ig.Entity.TYPE.B, // Needs to be checked against player
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	flip: false,
	accel: 200,
	velocity: 100,
	health: 100,
	last_dir: "vert",
	moving: false,
	move_count: 0,
	max_move_count: 40,
	can_move: true,

	animSheet: new ig.AnimationSheet( 'media/dragon_warrior/sprite_sheet.png', 100, 100 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [7] );

    this.currentAnim = this.anims.idle;

		//Set default position
		//this.pos.x = 800;
		//this.pos.y = 1150;

	},

	update: function() {

    var this_online_player = this;

		// move!
		this.parent();

	}

});

});
