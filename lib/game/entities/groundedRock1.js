ig.module(
	'game.entities.groundedRock1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedRock1 = ig.Entity.extend({
	
	size: {x:55, y:30},
	offset: {x:5, y:30},
	
	moving: false,
	move_count: 0,
	max_move_count: 40,
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/rocks/rock.png', 60, 60 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		this.currentAnim = this.anims.idle;		
	}
	
});

});