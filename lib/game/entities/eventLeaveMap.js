ig.module(
	'game.entities.eventLeaveMap'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEventLeaveMap = ig.Entity.extend({
	
	size: {x:500, y:50},
	
	type: ig.Entity.TYPE.B, // Needs to be checked against player
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
		
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	
	check: function(other) {
		if (other.entity_id == "player") {
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];
			//Determine which leaving entity
			if (this.name == "leavingJapan1NE") {
				ig.game.loadJapan2(6465, 2977, "idle_up");
			}
			else if (this.name == "leavingJapan2SE") {
				ig.game.loadJapan1(6859, 144, "idle_down");
			}
		}
	}
	
});

});