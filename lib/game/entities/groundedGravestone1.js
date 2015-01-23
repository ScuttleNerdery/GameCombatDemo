ig.module(
	'game.entities.groundedGravestone1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedGravestone1 = ig.Entity.extend({
	
	size: {x:65, y:35},
	offset: {x:0, y:35},
	
	moving: false,
	move_count: 0,
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/graves/gravestone1.png', 65, 70 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		this.currentAnim = this.anims.idle;
	}
	
});

});