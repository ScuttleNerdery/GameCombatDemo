ig.module(
	'game.entities.groundedSign1'
)
.requires(
	'impact.entity',
	'game.entities.thoughtBox'
)
.defines(function(){

EntityGroundedSign1 = ig.Entity.extend({
	
	size: {x:55, y:39},
	offset: {x:10, y:40},
	
	message: {},
	
	
	//type: ig.Entity.TYPE.B, // Other group
	//checkAgainst: ig.Entity.TYPE.NONE,
	//collides: ig.Entity.COLLIDES.FIXED,
	
	type: ig.Entity.TYPE.B, // Needs to be checked against player
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/signs/sign_post.png', 65, 79 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		this.currentAnim = this.anims.idle;
	},
	
	check: function(other) {
		//if colliding with player
		if (other.entity_id == "player") {
			//Check if player is trying to talk with NPC
			if( ig.input.pressed('space') ) {
				//Set message text position based on entity
				var mess_text_pos_x = (other.pos.x - ig.game.screen.x - 65);
				var mess_text_pos_y = (other.pos.y - ig.game.screen.y - other.size.y - other.offset.y - 75);
				var mess_text_pos = {x: mess_text_pos_x, y: mess_text_pos_y};
				
				//Then message box
				var mess_box_pos_x = (other.pos.x - 92);
				var mess_box_pos_y = (other.pos.y - other.size.y - other.offset.y - 102);
				var mess_box_pos = {x: mess_box_pos_x, y: mess_box_pos_y};
				
				//Spawn the message
				var font_settings = {message: this.message, text_pos: mess_text_pos, pos: mess_box_pos};
				ig.game.spawnEntity(EntityThoughtBox, other.pos.x, other.pos.y, font_settings);
				
			}
		}
	}
	
});

});