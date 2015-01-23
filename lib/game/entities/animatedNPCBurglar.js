ig.module(
	'game.entities.animatedNPCBurglar'
)
.requires(
	'game.entities.animatedNPC'
)
.defines(function(){

EntityAnimatedNPCBurglar = EntityAnimatedNPC.extend({
	
	animSheet: new ig.AnimationSheet( 'media/cut_throat/sprite_sheet.png', 100, 100 ),
	
});

});