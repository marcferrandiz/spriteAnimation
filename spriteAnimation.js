function initSprite(fps) {
			
	var canvas;//general canvas
	var sprite1,sprite2,sprite3,sprite4;// Here all the sprites that we want
	var imgSprite;// image object from the SpriteSheet
	
	function gameLoop () {
	
		setTimeout(function() {
	        window.requestAnimationFrame(gameLoop);
	        //Clear all the canvas
	        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	        
	        //Draw anything on the canvas here
	        var backgroundG= new Image();
	        backgroundG.src="./Images/background.gif";
	        context.drawImage(backgroundG,0,0);
	        
	         sprite1.update();
	         sprite1.render(100,250);
	         sprite2.update();
	         sprite2.render(300,230);
	         
 
         }, 1000 / fps);
	}
	
	function sprite (options) {
		/*
		context: context of the canvas
		width: width of the sprite (all image)
		height: height of the sprite ( all image)
		image: image object
		tickCount: number updates since the current frame was first displayed
		numberOfFrames: number of frames(sprite movements) of the image[1-x]
		ticksPerFrame: number updates until the next frame should be displayed
		*/
		
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		that.numRows = options.numRows;
		that.numColumns = options.numColumns;
		that.row = options.row;
		that.scale = options.scale;
		
		
		////UPDATE the sprite image
		that.update = function() {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                	//reset
                    frameIndex = 0;
                    
                }
            }
        };
		
		// RENDER the sprite image
		/*
		originX: X from the canvas  
		originY: Y from the canvas	
		*/
		that.render = function (originX,originY) {
		
		  ////// Clear the sprite if we need
		  /*
		  context.clearRect(x,y,width,height);
		  x: origin on canvas
		  y: origin on canvas
		  width: width of the region
		  height: height of the region
		  */
		  //that.context.clearRect(originX,originY, that.width/that.numColumns,that.height/that.numRows);
		  
		  ////// Draw the animation
		  /*
		  context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
		  img: Image object
		  sx: 'x' coordinate where start clipping (origin)
		  sy: 'y' coordinate where start clipping
		  swidth: the width of the clipped image
		  sheight: The height of the clipped image
		  x: the 'x' coordinate where to place the image on the canvas
		  y: the 'y' coordinate where to place the image on the canvas
		  width: the width of the image to use (stretch or reduce the image)
		  height: the height of the image to use (stretch or reduce the image)
		  */
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames * that.row,
		    (that.height / that.numRows) * (that.row-1),
		    that.width / that.numColumns,
		    that.height / that.numRows,
		    originX,
		    originY,
		    that.width / that.numColumns * that.scale ,
		    (that.height / that.numRows) * that.scale);
		};
		
		return that;
	}

	
	// Get canvas
	canvas = document.getElementById("canvas");
	//create content 2D
	var context=canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	//if we want a stroke in the design->uncomment the next line
	//context.strokeStyle = "black";
	//context.strokeRect(0, 0, w, h);
		
	

	
	// Create here all the Image Objects
	imgSprite = new Image();
	// Load sprite sheet
	imgSprite.addEventListener("load", gameLoop);
	imgSprite.src = "./Images/metalslug2.png";
	
	imgSprite2 = new Image();
	// Load sprite sheet
	//imgSprite2.addEventListener("load", gameLoop);
	imgSprite2.src = "./Images/infantery.png";
	
	 
	
	
	
	
	// Create the sprite Object
	/*
	context: context of the canvas
	width: width of the total spriteSheet
	height: height of the total spriteSheet 
	image: image object
	numRows: number of rows on the spriteSheet [1-X]
	numColumns: number of columns on the spriteSheet [1-Y]
	numberOfFrames: number of frames(sprite movements) of the sprite[1-X]
	ticksPerFrame: number updates until the next frame should be displayed
	row: row of the start animation on the spriteSheet [1-X]
	column: column of the start animation on the spriteSheet [1-X]
	scale: scale of the sprite on the canvas, 1 is default.
	*/
	
	
	sprite1 = sprite({
		context: canvas.getContext("2d"),
		width: 340,
		height: 42,
		image: imgSprite,
		numRows:1,
		numColumns:9,
		numberOfFrames: 9,
		ticksPerFrame: 4,
		row:1,
		column:1,
		scale:2
		
	});
	
	sprite2 = sprite({
		context: canvas.getContext("2d"),
		width: 855,
		height: 50,
		image: imgSprite2,
		numRows:1,
		numColumns:15,
		numberOfFrames: 15,
		ticksPerFrame: 4,
		row:1,
		column:1,
		scale:2
		
	});

}
