const electron = require('electron')
const path = require('path')
var howler = require('howler');

const BrowserWindow = electron.remote.BrowserWindow

//Games available
const games = {
    WILDWORLD: 'ww',
    NEWLEAF: 'nl'
}

//Initialize the first game to be Wild World
var game = games.WILDWORLD
var player = new howler.Howl({
  src: ['../assets/audio/ww/ww-1-am.mp3']
});

//Buttons 
const wildworldBtn = document.getElementById('wildworldBtn')
const newleafBtn = document.getElementById('newleafBtn')

wildworldBtn.addEventListener('click', function(event) {
	game = games.WILDWORLD
	playFile();
})

newleafBtn.addEventListener('click', function(event) {
	game = games.NEWLEAF
	playFile();
})

function playFile(){
	//Stop playing the current song
	player.stop()
	//Find the time of day
	var hour = new Date().getHours();

	let mp3File = '../assets/audio/';

	if(hour > 12){
  		mp3File = mp3File.concat(game,'/',game,'-', (hour - 12).toString() ,'-pm.mp3');
  	}
  	else{
		mp3File = mp3File.concat(game,'/',game,'-', hour.toString() ,'-am.mp3');
  	}

  	console.log("Running playFile with "+mp3File)

    player = new howler.Howl({
	  src: [mp3File]
	});

	player.play();

	player.on('end', function(){
  		playFile();
	});
}
