ig.module(
	'game.entities.groundedDeadTree2'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedDeadTree2 = ig.Entity.extend({
	
	size: {x:83, y:30},
	offset: {x:20, y:130},
	
	moving: false,
	move_count: 0,
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/trees/dead_mini_tree2.png', 123, 160 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		this.currentAnim = this.anims.idle;
	}
	
});

});