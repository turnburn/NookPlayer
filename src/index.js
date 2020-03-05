const electron = require('electron')
const path = require('path')
var howler = require('howler');

const BrowserWindow = electron.remote.BrowserWindow

const wildworldBtn = document.getElementById('wildworldBtn')
const newleafBtn = document.getElementById('newleafBtn')

var player = new howler.Howl({
  src: ['../assets/audio/ww/ww-1-am.mp3']
});

wildworldBtn.addEventListener('click', function(event) {
	player.stop()
	player = new howler.Howl({
	  src: ['../assets/audio/ww/ww-1-am.mp3']
	});

	player.play();
})

newleafBtn.addEventListener('click', function(event) {
	player.stop()
	player = new howler.Howl({
	  src: ['../assets/audio/nl/nl-1-am.mp3']
	});

	player.play();
})