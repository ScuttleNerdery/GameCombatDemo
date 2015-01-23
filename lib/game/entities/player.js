ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
  'game.entities.abilityAnimation',
  'game.entities.whirlwindAnimation'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	entity_id: "player",
	size: {x:50, y:30},
	offset: {x:25, y:65},

	maxVel: {x: 100, y: 100},
	friction: {x: 3000, y: 3000},

	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	flip: false,
	accel: 200,
	velocity: 270, //Was 200
	health: 100,
	last_dir: "none",
  default_walking_speed: .13,
  abilities: {
    ability_1: {
      ability_key: 'ability_1',
      ability_name: '',
      type: '',
      available: true,
      active: false
    },
    ability_2: {
      ability_key: 'ability_2',
      ability_name: '',
      type: '',
      available: true,
      active: false
    },
    ability_3: {
      ability_key: 'ability_3',
      ability_name: '',
      type: '',
      available: true,
      active: false
    },
    ability_4: {
      ability_key: 'ability_4',
      ability_name: '',
      type: '',
      available: true,
      active: false
    },
    ability_5: {
      ability_key: 'ability_5',
      ability_name: '',
      type: '',
      available: true,
      active: false
    },
    ability_6: {
      ability_key: 'ability_6',
      ability_name: '',
      type: '',
      available: true,
      active: false
    }
  },
  current_ability: '',
  abilities_locked: false,

	animSheet: new ig.AnimationSheet( 'media/samurai/sprite_sheet.png', 100, 100 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [7] );
		this.addAnim( 'idle_up', 1, [1] );
		this.addAnim( 'idle_down', 1, [7] );
		this.addAnim( 'idle_x', 1, [4] );
		this.addAnim( 'move_up', this.default_walking_speed, [0,1,2,1] );
		this.addAnim( 'move_down', this.default_walking_speed, [6,7,8,7] );
		this.addAnim( 'move_x', this.default_walking_speed, [3,4,5,4] );
		this.addAnim( 'fainted', 1, [12] );

    //Add ability Animations
    //Charge
    this.addAnim( 'ability_charge_up', 1, [0] );
    this.addAnim( 'ability_charge_down', 1, [6] );
    this.addAnim( 'ability_charge_x', 1, [3] );
    //Whirlwind
    this.addAnim( 'spin', .05, [0, 3, 6, 3] );
    //Weapon Strike
    this.addAnim( 'ability_strike_up', 1, [0] );
    this.addAnim( 'ability_strike_down', 1, [6] );
    this.addAnim( 'ability_strike_x', 1, [3] );

    //Setup our characters abilities
    //Charge
    this.abilities.ability_1.ability_name = 'charge';
    this.abilities.ability_1.type = 'instant';
    this.abilities.ability_1.time = 400;
    this.abilities.ability_1.cooldown = 3000;
    this.abilities.ability_1.lock = true;
    //Whirlwind - press and hold ability
    this.abilities.ability_2.ability_name = 'whirlwind';
    this.abilities.ability_2.type = 'until_released';
    //this.abilities.ability_2.time = 5000;
    //this.abilities.ability_2.cooldown = 6000;
    this.abilities.ability_2.lock = true;
    //Teleport
    this.abilities.ability_3.ability_name = 'teleport';
    this.abilities.ability_3.type = 'instant';
    this.abilities.ability_3.time = 150;
    this.abilities.ability_3.cooldown = 3000;
    this.abilities.ability_3.lock = true;
    //Stealth
    this.abilities.ability_4.ability_name = 'stealth';
    this.abilities.ability_4.type = 'while_moving';
    this.abilities.ability_4.time = 5000;
    this.abilities.ability_4.cooldown = 15000;
    this.abilities.ability_4.lock = false;
    //Polearm swing
    this.abilities.ability_5.ability_name = 'polearm_swing';
    this.abilities.ability_5.type = 'instant';
    this.abilities.ability_5.time = 200;
    this.abilities.ability_5.cooldown = 200;
    this.abilities.ability_5.lock = true;



		//Set default position
		//this.pos.x = 629;
		//this.pos.y = 337;

	},

	update: function() {
		//move up down left right
		var accel = this.accel;
		var vel = this.velocity;
    var char_sprite = this;

    //Visible by default
    char_sprite.currentAnim.alpha = 1;
    //Normal walk speed by default
    char_sprite.anims.move_up.frameTime = this.default_walking_speed;
    char_sprite.anims.move_down.frameTime = this.default_walking_speed;
    char_sprite.anims.move_x.frameTime = this.default_walking_speed;

    //Start abilities that don't go with moving (charge, etc)
    if(ig.input.pressed('ability_1') && this.abilities.ability_1.active == false && this.abilities.ability_1.available == true && this.abilities.ability_1.type == 'instant') {
      fire_ability(this.abilities.ability_1, char_sprite, vel, accel);
    }
    else if(ig.input.pressed('ability_2') && this.abilities.ability_2.active == false && this.abilities.ability_2.available == true && this.abilities.ability_2.type == 'instant') {
      fire_ability(this.abilities.ability_2, char_sprite, vel, accel);
    }
    else if(ig.input.pressed('ability_3') && this.abilities.ability_3.active == false && this.abilities.ability_3.available == true && this.abilities.ability_3.type == 'instant') {
      fire_ability(this.abilities.ability_3, char_sprite, vel, accel);
    }
    else if(ig.input.pressed('ability_4') && this.abilities.ability_4.active == false && this.abilities.ability_4.available == true && this.abilities.ability_4.type == 'instant') {
      fire_ability(this.abilities.ability_4, char_sprite, vel, accel);
    }
    else if(ig.input.pressed('ability_5') && this.abilities.ability_5.active == false && this.abilities.ability_5.available == true && this.abilities.ability_5.type == 'instant') {
      fire_ability(this.abilities.ability_5, char_sprite, vel, accel);
    }
    else if(ig.input.pressed('ability_6') && this.abilities.ability_6.active == false && this.abilities.ability_6.available == true && this.abilities.ability_6.type == 'instant') {
      fire_ability(this.abilities.ability_6, char_sprite, vel, accel);
    }
    //Normal movement
		else if( ig.input.state('left') ) {
			//this.accel.x = -accel;
			this.vel.x = -vel;
			this.flip = false;
			this.last_dir = "left";
      this.currentAnim = this.anims.move_x;
		}
		else if( ig.input.state('right') ) {
			//this.accel.x = accel;
			this.vel.x = vel;
			this.flip = true;
			this.last_dir = "right";
      this.currentAnim = this.anims.move_x;
		}
		else if ( ig.input.state('up') ) {
			//this.accel.y = accel;
			this.vel.y = -vel;
			this.last_dir = "up";
      this.currentAnim = this.anims.move_up;
		}
		else if ( ig.input.state('down') ) {
			//this.accel.y = -accel;
			this.vel.y = vel;
			this.last_dir = "down";
      this.currentAnim = this.anims.move_down;
		}

		// set the current animation, based on the player's speed
    if ( this.vel.x == 0 && (this.last_dir == "left" || this.last_dir == "right")) {
			this.currentAnim = this.anims.idle_x;
		}
		else if ( this.vel.y == 0 && this.last_dir == "up") {
			this.currentAnim = this.anims.idle_up;
		}
		else if ( this.vel.y == 0 && this.last_dir == "down") {
			this.currentAnim = this.anims.idle_down;
		}

    //Iterate through each ability
    for (ability in this.abilities) {
      //Start abilities that can fire while moving (stealth, etc)
      if (ig.input.pressed(this.abilities[ability].ability_key) && this.abilities[ability].active == false && this.abilities[ability].available == true && this.abilities[ability].type == 'while_moving') {
        fire_ability(this.abilities[ability], char_sprite, vel, accel);
      }
      //Start abilities that fire while key held down
      if(ig.input.pressed(this.abilities[ability].ability_key) && this.abilities[ability].type == 'until_released') {
        fire_ability(this.abilities[ability], char_sprite, vel, accel);
      }
      //Stop abilities that fire while key is released
      if(ig.input.released(this.abilities[ability].ability_key) && this.abilities[ability].type == 'until_released') {
        stop_ability(this.abilities[ability], char_sprite, vel, accel);
      }
      //Continue abilities that have been fired and have a timed stop
      if (this.abilities[ability].active == true) {
        continue_ability(this.abilities[ability], char_sprite, vel, accel);
      }
    }

    this.currentAnim.flip.x = this.flip;

		// move!
		this.parent();

	},

  /*touches: function( other ) {

  }*/

});

});

