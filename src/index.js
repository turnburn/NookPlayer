const electron = require('electron')
const path = require('path')
var howler = require('howler');

const BrowserWindow = electron.remote.BrowserWindow

//Games available
const games = {
	ACGC: 'ac',
    WILDWORLD: 'ww',
    NEWLEAF: 'nl',
    CITYFOLK: 'cf'
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

//Volume Slider
const volSlider = document.getElementById('volSlider')

volSlider.oninput = function() {
  Howler.volume(this.value / 100);
}

//Weather Buttons
const sunBtn = document.getElementById('sunBtn')
const rainBtn = document.getElementById('rainBtn')
const snowBtn = document.getElementById('snowBtn')

sunBtn.addEventListener('click', function(event) {
	season = seasons.SUN
	resetWeatherButtons()
	sunBtn.className = "btn activeWeather"
	playFile();
})

rainBtn.addEventListener('click', function(event) {
	season = seasons.RAIN
	resetWeatherButtons()
	rainBtn.className = "btn activeWeather"
	playFile();
})

snowBtn.addEventListener('click', function(event) {
	season = seasons.SNOW
	resetWeatherButtons()
	snowBtn.className = "btn activeWeather"
	playFile();
})

function resetWeatherButtons() {
	sunBtn.className = "btn weather"
	rainBtn.className = "btn weather"
	snowBtn.className = "btn weather"	
}

//Game Buttons
const animalcrossingBtn = document.getElementById('animalcrossingBtn')
const wildworldBtn = document.getElementById('wildworldBtn')
const newleafBtn = document.getElementById('newleafBtn')
const cityfolkBtn = document.getElementById('cityfolkBtn')

animalcrossingBtn.addEventListener('click', function(event) {
	game = games.ACGC;
	rainBtn.disabled = true;
	snowBtn.disabled = false;
	resetGameButtons()
	animalcrossingBtn.className = "btn activeGame"
	sunBtn.click();
	playFile();
})

wildworldBtn.addEventListener('click', function(event) {
	game = games.WILDWORLD
	rainBtn.disabled = true;
	snowBtn.disabled = true;
	resetGameButtons()
	wildworldBtn.className = "btn activeGame"
	sunBtn.click();
	playFile();
})

newleafBtn.addEventListener('click', function(event) {
	game = games.NEWLEAF
	rainBtn.disabled = false;
	snowBtn.disabled = false;
	resetGameButtons()
	newleafBtn.className = "btn activeGame"
	sunBtn.click();
	playFile();
})

cityfolkBtn.addEventListener('click', function(event) {
	game = games.CITYFOLK
	rainBtn.disabled = false;
	snowBtn.disabled = false;
	resetGameButtons()
	cityfolkBtn.className = "btn activeGame"
	sunBtn.click();
	playFile();
})

function resetGameButtons() {
	animalcrossingBtn.className = "btn"
	wildworldBtn.className = "btn"
	newleafBtn.className = "btn"	
	cityfolkBtn.className = "btn"	
}

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
