var bird = document.querySelector('#bird')
var start = document.querySelector('.start');
var gamestart = document.querySelector('.gamestart');
var gameover = document.querySelector('.gameover');
var game_restrat = document.querySelector('.game_restrat');
var pipeline = document.querySelector('.pipeline');
var wrap = document.querySelector('.wrap');
var flybird = document.querySelector(".img1")
var createpipelinetimer = null;
var birddowntimer = null;
var speed = 0;

//随机数
function rand(min, max) {
	return parseInt(Math.random() * (max - min)) + min;
}

//创建管道
function createpipeline() {
	var maxWidth = wrap.offsetWidth;
	var pipelineItem = document.createElement('div');
	pipelineItem.className = 'pipelineItem';
	var topHeight = rand(60, 263);
	var bottomHeight = 323 - topHeight;

	pipelineItem.innerHTML = "<div class='top_pipeline'>" +
		"<div style='height:" + topHeight + "px;'></div>" +
		"</div>" +
		"<div class='bottom_pipeline'>" +
		"<div style='height:" + bottomHeight + "px;'></div>" +
		"</div>";
	pipeline.appendChild(pipelineItem);

	pipelineItem.movetimer = setInterval(function() {
		maxWidth -= 3;
		pipelineItem.style.left = maxWidth + 'px';
		if(maxWidth < -80) {
			clearInterval(pipelineItem.movetimer);
			pipeline.removeChild(pipelineItem);
		}
	}, 30)
}

//游戏开始
function init() {
	start.onclick = function() {
		gamestart.style.display = 'none'
		bird.style.display = 'block';
		//小鸟降落
		birddowntimer = setInterval('down()', 30)
		document.addEventListener('click', birdJump, false)

		//创建管道
		createpipelinetimer = setInterval(function() {

			createpipeline();
		}, 3000)
	}
}

init();
//游戏过程
//小鸟🐦下降
function down() {
	speed += 0.5;
	if(speed>10){
		speed=10;
	}
	bird.style.top = bird.offsetTop + speed + 'px';
	flybird.src = 'img/down_bird0.png'
	floorTest();
}

function birdup() {
	speed -= 1.5;
	if(speed<=0){
		speed=0;
	clearInterval(uptimer);
	birddowntimer = setInterval('down()', 30)
	}
	flybird.src = 'img/up_bird0.png'
	bird.style.top = bird.offsetTop - speed + 'px';
}
var uptimer = null;
//小鸟🐦上升
function birdJump() {
	var onetimer = null;
	speed = 10;
	clearInterval(uptimer)
	clearInterval(birddowntimer);
	var i = 0;
	onetimer = setInterval(function() {
		i++;
		if(i > 1) {
			clearInterval(onetimer);
			uptimer = setInterval(birdup, 30);
		}
		bird.style.top=bird.offsetTop-speed+'px';
	}, 30)
}

//碰撞检测---小鸟与地板
function floorTest() {
	var t1 = bird.offsetTop;
	var b1 = t1 + bird.offsetHeight;
	if(b1 >= 392) {
		gameover_();
	}
}

//游戏结束
function gameover_() {
	gameoverdown();
}
//var flybird=document.querySelector(".img1")
function gameoverdown() {
	gameover.style.display = 'block';
	clearInterval(createpipelinetimer);
	bird.style.top = '392px';
}

//游戏重新开始
function gameresult() {
	game_restrat.onclick = function() {
		gamestart.style.display = 'block';
		bird.style.display = 'none';
		gameover.style.display = 'none';
		
	}
}
gameresult();
