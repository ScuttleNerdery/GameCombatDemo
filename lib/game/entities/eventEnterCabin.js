ig.module(
	'game.entities.eventEnterCabin'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEventEnterCabin = ig.Entity.extend({
	
	size: {x:100, y:50},
	//offset: {x:70, y:265},
	
	
	type: ig.Entity.TYPE.B, // Needs to be checked against player
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	//animSheet: new ig.AnimationSheet( 'media/trees/first_tree.png', 346, 345 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//this.addAnim( 'idle', 1, [0] );
		
		//this.currentAnim = this.anims.idle;
	},
	
	check: function(other) {
		//alert("Entering cabin!!");
	}
	
});

});