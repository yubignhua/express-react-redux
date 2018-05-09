/**
 * Created by yubh on 2017/1/5.
 */
var SlideBar =  React.createClass({

	propTypes:{
		//总数
		multi:React.PropTypes.number,
		//回调函数
		callback:React.PropTypes.func
	},



	componentWillMount:function () {
		//初始化滑块移动的长度 默认为0
		this.x = 0;
		//总数
		this.multi = this.props.multi;

	},

	componentDidMount:function () {
		//获得父容器的宽度
		this.wraperWidth = $(this.refs.wraper).width();
		//获得单位宽度
		this.dwidth =this.wraperWidth/this.multi;
	},

	getDefaultProps:function () {},


	//初始化状态
	getInitialState:function () {
		return{
			st:false,
			x:0,
			num:0,
		}
	},

	//加减点击函数
	changeCount:function (flag) {
		var changeLong = 0, changeNum = 0;
		var {num} = this.state;
		if(flag){
			if(num<this.multi){
				changeNum = ++num;
				changeLong = this.dwidth*num;
			}else {
				return;
			}
		}else {
			if(num>=1){
				changeNum = --num;
				changeLong = this.dwidth*num;
			}else {
				return;
			}
		}
		this.setState({
			num:changeNum,
			x:changeLong
		})
	},
	//滑动事件回调函数
	touchMove:function (event) {
		//清除默认事件
		event.preventDefault();
		event.stopPropagation();
		var wei = 0;
		//触点所在位置
		if(event.touches[0]){
			var ele_x = event.touches[0].pageX;
		}
		//获得滑动距离（滑动后位置-起始位置）
		var long = ele_x-this.startIndex;

		//存储上次移动后的长度
		var oldWidth = this.x;

		//获得本次移动后的长度
		this.x = this.x + long;

		//设定滑块边界
		if(this.x<0) this.x = 0;
		if(this.x > this.wraperWidth) this.x = this.wraperWidth;

		//获得滑动数量
		wei = Math.floor(this.x/this.dwidth);

		//重新计算滑块起始位置（现在的长度 - 上次的长度）
		this.startIndex+= this.x - oldWidth;

		this.setState({
			x: this.x,
			num:wei
		});
	},

	changeSt:function (flag) {
		this.setState({
			st:flag
		})

	},

	//滑动开始回调函数获得起始位置
	touchStart:function (event) {
		this.changeSt(true);
		if(event.touches[0]){
			this.startIndex = event.touches[0].pageX;
		}
	},

	touchEnd:function () {
		this.changeSt(false);
	},


	goBack:function () {
		jjBridge.back();
	},

	combind:function () {
		if(this.state.num==0) return;
		this.goBack();
		this.props.callback(this.state.num);
	},

	render:function () {
		return(
			<div className="slidebar">
				<div className="SlideBarContainer">
					<div className="num"> <span className={classNames({numc:this.state.num?true:false})}>{this.state.num==0?"请拖动滑竿选择合成数量":this.state.num}</span> </div>
					<div className="main">
						<div className="wraper" ref="wraper">
							<div className={classNames({bg_color:true,sc:this.state.x?true:false})} style={{width:this.state.x+4}}></div>
							<div className={classNames({one:true,bgs:true,bgs_s:this.state.st? false:true})} ref="oner" style={{left:this.state.x}} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}></div>
						</div>
						<JButton className="btn plug" onClick={this.changeCount.bind(this,false)}><span className="dNum">{0}</span> </JButton>
						<JButton className="btn dele" onClick={this.changeCount.bind(this,true)}><span className="pNum">{this.multi}</span></JButton>
						<div className={classNames({sure:true,sbtn:true,ac:this.state.num?true:false})} onClick={this.combind}> <span>确定</span> </div>
						<div className="cancle sbtn" onClick={this.goBack}> <span>取消</span> </div>
					</div>
				</div>
			</div>
		)
	}
});

var Sbar = React.createClass({
	propTypes:{
		//总数
		multi:React.PropTypes.number,
		//回调函数
		callback:React.PropTypes.func
	},



	componentWillMount:function () {
		//初始化滑块移动的长度 默认为0
		this.x = 0;
		//总数
		this.multi = this.props.multi;

	},

	componentDidMount:function () {
		//获得父容器的宽度
		this.wraperWidth = $(this.refs.wraper).width();
		//获得单位宽度
		this.dwidth =this.wraperWidth/this.multi;
	},

	getDefaultProps:function () {},


	//初始化状态
	getInitialState:function () {
		return{
			x:0,
			num:0,
		}
	},

	//加减点击函数
	changeCount:function (flag) {
		var changeLong = 0, changeNum = 0;
		var {num} = this.state;
		if(flag){
			if(num<this.multi){
				changeNum = ++num;
				changeLong = this.dwidth*num;
			}else {
				return;
			}
		}else {
			if(num>=1){
				changeNum = --num;
				changeLong = this.dwidth*num;
			}else {
				return;
			}
		}
		this.setState({
			num:changeNum,
			x:changeLong
		})
	},
	//滑动事件回调函数
	touchMove:function (event) {
		//清除默认事件
		event.preventDefault();
		event.stopPropagation();
		var wei = 0;
		//触点所在位置
		if(event.touches[0]){
			var ele_x = event.touches[0].pageX;
		}
		//获得滑动距离（滑动后位置-起始位置）
		var long = ele_x-this.startIndex;

		//存储上次移动后的长度
		var oldWidth = this.x;

		//获得本次移动后的长度
		this.x = this.x + long;

		//设定滑块边界
		if(this.x<0) this.x = 0;
		if(this.x > this.wraperWidth) this.x = this.wraperWidth;

		//获得滑动数量
		wei = Math.floor(this.x/this.dwidth);

		//重新计算滑块起始位置（现在的长度 - 上次的长度）
		this.startIndex+= this.x - oldWidth;

		this.setState({
			x: this.x,
			num:wei
		});
	},

	//滑动开始回调函数获得起始位置
	touchStart:function (event) {
		if(event.touches[0]){
			this.startIndex = event.touches[0].pageX;
		}
	},

	goBack:function () {
		jjBridge.back();
	},

	combind:function () {
		if(this.state.num==0) return;
		this.goBack();
		this.props.callback(this.state.num);
	},
	render:function () {
		return(
			<div className="slidebar">
				<div className="SlideBarContainer">
					<div className="num"> <span className={classNames({numc:this.state.num?true:false})}>{this.state.num==0?"请拖动滑竿选择合成数量":this.state.num}</span> </div>
					<div className="main">
						<div className="wraper" ref="wraper">
							<div className={classNames({bg_color:true,sc:this.state.x?true:false})} style={{width:this.state.x+4}}></div>
							<div className={classNames({one:true,bgs:"bgs"})} ref="oner" style={{left:this.state.x}} onTouchStart={this.touchStart} onTouchMove={this.touchMove}></div>
						</div>
						<JButton className="btn plug" onClick={this.changeCount.bind(this,false)}><span className="dNum">{0}</span> </JButton>
						<JButton className="btn dele" onClick={this.changeCount.bind(this,true)}><span className="pNum">{this.multi}</span></JButton>
						<div className={classNames({sure:true,sbtn:true,ac:this.state.num?true:false})} onClick={this.combind}> <span>确定</span> </div>
						<div className="cancle sbtn" onClick={this.goBack}> <span>取消</span> </div>
					</div>
				</div>
			</div>
		)
	}

});
