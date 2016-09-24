var bird = document.querySelector("#flybird")
var birdImg = document.querySelector(".birdimg")
var conduitTimer = null; //创建管道定时器
var speed = 0;
var downTimer = null;
var floorTestTimer = null;
var speedMax = 8;
var upTimer = null;
var crashTestTimer = null;
var isGameover = true;
var score = 0;
var thisScore = document.querySelector(".thisScore");
var historyScore_ = document.querySelector('.historyScore')
var game_restart = document.querySelector('.game_restart')
var audio1 = document.querySelector(".audio1") //开始音乐
var audio2 = document.querySelector(".audio2") //点击音乐
var audio3 = document.querySelector(".audio3") //结束音乐

audio1.pause();
audio2.pause();
audio3.pause();
//鸟向下移动
function down() {
	speed += 0.5;
	bird.className = 'birddown'

	if(speed >= speedMax) {
		speed = speedMax;
	}
	bird.style.top = bird.offsetTop + speed + 'px';
	//	birdImg.src = "images/down_bird0.png"
	floorTest();
}
//鸟向上移动
function up() {

	speed -= 0.6;
	bird.className = 'birdup'
	if(speed <= 0) {
		speed = 0;
		clearInterval(upTimer);
		downTimer = setInterval(down, 30)

	}

	bird.style.top = bird.offsetTop - speed + 'px';
}
//鸟跳动的函数
function birdJump() {

	speed = speedMax
	if(isGameover) {
		clearInterval(upTimer); //清除向上的定时器
		clearInterval(downTimer); //先清除向下降落的定时器
		//		birdImg.src = "images/up_bird0.png"
		upTimer = setInterval(up, 30)
		audio2.play();
	}

}
//触地碰撞检测
function floorTest() {
	var t1 = bird.offsetTop;
	var b1 = bird.offsetHeight + t1;
	if(t1 >= 396 || t1 <= 0) {
		//游戏结束
		gameover();
	}
}
//碰撞检测

function crashTest(obj, objpar) {
	var l1 = bird.offsetLeft;
	var r1 = l1 + bird.offsetWidth;
	var t1 = bird.offsetTop;
	var b1 = t1 + bird.offsetHeight;

	var l2 = objpar.offsetLeft;
	var r2 = l2 + obj.offsetWidth;
	var t2 = obj.offsetTop;
	var b2 = t2 + obj.offsetHeight;

	if(r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
		gameover();
	}
}
//清除所有计时器
function clearTimer() {
	var timer = setInterval(function() {}, 30);
	for(var i = 0; i < timer; i++) {
		clearInterval(i)
	}
}
//游戏结束
function gameover() {
	bird.className = 'bird';
	audio3.play();

	audio1.pause();
	isGameover = false;
	clearInterval(conduitTimer);

	clearInterval(downTimer)

	clearInterval(crashTestTimer);
	clearTimer();
	bird.className='bird birdbirddown'
	thisScore.innerHTML = score;
	bird.style.top = 396 + 'px';
	document.querySelector('.gameover').style.display = 'block';
	resultStart();

	//历史分数
	var historyScore = localStorage.getItem('maxScore');
	if(historyScore == null || historyScore < score) {
		localStorage.setItem('maxScore', score);
		historyScore = score;
	}
	historyScore_.innerHTML = historyScore;

}
//随机函数
function rand(min, max) {
	return parseInt(Math.random() * (max - min) + min)
}
var canvas = document.querySelector('.canvas')

function scoreFn(score) {

	var testScore = String(score);
	console.log(testScore);
	testScore = testScore.split('');
	var scoreDiv = document.querySelector('#scroing')
	scoreDiv.innerHTML = '';
	console.log(testScore);
	for(var i = 0; i < testScore.length; i++) {
		var img = document.createElement('img');
		img.src = 'images/' + testScore[i] + '.jpg';
		scoreDiv.appendChild(img);
	}

}
//创建管道
function createConduit() {
	var conduitGroup = document.querySelector('.conduit_group')
	var conduitItem = document.createElement('div')
	conduitItem.className = 'conduitItem';
	conduitGroup.appendChild(conduitItem);
	var topHeight = rand(60, 263);
	var bottomHeight = 323 - topHeight
	conduitItem.innerHTML = '<div class="top_conduit"><div style="height:' + topHeight + 'px"></div></div>' +
		'<div class="bottom_conduit"><div style="height:' + bottomHeight + 'px"></div></div>';
	var maxWidth = canvas.offsetWidth;
	conduitItem.style.left = maxWidth + 'px';
	conduitItem.ToScore = true;
	conduitItem.moveTime = setInterval(function() {
		maxWidth -= 3
		if(maxWidth <= -70) {
			clearInterval(conduitItem.moveTime)
			conduitGroup.removeChild(conduitItem);
		}
		//计算积分
		if(maxWidth <= 50 && conduitItem.ToScore) {
			score++;
			conduitItem.ToScore = false;
			scoreFn(score);
		}
		conduitItem.style.left = maxWidth + 'px';

	}, 30)
}

var start_btn = document.querySelector('.start_btn');
var gameStartDiv = document.querySelector('.game_start');
//游戏初始化
function init() {
	//添加点击事件  开始按钮
	start_btn.onclick = function() {
		audio1.play();
		gameStartDiv.style.display = 'none';
		bird.style.top='200px'
		bird.style.display = 'block';
		conduitTimer = setInterval(createConduit, 2000);
		//碰撞检测
		crashTestTimer = setInterval(function() {
			var conduitItem = document.querySelector(".conduit_group").querySelectorAll('.conduitItem');
			for(var i = 0; i < conduitItem.length; i++) {
				var top_conduit = conduitItem[i].querySelector('.top_conduit')
				var bottom_conduit = conduitItem[i].querySelector('.bottom_conduit')
				crashTest(top_conduit, conduitItem[i]);
				crashTest(bottom_conduit, conduitItem[i]);
			}
		}, 10);
		//鸟 降落
		downTimer = setInterval(down, 50)
		document.addEventListener('click', birdJump, false)
	}

}
//游戏重新开始
function resultStart() {
	game_restart.onclick = function() {
		//		gameStartDiv.style.display = 'block';
		//		bird.style.display = 'none';
		//		document.querySelector('.gameover').style.display = 'none';
		//		history.go('0')
		window.location.reload();

	}
}

//var game_restart=document.querySelector(".submit_btn")
//game_restart.onclick=resultstart;
//var conduit_group=document.querySelector(".conduit_group")
//function resultstart(){
//		bird.className='bird'
//		clearTimer();
//		thisScore.innerHTML=null;
//		isGameOver=false;
//    	speed=0;
//    	speedMax=8;	
//		document.querySelector('.gameover').style.display='none';	
//	    gameStartDiv.style.display = 'block';
//      bird.style.display = 'none';
//      conduit_group.innerHTML='';
//}

init();