/* Sets up ability times and cooldowns, etc */
function fire_ability(ability, char_sprite, vel, accel) {
  if (char_sprite.abilities_locked == false) {
    if (ability.lock == true) {
      char_sprite.abilities_locked = true;
      char_sprite.current_ability = ability.ability_name;
    }

    //Ability animation entities
    if (ability.active == false) {
      //Polearm swing
      if (ability.ability_name == 'polearm_swing') {
        if (char_sprite.last_dir == "left") {
          var polearm_swing = ig.game.spawnEntity(EntityAbilityAnimation, char_sprite.pos.x-65, char_sprite.pos.y-60, {zIndex:2, player_id: char_sprite.id});
          polearm_swing.currentAnim = polearm_swing.anims.slash_facing_x;
        }
        else if (char_sprite.last_dir == "right") {
          var polearm_swing = ig.game.spawnEntity(EntityAbilityAnimation, char_sprite.pos.x+15, char_sprite.pos.y-60, {zIndex:2, player_id: char_sprite.id});
          polearm_swing.currentAnim = polearm_swing.anims.slash_facing_x;
          polearm_swing.anims.slash_facing_x.flip.x = true;
        }
        else if (char_sprite.last_dir == "up") {
          var polearm_swing = ig.game.spawnEntity(EntityAbilityAnimation, char_sprite.pos.x-25, char_sprite.pos.y-100, {zIndex:0, player_id: char_sprite.id});
          polearm_swing.currentAnim = polearm_swing.anims.slash_facing_up;
        }
        else if (char_sprite.last_dir == "down") {
          var polearm_swing = ig.game.spawnEntity(EntityAbilityAnimation, char_sprite.pos.x-25, char_sprite.pos.y-20, {zIndex:2, player_id: char_sprite.id});
          polearm_swing.currentAnim = polearm_swing.anims.slash_facing_down;
        }
      }
      if (ability.ability_name == 'whirlwind') {
        var whirlwind = ig.game.spawnEntity(EntityWhirlwindAnimation, char_sprite.pos.x, char_sprite.pos.y, {zIndex:2, player_id: char_sprite.id});
      }
    }

    ability.active = true;
    if (ability.type == 'until_released') {

    }
    else {
      //Stop ability after time limit
      setTimeout(function(){
        ability.active = false;
        ability.available = false;
        if (char_sprite.current_ability == ability.ability_name) {
          char_sprite.current_ability = '';
        }
        char_sprite.abilities_locked = false;
      },ability.time);
      //Disable ability for cooldown period
      setTimeout(function(){
        ability.available = true;
      },ability.cooldown);
    }

    continue_ability(ability, char_sprite, vel, accel);

    //Stop velocity after teleport
    if (ability.ability_name == 'teleport') {
      setTimeout(function(){
        char_sprite.vel.x = 0;
        char_sprite.vel.y = 0;
      },ability.time);
    }
  }
}

