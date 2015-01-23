ig.module(
	'game.entities.groundedBrklnBuilding1'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGroundedBrklnBuilding1 = ig.Entity.extend({

	size: {x:557, y:525},
	offset: {x:0, y:200},

	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,

	animSheet: new ig.AnimationSheet( 'media/buildings/brooklyn_building1.png', 557, 775 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );

		this.currentAnim = this.anims.idle;
	}

});

});
