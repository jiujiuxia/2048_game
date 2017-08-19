var game={
	//保存游戏二维数组，总行数，列数
	data:null,RN:4,CN:4,
	score:0,//保存得分
	state:0,//保存游戏状态:1表示运行中，0表示结束
	RUNNING:1,//专门表示运行中状态
	GAMEOVER:0,//专门表示游戏结束状态
	//每个属性和方法之间必须用逗号分离！
	//对象自己的方法要使用自己的属性，必须this.
	start(){//游戏启动
		this.state=this.RUNNING;//重置游戏状态为运行中
		this.score=0;//分数清零
		//this->game;
		this.data=[];//新建空数组保存在data中
		//r从0开始，到<RN结束
		for(var r=0;r<this.RN;r++) {
			//新建空数组保存到data中r行
			this.data[r]=[];
		     //c从0开始，到<CN结束
			for(var c=0;c<this.CN;c++){
				//设置data中r行c列的值为0
				this.data[r][c]=0;
			}
		}//遍历结束	
		this.randomNum(); 
		this.randomNum();
		this.updateView();
		//事件:内容/设备状态的改变
		//事件处理函数:在事件发生时自动执行的操作
		document.onkeydown=function(e){
			switch(e.keyCode){
				//this->.前的document->game
				case 37://左移；
					this.moveLeft();
					break;
				case 38://上移；
					this.moveUp();
					break;
				case 39://右移；
					this.moveRight();
					break;
				case 40://下移；
					this.moveDown();
					break;				
			}
		}.bind(this);
	},
	isGameOver(){//判断游戏是否结束
		for(var r=0;r<this.RN;r++){//遍历data
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0) return false;//如果当前元素是0，返回false			
				else {
					//否则，如果c<CN-1且当前元素等于右侧元素
					if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]) return false;//返回false
					//否则，如果r<RN-1且当前元素等于下方元素
					if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]) return false;//返回false									}
			  }//遍历结束
		   }
		}
		return true;//返回true
	},
	moveLeft(){//左移所有行
		//为数组拍照保存在before中
		var before=String(this.data);
		//r从0开始，到<RN结束
		for(var r=0;r<this.RN;r++){
			this.moveLeftInRow(r);//左移第r行
		}//(循环结束)
		//再为数组拍照保存在after中
		var after=String(this.data);
		//如果发生了移动,即before!=after(不发生移动，页面是不会动的)
		if(before!==after){
			this.randomNum();//随机生成数
			this.updateView();//更新页面
		}	
	},	
	moveLeftInRow(r){//左移第r行
		for(var c=0;c<this.CN-1;c++) {//c从0开始，到<CN-1
			var nextc=this.getNextInRow(r,c);
			if(nextc==-1){//查找c位置后下一个不为0的位置nextc
				break;//如果没找到，就退出循环
			} else {//否则
				if(this.data[r][c]==0){//如果c位置的值是0
					this.data[r][c]=this.data[r][nextc];//将nextc位置的值赋给c位置
					this.data[r][nextc]=0;//将nextc位置的值为0
					c--;//c留在原地					
			    } else if(
					this.data[r][c]==this.data[r][nextc]){//否则，如果c位置的值等于nextc位置的值
					this.data[r][c]*=2;//将c位置的值*2
					this.score+=this.data[r][c];
					this.data[r][nextc]=0//将nextc位置的值置为0
				}
	        }
	    }				
	},  
	getNextInRow(r,c){//查找r行c列下一列不为0的位置
		//i从c+1开始，到<CN结束
		for(var i=c+1;i<this.CN;i++) {
			//如果i位置的值不为0，就返回i
			if(this.data[r][i]!=0) return i;            
		} //(遍历结束)
		return -1;//返回-1					
	},
	moveRight(){ 
		var before=String(this.data);
		for(var r=0;r<this.RN;r++){
			this.moveRightInRow(r);
		}
		var after=String(this.data);
		if(before!==after) {
			this.randomNum();//随机生成数
			this.updateView();//更新页面
		}
	},
	moveRightInRow(r){//右移第n行
		for(var c=this.CN-1;c>0;c--){
			var prevc=this.getPrevInRow(r,c);
			if(prevc==-1){
				break;
			} else {
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[r][prevc];
					this.data[r][prevc]=0;
					c++;
				} else if(this.data[r][c]==this.data[r][prevc]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[r][prevc]=0;
				}
			}
		}	
	},
	getPrevInRow(r,c){//查找r行c列左侧前一个不为0的位置
		for(var i=c-1;i>=0;i--){
			if(this.data[r][i]!=0) return i;
		}
		return -1;
	},
	moveUp(){
		var before=String(this.data);
		for(var c=0;c<this.CN;c++){
			this.moveUpInCol(c);
		}
		var after=String(this.data);
		if(before!==after){
			this.randomNum();//随机生成数
			this.updateView();//更新页面
		}
	},
	moveUpInCol(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getNextInCol(r,c);
			if(nextr==-1){
				break;
			} else {
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[nextr][c];
					this.data[nextr][c]=0;
					r--;
				} else if(this.data[r][c]==this.data[nextr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[nextr][c]=0;
				}
			}
		}
	},
	getNextInCol(r,c){
		for(var i=r+1;i<this.RN;i++){
			if(this.data[i][c]!=0) return i;
		}
		return -1;
	},
	moveDown(){
		var before=String(this.data);
		for(var c=0;c<this.CN;c++){
			this.moveDownIncol(c);
		}
		var after=String(this.data);
		if(before!=after){
			this.randomNum();
			this.updateView();
		}
	},
	moveDownIncol(c){
		for(var r=this.RN-1;r>0;r--){
			var prevr=this.getPrevIncol(r,c);
			if(prevr==-1){
				break;
			} else {
				if(this.data[r][c]==0){
					this.data[r][c]=this.data[prevr][c];
					this.data[prevr][c]=0;
					r++;
				} else if(this.data[r][c]==this.data[prevr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[prevr][c]=0;
				}
			}
		}
	},
	getPrevIncol(r,c){
		for(var i=r-1;i>=0;i--){
			if(this.data[i][c]!=0) return i;
		}
		return -1;
	},
	updateView(){//将data中的数据更新到每个div中
		//遍历二维数组
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var n=this.data[r][c];
				//找到id为crc的div
				var div=document.getElementById("c"+r+c);
				if(n!=0){//如果n不是0
					div.innerHTML=n;//设置div的内容为n var txt=document.createTextNode(n);div.appendChild(txt);
					//设置div的class为cell n+n
					div.className="cell n"+n;//div.setAttribute("class","cell n"+n);
				} else {
					div.innerHTML="";//清除div的内容
					//恢复div中的class为cell
					div.className="cell";
				}
			}
		}
		//找到id为score的div，设置其内容为score属性
		var span=document.getElementById("score");
		span.innerHTML=this.score;
		var div=document.getElementById("gameOver");//找到id为gameOver的div
		//如果游戏状态为GAMEOVER就设置div显示
		if(this.isGameOver()){
			this.state=this.GAMEOVER;
			div.style.display="block";
			//找到id为final的span，设置其内容为score
			document.getElementById("final").innerHTML=this.score;
		} else {//否则就设置div隐藏
			div.style.display="none";
		}
	},
	randomNum(){ //在一个随机位置生成2或4
		//反复:
		while(true) {
			//在0~RN-1之间生成随机数r
			var r=Math.floor(Math.random()*this.RN);
			//在0~CN-1之间生成随机数c
			var c=Math.floor(Math.random()*this.CN);
			//如果data中r行c列的值为0
			if(this.data[r][c]==0) {
				//将data中r行c列赋值为：
					//随机生成一个小数，如果<0.5，就取2，否则就取4
				this.data[r][c]=Math.random()<0.5?2:4;
				break;//退出循环
			}
		}		
	},
}
game.start();