function stop_ability(ability, char_sprite, vel, accel) {
  ability.active = false;
  ability.available = false;
  char_sprite.current_ability = '';
  char_sprite.abilities_locked = false;
}

/**
 * Handles the ability animations, movement, etc
 */
function continue_ability(ability, char_sprite, vel, accel) {
  if (ability.ability_name == 'charge') {
    //Animate for each direction
    if (char_sprite.last_dir == "left") {
      char_sprite.vel.x = -vel * 2.5;
      char_sprite.flip = false;
      char_sprite.currentAnim = char_sprite.anims.ability_charge_x;
    }
    else if (char_sprite.last_dir == "right") {
      char_sprite.vel.x = vel * 2.5;
      char_sprite.flip = true;
      char_sprite.currentAnim = char_sprite.anims.ability_charge_x;
    }
    else if (char_sprite.last_dir == "up") {
      char_sprite.vel.y = -vel * 2.5;
      char_sprite.currentAnim = char_sprite.anims.ability_charge_up;
    }
    else if (char_sprite.last_dir == "down") {
      char_sprite.vel.y = vel * 2.5;
      char_sprite.currentAnim = char_sprite.anims.ability_charge_down;
    }
  }
  if (ability.ability_name == 'teleport') {
    //Animate for each direction
    char_sprite.currentAnim.alpha = 0;
    if (char_sprite.last_dir == "left") {
      char_sprite.vel.x = -vel * 7;
      char_sprite.flip = false;
    }
    else if (char_sprite.last_dir == "right") {
      char_sprite.vel.x = vel * 7;
      char_sprite.flip = true;
    }
    else if (char_sprite.last_dir == "up") {
      char_sprite.vel.y = -vel * 7;
    }
    else if (char_sprite.last_dir == "down") {
      char_sprite.vel.y = vel * 7;
    }
  }
  if (ability.ability_name == 'whirlwind') {
    char_sprite.currentAnim = char_sprite.anims.spin;
    char_sprite.currentAnim.alpha = .5;
    char_sprite.vel.x = char_sprite.vel.x * .5;
    char_sprite.vel.y = char_sprite.vel.y * .5;
  }
  if (ability.ability_name == 'stealth') {
    char_sprite.currentAnim.alpha = .4;
    char_sprite.vel.x = char_sprite.vel.x * .7;
    char_sprite.vel.y = char_sprite.vel.y * .7;
    char_sprite.anims.move_up.frameTime = .23;
    char_sprite.anims.move_down.frameTime = .23;
    char_sprite.anims.move_x.frameTime = .23;
  }
}
