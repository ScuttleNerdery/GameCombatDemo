ig.module(
	'game.entities.animatedNPCDragonWarrior'
)
.requires(
	'game.entities.animatedNPC'
)
.defines(function(){

EntityAnimatedNPCDragonWarrior = EntityAnimatedNPC.extend({
	
	animSheet: new ig.AnimationSheet( 'media/dragon_warrior/sprite_sheet.png', 100, 100 ),
	
});

});