var bird = document.querySelector('#bird')
var gamestart = document.querySelector('.gamestart');
var birddowntimer = null;
var createpipelinetimer = null;
//游戏开始
function init() {
	start.onclick = function() {
		gamestart.style.display = 'none'
		bird.style.display = 'block';
	}
}