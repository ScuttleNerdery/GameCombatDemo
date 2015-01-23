ig.module(
	'game.entities.groundedTree1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedTree1 = ig.Entity.extend({
	
	size: {x:216, y:45},
	offset: {x:70, y:265},
	
	moving: false,
	move_count: 0,
	//max_move_count: 100,	
	
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,
	
	animSheet: new ig.AnimationSheet( 'media/trees/first_tree_animated2.png', 346, 345 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'lean_left', .3, [0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0], true );
		
		this.currentAnim = this.anims.idle;
		//this.currentAnim = this.anims.lean_left;
	},
	
	update: function() {
		//Start animation randomly
		var frame_count = (this.currentAnim.sequence.length - 1);
		if (this.currentAnim.frame == 0 || this.currentAnim.frame == frame_count) {
			var rand_num = Math.random()*1000;
			if (rand_num < 1) {
				this.currentAnim = this.anims.lean_left.rewind();
			}
		}
		
		// move!
		this.parent();
	}
	
});

});