ig.module(
	'game.entities.groundedBrklnBuilding1Stairs'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedBrklnBuilding1Stairs = ig.Entity.extend({

	size: {x:240, y:256},
	offset: {x:0, y:0},

	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,

	animSheet: new ig.AnimationSheet( 'media/buildings/brooklyn_building1stairs.png', 246, 271 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );

		this.currentAnim = this.anims.idle;
	}

});

});
