ig.module(
	'game.entities.groundedLeaves1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedLeaves1 = ig.Entity.extend({
	
	size: {x:20, y:168},
	offset: {x:0, y:0},
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/trees/leaves1.png', 20, 168 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'drop_leaves', .15, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0] );
		
		//this.currentAnim = this.anims.idle;
		this.currentAnim = this.anims.drop_leaves;
	},
	
	update: function() {
		var frame_count = (this.currentAnim.sequence.length - 1);
		if (this.currentAnim.frame == frame_count) {
			this.kill();
		}
		
		// move!
		this.parent();
	}
	
});

});