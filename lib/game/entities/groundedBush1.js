ig.module(
	'game.entities.groundedBush1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedBush1 = ig.Entity.extend({
	
	size: {x:86, y:32},
	offset: {x:5, y:40},
	
	moving: false,
	move_count: 0,
	max_move_count: 40,
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/bushes/bush1_animated.png', 96, 82 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'shake', .05, [0,1,2,3,4] );
		
		this.currentAnim = this.anims.idle;		
	},
	
	update: function() {
		var rand_num = Math.random()*1000;
		if ((rand_num < 1 && this.moving === false) || (this.moving === true && this.move_count <= this.max_move_count)) {
			this.currentAnim = this.anims.shake;
			this.moving = true;
			this.move_count++;
		}
		//Reset move count
		if (this.move_count > this.max_move_count) {
			this.currentAnim = this.anims.idle;
			this.move_count = 0;
			this.moving = false;
		}
		
		// move!
		this.parent();
	}
	
});

});