ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',

	'game.levels.japan',
	'game.levels.japan2',

	'plugins.map-size'
)
.defines(function(){

/* Custom sort method to use both pos.y and zindex (just in case we want to show something on top of everything) */
ig.Game.SORT.POS_YZ = function( a, b ){
	if (a.zIndex != b.zIndex) {
		return a.zIndex - b.zIndex;
	}
	else {
		return a.pos.y - b.pos.y;
	}
}

MyGame = ig.Game.extend({

	 autoSort: true,
   sortBy: ig.Game.SORT.POS_YZ,
   levelMusic: new ig.Sound('media/music/eucharist.*'),
   levelNatureAmbience: new ig.Sound('media/sounds/Nature.*'),
   levelPondAmbience: new ig.Sound('media/sounds/Pond.*'),
   currentLevel: "japan",

	init: function() {

		var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

		if (is_chrome) {

			//Assign key bindings
			ig.input.bind( ig.KEY.A, 'left' );
			ig.input.bind( ig.KEY.D, 'right' );
			ig.input.bind( ig.KEY.W, 'up' );
			ig.input.bind( ig.KEY.S, 'down' );
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			ig.input.bind( ig.KEY.UP_ARROW, 'up' );
			ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
			ig.input.bind( ig.KEY.SPACE, 'space' );

      //Ability keys
      ig.input.bind( ig.KEY.J, 'ability_1' );
      ig.input.bind( ig.KEY.U, 'ability_2' );
      ig.input.bind( ig.KEY.K, 'ability_3' );
      ig.input.bind( ig.KEY.I, 'ability_4' );
      ig.input.bind( ig.KEY.L, 'ability_5' );
      ig.input.bind( ig.KEY.O, 'ability_6' );

			//Music default
			ig.music.volume = 0.8;
			ig.music.loop;

			if (getParameterByName("level").length > 0) {
				this.currentLevel = getParameterByName("level");
			}

			//Load japan 2
			if (this.currentLevel == "japan2") {
				this.loadJapan2(6465, 2977, "idle_up");
			}
			//Load japan 1
			else {
				this.loadJapan1(629, 337, "fainted");
			}

		}
		else {
			alert("You must use google chrome to play this demo. :)");
		}

	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		// screen follows the player - stops when reaching edges
		var player = this.getEntitiesByType( EntityPlayer )[0];
		var map_height = this.backgroundMaps[0].pxHeight;
		var map_width = this.backgroundMaps[0].pxWidth;
		if( player ) {
			if (player.pos.x > (ig.system.width/2 - player.size.x/2) && player.pos.x < (map_width - ig.system.width/2 - player.size.x/2)) {
				this.screen.x = player.pos.x - ig.system.width/2 + player.size.x/2;
			}
			if (player.pos.y > (ig.system.height/2 - player.size.y/2) && player.pos.y < (map_height - ig.system.height/2 - player.size.y/2)) {
				this.screen.y = player.pos.y - ig.system.height/2 + player.size.y/2;
			}
		}

		//Play river sounds when near river and nature when not near river
		//Japan 2
		if (this.currentLevel == "japan2") {
			this.updateJapan2(player);
		}
		//Japan 1
		else {
			this.updateJapan1(player);
		}

	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},

	//All level loads

	loadJapan1: function(player_x, player_y, start_anim) {
		//Load music
		ig.music.add(this.levelMusic);
		ig.music.play();
		//Play nature ambience
		ig.musicSecondary = new ig.Music();
		ig.musicSecondary.volume = 0.1;
		ig.musicSecondary.loop;
		ig.musicSecondary.add(this.levelNatureAmbience, "Nature");
		ig.musicSecondary.play();
		//Setup river ambience to be ready when near river
		ig.musicTertiary = new ig.Music();
		ig.musicTertiary.volume = 0.0;
		ig.musicTertiary.loop;
		ig.musicTertiary.add(this.levelPondAmbience, "Pond");
		//ig.musicTertiary.play();
		//Load animated background tiles for level
		var bg = new ig.AnimationSheet( 'media/animated_water_tileset.png', 75, 75 );
		this.backgroundAnims = {
    		'media/grass_tileset.png': {
        		9: new ig.Animation( bg, 0.15, [0,1,2,3,3,3,2,1,0,0] ), //Water down animation
        		16: new ig.Animation( bg, 0.15, [4,5,6,7,7,7,6,5,4,4] ), //Water right animation
        		18: new ig.Animation( bg, 0.15, [8,9,10,11,11,11,10,9,8,8] ), //Water left animation
        		35: new ig.Animation( bg, 0.15, [15,15,14,13,12,12,12,13,14,15] ), //Lily 1 animation
        		36: new ig.Animation( bg, 0.15, [19,18,17,16,16,16,17,18,19,19] ), //Lily 2 animation
        		27: new ig.Animation( bg, 0.15, [22,21,20,20,20,21,22,23,23,23] ), //Lily 3 animation
        		28: new ig.Animation( bg, 0.15, [25,24,24,24,25,26,27,27,27,26] ), //Lily 4 animation
        		38: new ig.Animation( bg, 0.15, [29,28,28,28,29,30,31,31,31,30] ), //Logs animation (top half)
        		46: new ig.Animation( bg, 0.15, [33,32,32,32,33,34,35,35,35,34] ), //Logs animation (bottom half)
        		37: new ig.Animation( bg, 0.15, [37,36,36,36,37,38,39,39,39,38] ) //Mini log animation
    		}
		};
		//Load level
		this.loadLevel( LevelJapan );
		//Set NPC converation
		var burglar = this.getEntitiesByType( EntityAnimatedNPCBurglar )[0];
		burglar.message = {0:"I walk a path that lives by",1:"the knife. Watch out! I'll slash",2:"before you realize."};
		var ninja = this.getEntitiesByType( EntityAnimatedNPCNinja )[0];
		ninja.message = {0:"I move through the night in",1:"silence. I am aided by the",2:"darkness as I strike."};
		var dragon_warrior = this.getEntitiesByType( EntityAnimatedNPCDragonWarrior )[0];
		dragon_warrior.message = {0:"Soaring through the sky, my",1:"enemies feel the might of the",2:"wind and the wrath of fire!"};
		var ranger = this.getEntitiesByType( EntityAnimatedNPCRanger )[0];
		ranger.message = {0:"Every arrow I let loose has",1:"a destiny...usually straight",2:"through the heart."};
		//Set sign messages
		var signs = this.getEntitiesByType( EntityGroundedSign1 );
		signs[0].message = {0:"North: Seaside Village",1:"West: Forest of Dreams"};
		signs[1].message = {0:"Lake Tranquility",1:"A place of peace.",2:"No troublemakers allowed!!"};
		//Start this level out fainted
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if (start_anim == "fainted") {
			player.currentAnim = player.anims.fainted;
		}
		else {
			player.currentAnim = player.anims.idle_down;
		}
		player.pos.x = player_x;
		player.pos.y = player_y;
		//Set current level for update method
		this.currentLevel = "japan";
	},

	loadJapan2: function(player_x, player_y, start_anim) {
		//Load music
		ig.music.add(this.levelMusic);
		ig.music.play();
		//Play nature ambience
		ig.musicSecondary = new ig.Music();
		ig.musicSecondary.volume = 0.1;
		ig.musicSecondary.loop;
		ig.musicSecondary.add(this.levelNatureAmbience, "Nature");
		ig.musicSecondary.play();
		//Setup river ambience to be ready when near river
		ig.musicTertiary = new ig.Music();
		ig.musicTertiary.volume = 0.0;
		ig.musicTertiary.loop;
		ig.musicTertiary.add(this.levelPondAmbience, "Pond");
		//ig.musicTertiary.play();
		//Load animated background tiles for level
		var bg = new ig.AnimationSheet( 'media/animated_water_tileset.png', 75, 75 );
		this.backgroundAnims = {
    		'media/grass_tileset.png': {
        		9: new ig.Animation( bg, 0.15, [0,1,2,3,3,3,2,1,0,0] ), //Water down animation
        		16: new ig.Animation( bg, 0.15, [4,5,6,7,7,7,6,5,4,4] ), //Water right animation
        		18: new ig.Animation( bg, 0.15, [8,9,10,11,11,11,10,9,8,8] ), //Water left animation
        		35: new ig.Animation( bg, 0.15, [15,15,14,13,12,12,12,13,14,15] ), //Lily 1 animation
        		36: new ig.Animation( bg, 0.15, [19,18,17,16,16,16,17,18,19,19] ), //Lily 2 animation
        		27: new ig.Animation( bg, 0.15, [22,21,20,20,20,21,22,23,23,23] ), //Lily 3 animation
        		28: new ig.Animation( bg, 0.15, [25,24,24,24,25,26,27,27,27,26] ), //Lily 4 animation
        		38: new ig.Animation( bg, 0.15, [29,28,28,28,29,30,31,31,31,30] ), //Logs animation (top half)
        		46: new ig.Animation( bg, 0.15, [33,32,32,32,33,34,35,35,35,34] ), //Logs animation (bottom half)
        		37: new ig.Animation( bg, 0.15, [37,36,36,36,37,38,39,39,39,38] ) //Mini log animation
    		}
		};
		//Load level
		this.loadLevel( LevelJapan2 );
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if (start_anim == "idle_up") {
			player.currentAnim = player.anims.idle_up;
		}
		player.pos.x = player_x;
		player.pos.y = player_y;
		//Set current level for update method
		this.currentLevel = "japan2";
	},

	//All level updates

	updateJapan1: function(player) {
		if (player.pos.y > 2300 || player.pos.x > 6200) {
			ig.musicTertiary.play("Pond");
			ig.musicTertiary.setVolume(0.12);
		}
		else if (player.pos.y > 2100 || player.pos.x > 6000) {
			ig.musicTertiary.setVolume(0.08);
		}
		else if (player.pos.y > 1900 || player.pos.x > 5800) {
			ig.musicTertiary.play("Pond");
			ig.musicTertiary.setVolume(0.04);
		}
		else {
			ig.musicTertiary.stop();
		}
	},

	updateJapan2: function(player) {
		if (player.pos.x > 6200) {
			ig.musicTertiary.play("Pond");
			ig.musicTertiary.setVolume(0.12);
		}
		else if (player.pos.x > 6000) {
			ig.musicTertiary.setVolume(0.08);
		}
		else if (player.pos.x > 5800) {
			ig.musicTertiary.play("Pond");
			ig.musicTertiary.setVolume(0.04);
		}
		else {
			ig.musicTertiary.stop();
		}
	}



});

//Make screen fullscreen
ig.main( '#canvas', MyGame, 40, 1200, 700, 1 );

});

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}


