//import {Link } from 'react-router';
//import Velocity from '../../utils/velocity';
//import VelocityComponent from '../../components/VelocityComponent';
// import '../../utils/velocity.ui';
// import Tab from '../../components/Tab';
// import { Button } from 'antd-mobile';
//import ReactPlayer from 'react-player';  视频
//import {Editor, EditorState} from 'draft-js';  富文本编辑器
//import VConsole from 'vconsole';//移动端控制台
//import LoadingPage from '../../components/Loading';//正在加载页面
//import '../../mock';//模拟数据
//import {subData} from '../../utils/ajax';//请求网络


import {View,connect,React} from '../../utils/boot';
import { withLazyReducer } from 'lazy-reducer';
import '../../assets/style/common.css';
import './home.scss';





var n = 0;
var initState = imt.fromJS({//定义初始状态
    name:'Login',
    token:'',
    loginInfo:[]
});
//定义本组件的 reducer
const reducerMap = {
    Login: (state=initState,action) =>{
        //console.log('action.value',action.value);
        switch (action.type){
            case 'SAVE_TOKEN':
                return state.set('token',action.value);break;
            case 'SHOW_DATA':
                return state.set('total',n++);break;
            default:
                return state;
        }
    }
};

/**
 * 注册页面组件
 */
@withLazyReducer((done)=>{//注册reducer成功后的回调
    setTimeout(()=>done(reducerMap))
})
class Home extends View{
    state = {
        open: false,
        selectedTab: '',
        hidden: false
    };
    componentWillMount(){}
    componentDidMount() {}
    componentDidUpdate(){}
    componentWillReceiveProps(nextProps){}
    render(){
        return(
            <div className="home">

            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log('state => in mapStateToProps',state);
    return{
        homeState:state.Home
    }
};

const mapDispathchToProps = dispatch => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    }
}

export default connect(mapStateToProps)(Home);





//var mHome =  connect(mapStateToProps)(Home);

/*
 export default withLazyReducer(done => {
 setTimeout(() => {
 done(reducerMap)
 }, 0)
 })(mHome)
 */
