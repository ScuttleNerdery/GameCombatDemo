ig.module(
	'game.entities.animatedNPCRanger'
)
.requires(
	'game.entities.animatedNPC'
)
.defines(function(){

EntityAnimatedNPCRanger = EntityAnimatedNPC.extend({
	
	animSheet: new ig.AnimationSheet( 'media/ranger/sprite_sheet.png', 100, 100 ),
	
});

});