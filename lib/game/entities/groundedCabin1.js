ig.module(
	'game.entities.groundedCabin1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedCabin1 = ig.Entity.extend({
	
	size: {x:300, y:100},
	offset: {x:150, y:150},
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/buildings/cabin.png', 600, 450 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		this.currentAnim = this.anims.idle;
	}
	
});

});