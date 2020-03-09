const electron = require('electron')
const path = require('path')
var howler = require('howler');

const BrowserWindow = electron.remote.BrowserWindow

//Games available
const games = {
    WILDWORLD: 'ww',
    NEWLEAF: 'nl'
}
//Seasons available
const seasons = {
    SUN: 'sun',
    RAIN: 'rain',
    SNOW: 'snow'
}

//Initialize the first game to be Wild World
var game = games.WILDWORLD
var season = seasons.SUN
var player = new howler.Howl({
  src: ['../assets/audio/ww/sun/ww-sun-1-am.mp3']
});

//Weather Buttons
const sunBtn = document.getElementById('sunBtn')
const rainBtn = document.getElementById('rainBtn')
const snowBtn = document.getElementById('snowBtn')

sunBtn.addEventListener('click', function(event) {
	season = seasons.SUN
	sunBtn.className = "btn active"
	rainBtn.className = "btn weather"
	snowBtn.className = "btn weather"
	playFile();
})

rainBtn.addEventListener('click', function(event) {
	season = seasons.RAIN
	sunBtn.className = "btn weather";
	rainBtn.className = "btn active"
	snowBtn.className = "btn weather"
	playFile();
})

snowBtn.addEventListener('click', function(event) {
	season = seasons.SNOW
	sunBtn.className = "btn weather"
	rainBtn.className = "btn weather"
	snowBtn.className = "btn active"
	playFile();
})

//Game Buttons
const wildworldBtn = document.getElementById('wildworldBtn')
const newleafBtn = document.getElementById('newleafBtn')

wildworldBtn.addEventListener('click', function(event) {
	game = games.WILDWORLD
	rainBtn.disabled = true;
	snowBtn.disabled = true;
	sunBtn.click();
	playFile();
})

newleafBtn.addEventListener('click', function(event) {
	game = games.NEWLEAF
	rainBtn.disabled = false;
	snowBtn.disabled = false;
	sunBtn.click();
	playFile();
})

function playFile(){
	//Stop playing the current song
	player.stop()
	//Find the time of day
	var hour = new Date().getHours();

	let mp3File = '../assets/audio/';

	if(hour > 12){
  		mp3File = mp3File.concat(game,'/', season, '/', game,'-', season,'-', (hour - 12).toString() ,'-pm.mp3');
  	}
  	else{
		mp3File = mp3File.concat(game,'/', season, '/', game,'-', season,'-', (hour).toString() ,'-am.mp3');
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
