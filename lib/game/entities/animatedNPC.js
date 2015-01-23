ig.module(
	'game.entities.animatedNPC'
)
.requires(
	'impact.entity',
	'game.entities.messageBox'
)
.defines(function(){

EntityAnimatedNPC = ig.Entity.extend({

	size: {x:90, y:50},
	offset: {x:5, y:65},

	maxVel: {x: 100, y: 100},
	friction: {x: 1000, y: 1000},

	type: ig.Entity.TYPE.B, // Needs to be checked against player
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	flip: false,
	accel: 200,
	velocity: 100,
	health: 100,
	last_dir: "vert",
	moving: false,
	move_count: 0,
	max_move_count: 40,
	can_move: true,
	message: {},

	animSheet: new ig.AnimationSheet( 'media/dragon_warrior/sprite_sheet.png', 100, 100 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [7] );
		this.addAnim( 'idle_up', 1, [1] );
		this.addAnim( 'idle_down', 1, [7] );
		this.addAnim( 'idle_x', 1, [4] );
		this.addAnim( 'move_up', 0.17, [0,1,2,1] );
		this.addAnim( 'move_down', 0.17, [6,7,8,7] );
		this.addAnim( 'move_x', 0.2, [3,4,5,4] );
    this.addAnim( 'fainted', 1, [12] );
    this.addAnim( 'exausted', 1, [9] );

		//Set default position
		//this.pos.x = 800;
		//this.pos.y = 1150;

		//No talk text by default
		this.message = "";

	},

	update: function() {

    //NPC should only respond if not dead
    if (this.health > 0 && this.health < 25) {
      this.currentAnim = this.anims.exausted;
    }
    else if (this.health > 0) {

  		//move up down left right
  		var accel = this.accel;
  		var vel = this.velocity;

  		//Move NPC randomly
  		if (this.can_move == true) {
  			var rand_num = Math.random()*700;
  			if ((rand_num < 1 && this.moving === false && this.last_dir != "left") || (this.last_dir == "left" && this.moving === true && this.move_count <= this.max_move_count)) {
  				this.vel.x = -vel;
  				this.flip = false;
  				this.last_dir = "left";
  				this.moving = true;
  				this.move_count++;
  			}
  			else if ((rand_num >= 1 && rand_num < 2 && this.moving === false && this.last_dir != "right") || (this.last_dir == "right" && this.moving === true && this.move_count <= this.max_move_count)) {
  				this.vel.x = vel;
  				this.flip = true;
  				this.last_dir = "right";
  				this.moving = true;
  				this.move_count++;
  			}
  			else if ((rand_num >= 2 && rand_num < 3 && this.moving === false && this.last_dir != "up") || (this.last_dir == "up" && this.moving === true && this.move_count <= this.max_move_count)) {
  				this.vel.y = -vel;
  				this.last_dir = "up";
  				this.moving = true;
  				this.move_count++;
  			}
  			else if ((rand_num >= 3 && rand_num < 4 && this.moving === false && this.last_dir != "down") || (this.last_dir == "down" && this.moving === true && this.move_count <= this.max_move_count)) {
  				this.vel.y = vel;
  				this.last_dir = "down";
  				this.moving = true;
  				this.move_count++;
  			}

  			//Reset move count
  			if (this.move_count > this.max_move_count) {
  				this.move_count = 0;
  				this.moving = false;
  			}
  		}

  		//If player is moving, npc can move again (only needs to be paused while in conversation)
  		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
  		if( player.vel.x != 0 || player.vel.y != 0 ) {
  			this.can_move = true;
  		}

  		// set the current animation, based on the player's speed
  		if( this.vel.x != 0 ) {
  			this.currentAnim = this.anims.move_x;
  		}
  		else if( this.vel.y > 0 ) {
  			this.currentAnim = this.anims.move_down;
  		}
  		else if( this.vel.y < 0 ) {
  			this.currentAnim = this.anims.move_up;
  		}
  		else if ( this.vel.x == 0 && (this.last_dir == "left" || this.last_dir == "right")) {
  			this.currentAnim = this.anims.idle_x;
  		}
  		else if ( this.vel.y == 0 && this.last_dir == "up") {
  			this.currentAnim = this.anims.idle_up;
  		}
  		else {
  			this.currentAnim = this.anims.idle_down;
  		}

  		this.currentAnim.flip.x = this.flip;

  		// move!
  		this.parent();

    }
	},

	check: function(other) {
		//If collision, don't keep trying to move through it..
		this.move_count = 0;
		this.moving = false;
		//if colliding with player
		if (other.entity_id == "player") {
			//Check if player is trying to talk with NPC
			if( ig.input.pressed('space') ) {
				//Set message text position based on entity
				var mess_text_pos_x = (this.pos.x - ig.game.screen.x);
				var mess_text_pos_y = (this.pos.y - ig.game.screen.y - this.size.y - this.offset.y - 50);
				var mess_text_pos = {x: mess_text_pos_x, y: mess_text_pos_y};

				//Then message box
				var mess_box_pos_x = (this.pos.x - 22);
				var mess_box_pos_y = (this.pos.y - this.size.y - this.offset.y - 72);
				var mess_box_pos = {x: mess_box_pos_x, y: mess_box_pos_y};

				//Stop this npc from moving
				this.can_move = false;

				//Turn npc to face players direction
				if (other.pos.y < this.pos.y && other.last_dir == "down") {
					this.last_dir = "up";
				}
				else if (other.pos.y > this.pos.y && other.last_dir == "up") {
					this.last_dir = "down";
				}
				else if (other.pos.x < this.pos.x && other.last_dir == "right") {
					this.flip = false;
					this.last_dir = "left";
				}
				else if (other.pos.x > this.pos.x && other.last_dir == "left") {
					this.flip = true;
					this.last_dir = "right";
				}

				//Spawn the message
				var font_settings = {message: this.message, text_pos: mess_text_pos, pos: mess_box_pos};
				ig.game.spawnEntity(EntityMessageBox, this.pos.x, this.pos.y, font_settings);

			}
      //Check if player is attacking
      //console.log(other);
      if (other.current_ability == 'whirlwind') {
        this.receiveDamage( .5, other );
      }
      if (other.current_ability == 'charge') {
        this.receiveDamage( 5, other );
      }
		}
    //If colliding with ability animation
    if (other.entity_type == "ability_animation") {
      //This ability is for testing purposes
      if (other.entity_id == "default_ability") {
        this.receiveDamage( 2, other );
      }
    }
	},

  kill: function() {
    this.currentAnim = this.anims.fainted;
    this_entity = this;
    //Destory entity after 15 seconds
    setTimeout(function(){
      ig.game.removeEntity( this_entity );
    },15000);
  }

});

});
