if(displaymeta) {
	var jsmediatags = window.jsmediatags;
	tracklocation = window.location.href + tracklocation;
}

if(displaymeta) {
	if(!usefa) {
	var buttons = ['<span class="jsmusicPlayer-'+ theme +'">',
						'<div class="music-player">',
						'<center><div class="cover"></div></center>',
						'<p class="info">Waiting...</p>',
						'<div class="progress">',
						'<span class="bar">&nbsp;</span>',
						'</div>',
						'<center>',
						'<button class="shuffle">Shuffle</button>',
						'<button class="prev">Previous</button>',
						'<button class="play">Play</button>',
						'<button class="next">Next</button>',
						'<button class="repeat">Repeat</button>',
						'</center>',
						'</div>',
						'</span>'];	
	} else {
	var buttons = ['<span class="jsmusicPlayer-'+ theme +'">',
						'<div class="music-player">',
						'<center><div class="cover"></div></center>',
						'<p class="info">Waiting...</p>',
						'<div class="progress">',
						'<span class="bar">&nbsp;</span>',
						'</div>',
						'<center>',
						'<button class="shuffle"><i class="fa fa-random" aria-hidden="true"></i></button>',
						'<button class="prev"><i class="fa fa-backward" aria-hidden="true"></i></button>',
						'<button class="play"><i class="fa fa-play" aria-hidden="true"></i></button>',
						'<button class="next"><i class="fa fa-forward" aria-hidden="true"></i></button>',
						'<button class="repeat"><i class="fa fa-repeat" aria-hidden="true"></i></button>',
						'</center>',
						'</div>',
						'</span>'];		
	}
} else {
	if(!usefa) {
	var buttons = ['<span class="jsmusicPlayer-'+ theme +'">',
						'<div class="music-player">',
						'<div class="progress">',
						'<span class="bar">&nbsp;</span>',
						'</div>',
						'<center>',
						'<button class="shuffle">Shuffle</button>',
						'<button class="prev">Previous</button>',
						'<button class="play">Play</button>',
						'<button class="next">Next</button>',
						'<button class="repeat">Repeat</button>',
						'</center>',
						'</div>',
						'</span>'];	
	} else {
	var buttons = ['<span class="jsmusicPlayer-'+ theme +'">',
						'<div class="music-player">',
						'<div class="progress">',
						'<span class="bar">&nbsp;</span>',
						'</div>',
						'<center>',
						'<button class="shuffle"><i class="fa fa-random" aria-hidden="true"></i></button>',
						'<button class="prev"><i class="fa fa-backward" aria-hidden="true"></i></button>',
						'<button class="play"><i class="fa fa-play" aria-hidden="true"></i></button>',
						'<button class="next"><i class="fa fa-forward" aria-hidden="true"></i></button>',
						'<button class="repeat"><i class="fa fa-repeat" aria-hidden="true"></i></button>',
						'</center>',
						'</div>',
						'</span>'];		
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

var track;
var artist;
var title;
var tracknumber = 0;
var tracksmax = 0;
var tracks = [];
var unshuffledtracks;
var playing = false;
var shuffled = false;
var repeat = false;
var ready = false;

$( document ).ready(function() {
	$( loadto ).empty();
	$( loadto ).html(buttons.join(''));
	$.ajax({
  		url: tracklocation,
  		success: function(data){
    		$(data).find("td > a").each(function(){
    			if( $(this).attr("href").endsWith('.mp3') || $(this).attr("href").endsWith('.ogg') ) {
    				var tmpfilename = $(this).attr("href");
    				if(displaymeta) {
						jsmediatags.read(tracklocation + $(this).attr("href"), {
							onSuccess: function(tag) {
								if(tag.tags.artist) {
    								artist = tag.tags.artist;
    							} else {
									artist = "Unknown";    				
    							}
    							if (tag.tags.title) {
									title = tag.tags.title;    				
    							} else {
    								title = "Unknown";
    							}
    							var image = tag.tags.picture;
    							if (image) {
    								var base64String = "";
    								for (var i = 0; i < image.data.length; i++) {
                					base64String += String.fromCharCode(image.data[i]);
           						}
									var base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
									tracks.push({file:tmpfilename,title:title,artist:artist,cover:base64});  							
    							} else {
									tracks.push({file:tmpfilename,title:title,artist:artist,cover:false});    							
    							}
  							},
  							onError: function(error) {
    							console.log(error);
    							tracks.push({file:tmpfilename,title:"N/A",artist:"N/A",cover:false});
  							}
						});    		
    				} else {
						tracks.push({file:tmpfilename,title:"N/A",artist:"N/A",cover:"N/A"}); 				
    				}
       		}
    		});
    		setTimeout(function(){ 
				tracksmax = tracks.length - 1;
    			track = new Audio(tracklocation + tracks[tracknumber].file);
    			ready = true;
    			if(displaymeta) {
    				$( ".info" ).text(tracks[tracknumber].artist +" - "+ tracks[tracknumber].title);
    			}
			}, 3000);
  		}
	});
	function progress() {
		var trackprogress = (track.currentTime / track.duration) * 100;
		trackprogress = round(trackprogress, 1);
		$( ".bar" ).css('width', trackprogress +'%');
	}
	setInterval(function(){
		if(ready) {
			progress();
		}
	}, 1000);
	function play() {
		if(displaymeta) {
			if(!playing) {
    			track.play();
    			playing = true;
    			console.log("Now playing: "+ tracks[tracknumber].artist +" - "+ tracks[tracknumber].title);
    			$( ".info" ).text(tracks[tracknumber].artist +" - "+ tracks[tracknumber].title);
				if(!usefa) {
					$( ".play" ).text('Pause');
				} else {
					$( ".play" ).html('<i class="fa fa-pause" aria-hidden="true"></i>');			
				}
				if(!tracks[tracknumber].cover) {
					$( ".cover" ).html('');
				} else {
					$( ".cover" ).html('<img class="picture" src="'+ tracks[tracknumber].cover +'" />');				
				}	
    		} else {
    			track.pause();
				playing = false;
				console.log("Stopped playing: "+ tracks[tracknumber].artist +" - "+ tracks[tracknumber].title);
				if(!usefa) {
					$( ".play" ).text('Play');
				} else {
					$( ".play" ).html('<i class="fa fa-play" aria-hidden="true"></i>');			
				}
				if(!tracks[tracknumber].cover) {
					$( ".cover" ).html('');
				} else {
					$( ".cover" ).html('<img class="picture" src="'+ tracks[tracknumber].cover +'" />');				
				}
    		}
		} else {
			if(!playing) {
    			track.play();
    			playing = true;
				if(!usefa) {
					$( ".play" ).text('Pause');
				} else {
					$( ".play" ).html('<i class="fa fa-pause" aria-hidden="true"></i>');			
				} 	
    		} else {
    			track.pause();
				playing = false;
				if(!usefa) {
					$( ".play" ).text('Play');
				} else {
					$( ".play" ).html('<i class="fa fa-play" aria-hidden="true"></i>');			
				}     	
    		}
    	}
    	track.onended = function() {
    		if(!repeat) {
    			next();
    		} else {
				playing = false;    			
    			play();
    		}
		};
	}
	function next() {
		if(playing) {
			play();   	
   	}
   	if(tracknumber >= tracksmax) {
			tracknumber = 0;   	
   	} else {
			tracknumber = tracknumber + 1;   	
   	}
   	track = new Audio(tracklocation + tracks[tracknumber].file);
   	play();	
	}
	function prev() {
		if(playing) {
			play();   	
   	}
   	if(tracknumber <= 0) {
			tracknumber = tracksmax;   	
   	} else {
			tracknumber = tracknumber - 1;
   	}
   	track = new Audio(tracklocation + tracks[tracknumber].file);
   	play();
	}
	$(".play").click(function(){
		if(ready) {
    		play();
    	}
   });
   $(".prev").click(function(){
   	if(ready) {
   		prev();
   	}
   });
   $(".next").click(function(){
   	if(ready) {
	   	next();
	   }
   });
   $(".shuffle").click(function(){
   	if(ready) {
   		if(!shuffled) {
   			$( ".shuffle" ).toggleClass( "active" )
   			shuffled = true;
   			unshuffledtracks = tracks;
    			shuffle(tracks);
   		} else {
   			$( ".shuffle" ).toggleClass( "active" )
				shuffled = false;
				tracks = unshuffledtracks;   	
   		}
   	}
   });
   $(".repeat").click(function(){
   	if(ready) {
    		if(!repeat) {
   			$( ".repeat" ).toggleClass( "active" )
   			repeat = true;
   		} else {
   			$( ".repeat" ).toggleClass( "active" )
				repeat = false; 	
   		}
   	}
   });
});