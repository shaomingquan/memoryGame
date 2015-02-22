window.onload = function(){
	new Game().loadGame();
}

///////////////////////////////////////////////////

function Game(){
	var stage = document.getElementById("stage"),
		memeda = document.getElementById("memeStage").getElementsByTagName("span"),
		imgs = stage.getElementsByTagName("img"),
		locked = false,
		spinedStack = [],
		itemArray = [],
		itemArrayT = [];
	this.loadGame = function() {
			pics = [0,1,2,3,4,5,6,7,8,9],
			ipic = 8,
			iposi = 16,
			i = 2,
			tp = null,
			curPicNum = 0,
			random = Math.floor(Math.random()*9);
		pics.splice(random,1);
		for(i = 0 ; i < imgs.length ; i++){
			itemArrayT.push(new Item(imgs[i],memeda[i]));
		}
		while(pics.length){
			console.log(pics.length);
			curPicNum = pics.splice(Math.floor(Math.random()*ipic),1)[0];
			ipic --;
			i = 2;
			while(i --){
				tp = itemArrayT.splice(Math.floor(Math.random()*iposi),1)[0];
				if(tp == undefined){
					break;
				}
				itemArray.push(tp);

				tp.setImg(curPicNum);
				tp.setNum(curPicNum);
				iposi --;		
			}
		}
		console.log(itemArray);
		this.initAnimation()
		this.clickAnimation()
	}
	this.initAnimation = function(){
		var time = 1000;
		for(var i = 0 ; i< imgs.length ;i++){
			(function(time ,i){
				itemArray[i].trunOver(time);
			})(time ,i);
			time+=50;
		}
	}
	this.clickAnimation = function(){
		for(var i =0 ; i< itemArray.length;i++){
			(function(i,_this){
				var curItem = itemArray[i];
				curItem.memeda.onclick = function(){
					curItem.clear();
					if(locked || spinedStack.length >= 2){
						return false ;
					}
					curItem.trueBack(0);
					spinedStack.push(curItem);
					if(spinedStack.length == 2){					
						_this.checkOk(spinedStack);
					}
					curItem.timer = setTimeout(function(){
						while(spinedStack.length){
							with(spinedStack.pop()){
								trunOver(0);
								clear();
							}
						}
						setTimeout(function(){
							locked = false;
						},200)
					},2500)
				}
			})(i ,this)
		}
	}
	this.checkOk = function(obj){
		locked = true;
		if(obj[0].num == obj[1].num){
			while(obj.length){
				with(obj.pop()){
					clear();
				}
			}
			locked = false;
		}
	}
}
function Item(img ,memeda){
	this.img = img;
	this.memeda = memeda;
	this.num = null;
	this.timer = null;
	this.clear = function(){
		clearTimeout(this.timer);
	}
	this.setImg = function(i){
		this.img.setAttribute("src","imgs/"+i+".png");
	}
	this.setNum = function(i){
		this.num = i;
	}
	this.trunOver = function(time) {
		if(arguments.length == 0){
			time = 0;
		}
		setTimeout(function(){
			img.style.webkitTransform = "rotateY(180deg)";
			memeda.style.webkitTransform = "rotateY(0deg)";
		},time)
	}
	this.trueBack = function(time) {
		if(arguments.length == 0){
			time = 0;
		}
		setTimeout(function(){
			img.style.webkitTransform = "rotateY(0deg)";
			memeda.style.webkitTransform = "rotateY(-180deg)";
		},time)
	}
}