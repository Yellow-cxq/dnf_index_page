
//详细信息显示隐藏
function showItem() {
	var item = document.querySelector("#item")
	var lis = document.querySelectorAll("#header>ul>li")

	for (let i = 0; i < lis.length; i++) {
		lis[i].onmouseenter = function() {
			item.style.opacity = '1'
		}
	}
	item.onmouseleave = function() {
		item.style.opacity = '0'
	}
}

//二维码显示隐藏
function showC() {
	var dnfli = document.querySelector("#item>.item-contents>ul:nth-child(7)>li:nth-child(4)")
	var wechatli = document.querySelector("#item>.item-contents>ul:nth-child(7)>li:nth-child(5)")
	var dnf = document.querySelector("#head .dnfhl")
	var wechat = document.querySelector("#head .wechat")

	dnfli.onmouseenter = function() {
		dnf.style.display = 'block'
	}
	dnfli.onmouseleave = function() {
		dnf.style.display = 'none'
	}

	wechatli.onmouseenter = function() {
		wechat.style.display = 'block'
	}
	wechatli.onmouseleave = function() {
		wechat.style.display = 'none'
	}
}

//赛利亚那里显示隐藏
function showPanels(){
	var aLis = document.querySelectorAll("#menu-guide>.menu-guide-tit>li")
	var aPanels = document.querySelectorAll("#menu-guide .guide-panel")
	var content = document.querySelector(".wrap .content>.content_l")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aLis[i].onmouseenter = function () {
			for(let i = 0; i < aPanels.length; i++){
				aPanels[i].classList.remove('dis')
			}
			aPanels[this.index].classList.add('dis')
		}
	}
	for (let i = 0; i < aPanels.length; i++) {
		aPanels[i].onmouseleave = function () {
			for(let i = 0; i < aPanels.length; i++){
				aPanels[i].classList.remove('dis')
			}
		}
	}
	content.onmouseleave = function () {
		for(let i = 0; i < aPanels.length; i++){
			aPanels[i].classList.remove('dis')
		}
	}
}

//道具城推荐Tab切换效果
function shopTab(){
	var aPanels = document.querySelectorAll("#shop-list>.tab-panel")
	var aLis = document.querySelectorAll("#shop-tab .shop-hd li")
	for (let i = 0; i < aLis.length; i++) {
		aLis[i].index = i
		aPanels[i].index = i
		aLis[i].onmouseover = function () {
			for(let i = 0; i < aLis.length; i++){
				aLis[i].classList.remove('cur')
			}
			for(let i = 0; i < aPanels.length; i++){
				aPanels[i].classList.remove('dis')
			}
			aLis[this.index].classList.add('cur')
			aPanels[this.index].classList.add('dis')
		}
	}
}

//合作媒体显示隐藏
function showTeamWork(){
	var h3 = document.querySelector("#teamwork-select>.sprite")
	var ul = document.querySelector("#teamwork-select .teamwork-list")
	var team = document.querySelector("#teamwork-select")
	h3.onmouseenter = function () {
		ul.style.display = 'block'
	}
	team.onmouseleave = function () {
		ul.style.display = 'none'
	}
}


//轮播图
function lb(){
	var ul = document.querySelector("#ggBox>.adPic>ul")
	var container = document.querySelector("#ggBox>.adPic")
	var totalTime = 490 //一个换页的总时间
	var intervalTime = 10 //移动的间隔时间
	var intervalID  //循环定时器的id(翻页中的不移动)
	var imgCount = 6 //图片的个数
	var moving = false //是否正在移动中
	var index = 0 //当前显示的图片的下标
	var intervalID2//循环定时器的id(自动翻页)
	var buttons = document.querySelectorAll(".adBtn>a")
	
	autoPage()
	onMouseoverButtons()
	container.onmouseover = function () {
		clearInterval(intervalID2)
	}
	container.onmouseout = function () {
		autoPage()
	}
	//自动翻页
	function autoPage(){
		intervalID2 = setInterval(function(){
		nextPage(true)
	},2000)
	}
	//翻页到指定页
	function nextPage(next){
	//如果正在移动直接结束
	if(moving){
		return 
	}
	//标识正在移动
	moving = true
	//需要进行的总偏移量
	var offset
	if(typeof next === 'boolean'){
		offset = next ? -343 : 343
	}else{
		offset = -343 * (next - index)
	}
	//每个小移动需要做的偏移量
	var itemOffset = offset / (totalTime / intervalTime)
	//切换完成时ul的left坐标
	var targetLeft = ul.offsetLeft + offset
	//循环定时器
	intervalID = setInterval(function(){
		var left =  ul.offsetLeft + itemOffset
		console.log(left)
		console.log(targetLeft)
		//如果已经到达目标位置，清除定时器
		if(left == targetLeft){
			clearInterval(intervalID)
		    if(left == -343 * (imgCount + 1))
			{
			left = -343
		    }else if(left == 0){
				left = -imgCount * 343
			}
		moving = false
		}
		ul.style.left = left + 'px'
	},intervalTime)
	//同步更新原点
	updateButtons(next)
	}
	
	function updateButtons(next){
		//将当前圆点更新为一般圆点
		buttons[index].classList.remove('on')
		//计算出目标圆点的下标
		var targetIndex
		if(typeof next == 'boolean'){
			if(next){
				targetIndex = index + 1
				if(targetIndex == imgCount){
				targetIndex = 0
			  }
			}else{
				targetIndex = index - 1
				if(targetIndex == -1){
					targetIndex = imgCount - 1
				}
			}	
		}else{
			targetIndex = next
		}
		//将目标圆点的下标更新为当前下标
		index = targetIndex
		buttons[index].classList.add('on')
	}
   
   //给所有的原点设置监听
   function onMouseoverButtons(){
	   for(var i = 0; i < buttons.length; i++){
		   buttons[i].index = i
		   buttons[i].onmouseover = function () {
			   clearInterval(intervalID2)
			   nextPage(this.index)
		   }
		   buttons[i].onmouseout = function () {
			   autoPage()
		   }
	   }
   }
}

//信息栏Tab切换
function toggleNews(){
	var lis = document.querySelectorAll("#news-tab>.news-hd>li")
	var spans = document.querySelectorAll("#news-tab>.news-hd>li>span")
	var panels = document.querySelectorAll("#news-tab .news-bd>.tab-panel")
	for(let i = 0; i < lis.length; i++){
		lis[i].index = i
		spans[i].index = i
		lis[i].onmouseover = function () {
			for(let i = 0; i < spans.length; i++){
				spans[i].style.display = 'none'
			}
			for(let i = 0; i < panels.length; i++){
				panels[i].style.display = 'none'
			}
			spans[this.index].style.display = 'block'
			panels[this.index].style.display = 'block'
		}
	}
}

//活动中心Tab切换
function toggleActivity(){
	var lis = document.querySelectorAll("#act_nav>li")
	var actPanels = document.querySelectorAll("#act_con .act-panel")
	for(let i = 0; i < lis.length; i++){
		lis[i].index = i
		actPanels[i].index = i
		lis[i].onclick = function () {
			for(let i = 0; i < lis.length; i++){
				lis[i].classList.remove('cur')
			}
			for(let i = 0; i < actPanels.length; i++){
				actPanels[i].style.display = 'none'
			}
			lis[this.index].classList.add('cur')
			actPanels[this.index].style.display = 'block'
		}
	}
}