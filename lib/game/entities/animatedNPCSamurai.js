ig.module(
	'game.entities.animatedNPCSamurai'
)
.requires(
	'game.entities.animatedNPC'
)
.defines(function(){

EntityAnimatedNPCSamurai = EntityAnimatedNPC.extend({
	
	animSheet: new ig.AnimationSheet( 'media/samurai/sprite_sheet.png', 100, 100 ),
	
});

});