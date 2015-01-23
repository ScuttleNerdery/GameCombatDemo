ig.module(
	'game.entities.messageBox'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMessageBox = ig.Entity.extend({
		
	type: ig.Entity.TYPE.B, // Other group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	message: {},
	font: new ig.Font( 'media/fonts/message.png' ),
	zIndex: 2,
	text_pos: {x: 0, y: 0},
	pos: {x: 0, y: 0},
	size: {x:250, y:120},
	
	animSheet: new ig.AnimationSheet( 'media/chat_bubble2.png', 250, 120 ),
			
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
		this.currentAnim = this.anims.idle;
		
		//Visible by default
		this.font.alpha = 1
	},
	
	update: function() {
		
		//Kill it if space is hit again
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		if( player.vel.x != 0 || player.vel.y != 0 || ig.input.pressed('space') ) {
			this.kill();
		}
		
	},
	
	draw: function() {	
		this.parent();
		
		//Sift through the messages and display them
		var x = 0;
		for (message in this.message) {
			var new_y = (this.text_pos.y + (x*18));
			this.font.draw( this.message[message], this.text_pos.x, new_y, ig.Font.ALIGN.LEFT );
			x++;
		}
		
		//var ctx = ig.system.context;
		
		//Show text container
		//ctx.rect(this.pos.x, this.pos.y, 200, 70);
		//ctx.fillStyle = '#ffffff';
      //ctx.fill();
				
		//Write text
		//ctx.fillStyle = '#000';
		//ctx.font = '14px sans-serif';
		//ctx.textBaseline = 'top';
		//ctx.fillText(this.message, this.pos.x, this.pos.y);
    }
	
});

});