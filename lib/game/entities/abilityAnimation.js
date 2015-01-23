ig.module(
	'game.entities.abilityAnimation'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityAbilityAnimation = ig.Entity.extend({

  entity_id: "default_ability",
  entity_type: "ability_animation",
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	zIndex: 2,
	pos: {x: 0, y: 0},
  kill_time: 100,
	size: {x:100, y:100},

	animSheet: new ig.AnimationSheet( 'media/weapon_sprites/polearm_swing_sprite.png', 100, 100 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [9] );
    this.addAnim( 'slash_facing_up', .02, [8,7,6], true );
    this.addAnim( 'slash_facing_down', .02, [3,4,5], true );
    this.addAnim( 'slash_facing_x', .02, [0,1,2], true );

		this.currentAnim = this.anims.idle;
	},

	update: function() {
    this.currentAnim.alpha = .7;
    //Make sure animation keeps up with player
    var parent_player = ig.game.getEntitiesById( EntityPlayer, this.player_id )[0];
    if (parent_player.last_dir == "left") {
      this.pos.x = parent_player.pos.x - (parent_player.size.x/2) - (this.size.x/2);
      this.pos.y = parent_player.pos.y - (parent_player.size.y/2) - (this.size.y/2);
    }
    else if (parent_player.last_dir == "right") {
      this.pos.x = parent_player.pos.x + (parent_player.size.x/2);
      this.pos.y = parent_player.pos.y - (parent_player.size.y/2) - (this.size.y/2);
    }
    else if (parent_player.last_dir == "up") {
      this.pos.x = parent_player.pos.x - (parent_player.size.x/2);
      this.pos.y = parent_player.pos.y - (parent_player.size.y/2) - (this.size.y/2) - (parent_player.size.y/2);
    }
    else if (parent_player.last_dir == "down") {
      this.pos.x = parent_player.pos.x - (parent_player.size.x/2);
      this.pos.y = parent_player.pos.y - (parent_player.size.y/2);
    }

    //Kill after animation is done
    this_anim = this;
    setTimeout(function(){
      this_anim.kill();
    },this_anim.kill_time);
    this.parent();
  }

	});

});
