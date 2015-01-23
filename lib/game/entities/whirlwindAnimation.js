ig.module(
	'game.entities.whirlwindAnimation'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityWhirlwindAnimation = ig.Entity.extend({

  entity_id: "whirlwind_ability",
  entity_type: "ability_animation",
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	zIndex: 2,
	pos: {x: 0, y: 0},
  kill_time: 100,
	size: {x:200, y:200},
  offset: {x:0, y:40},

	animSheet: new ig.AnimationSheet( 'media/ability_sprites/whirlwind.png?1', 200, 200 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

    this.addAnim( 'whirlwind', .03, [0,1,2,3] );

		this.currentAnim = this.anims.whirlwind;
	},

	update: function() {
    this.currentAnim.alpha = .7;
    //Make sure animation keeps up with player
    var parent_player = ig.game.getEntitiesById( EntityPlayer, this.player_id )[0];
    this.pos.x = parent_player.pos.x - (this.size.x/2) + (parent_player.size.x/2);
    this.pos.y = parent_player.pos.y - (this.size.y/2) + (parent_player.size.y/2);

    //Kill sprite if not using ability again
    if (parent_player.current_ability != 'whirlwind') {
      this.kill();
    }

    this.parent();
  }

	});

});
