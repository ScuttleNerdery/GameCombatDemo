ig.module(
	'game.entities.animatedNPCNinja'
)
.requires(
	'game.entities.animatedNPC'
)
.defines(function(){

EntityAnimatedNPCNinja = EntityAnimatedNPC.extend({
	
	animSheet: new ig.AnimationSheet( 'media/ninja/sprite_sheet.png', 100, 100 ),
	
});

});