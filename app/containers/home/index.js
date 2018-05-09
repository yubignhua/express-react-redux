import {View,connect,React} from '../../utils/boot';
import { withLazyReducer } from 'lazy-reducer';
import { If, Then, Else } from 'react-if';
import {Link,browserHistory } from 'react-router';
import { Button,Carousel,Drawer,List,NavBar,Icon,Grid,NoticeBar,TabBar,Badge,Toast} from 'antd-mobile';
import './home.scss';
import {subData} from '../../utils/ajax';
import URL from '../../url_config';


var initState = imt.fromJS({//定义初始状态
    name:'home',
    userList:[]
});
//定义本组件的 reducer
const reducerMap = {
    'Home': (state=initState,action) =>{
        //console.log('action.value',action.value)
        switch (action.type){
            case "ADD":
                return Object.assign(state,{name:'hahah'});break;
            case "USERLIST"://存储全部用户列表
                return state.set('userList',action.value);break;//[...state.UserList,action.value]
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
class Home extends View {
    state = {
        imgHeight: 176,
        slideIndex: 0,
        open: false,
        selectedTab: 'blueTab',
        hidden: false,
        fullScreen: false
    };
    componentWillMount(){
       // console.log('home:::location-----',this.props.location);
        let {action,state} = this.props.location;
        if(action == 'PUSH' ){
            if(state){
                this.setState({
                    selectedTab:this.props.location.state
                });
            }
        }

        //侧边栏内容
        this.imgData =  [
            //url(images/123.35aaf2c0.png) no-repeat
            {src:'images/my_pic_1.jpg'},
            {src:'images/my_pic_2.jpg'},
            {src:'images/my_pic_3.png'}
        ];
        this.menuList = ['登录','注册'];
        this.DrawerContent = { color: '#A6A6A6', textAlign: 'center',top:'45px'};
        this.contentList = [
            {title:'班级花名册',url:'/reduxtest'},
            {title:'加载动画',url:'/new_loading_page'},
            {title:'football',url:'/football'},
            {title:'动画集合',url:'/no_page'},
            {title:'Anti-mobile',url:'/anti_test'},
            {title:'error',url:'/error_page'},
            {title:'注册',url:'/register'},
            {title:'添加任务',url:'/create_task'}
        ]

    }

    componentDidMount() {
        var that = this;
        //获取全部用户列表
        this.props.dispatch(subData(URL.userList,function (res) {
            console.log('----------network---------:::::::::',res);
            that.props.dispatch({type:"USERLIST",value:res});
        },{},function (err) {
            Toast.success(err);
        },'GET'));

        if(this.props.allState.Login){
            var token = this.props.allState.Login.get('token');
            console.log('token',token)
        }


    }

    changeData(){

    }

    /**
     * 渲染全部用户
     * @param dataList
     */
    renderAllUser(dataList){
        //console.log('dataList::::',dataList);
        return dataList.map((item,index)=>{
            return(
                <tr className="user_item" key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                </tr>
            )
        })

    };

    onOpenChange = (...args) => {
       // this.setState({ open: !this.state.open });
        this.props.dispatch({type:'ADD',value:'lelele'})
    };

    getContentTitle = ()=>{
        return this.contentList.map((item, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: item.title,
            url:item.url
        }));

    }

    /**
     * 渲染侧边栏
     * @returns {XML}
     */
    renderSliderbar = ()=>{
        return <List>
                    <List.Item key={0}  multipleLine>功能菜单:</List.Item>
                    {this.menuList.map((item, index) => {
                        return (<List.Item key={index} thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">{item}</List.Item>);
                    })}
                </List>;
    };

    render() {
        //console.log('this.props.homeState.userList:::::',this.props.homeState.userList);
        //var state = this.props.homeState.userList;
        console.log('--render---homeState-',this.props.homeState.toJS());
        if(this.props.allState.Login)
        console.log('--render---Login-',this.props.allState.Login.toJS());
        return (
            <div className="home">
                <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" hidden={this.state.hidden}>
                    <TabBar.Item title="主页" key="home" icon={<div className="tab_bar_icon" style={{width: '22px',height: '22px',background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}/>}
                        selectedIcon={<div className="tab_bar_icon" style={{background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}/>}
                        data-seed="logId"
                         selected={this.state.selectedTab === 'blueTab'}
                         onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                                });
                            }}>
                        <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>主页</NavBar>
                        {/*菜单容器*/}
                        <Drawer className="my-drawer" enableDragHandle sidebar={this.renderSliderbar()} open={this.state.open} onOpenChange={this.onOpenChange} style={{ minHeight: document.documentElement.clientHeight }} contentStyle={this.DrawerContent}>
                            {/*轮播组件*/}
                            <Carousel className="space-carousel" frameOverflow="visible" autoplayInterval={5000} cellSpacing={10} slideWidth={0.8} autoplay infinite >
                                        {this.imgData.map((val, index) => {
                                           return <a className="cl_a" key={index} href="#">
                                                      <img className="cl_img" src={val.src} style={{ width: '100%',height:154}} />
                                                  </a>
                                        }
                                        )}
                            </Carousel>
                            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                                微信服务号上所有的信息都和你在医院的就诊信息绑定，你可以绑定自己的信息，也可以为自己的孩子以及其他亲属绑定。绑定后你可以为你绑定的所有人进行在线挂号、缴住院押金、查检查检验报告、查门诊记录、查住院记录等操作。
                            </NoticeBar>
                            <Grid data={this.getContentTitle()} isCarousel onClick={_el => {browserHistory.push(_el.url)}} />
                        </Drawer>

                    </TabBar.Item>
                    <TabBar.Item className="space-carousel"
                        icon={<div className="tab_bar_icon" style={{background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}/>}
                        selectedIcon={<div className="tab_bar_icon" style={{background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}/>}
                        title="Koubei"
                        key="Koubei"
                        selected={this.state.selectedTab === 'redTab'}
                        data-seed="logId1"
                        onPress={() => {
                              this.setState({
                                selectedTab: 'redTab',
                              });
                        }}>
                        <NavBar>周边</NavBar>
                        <div className="r_user_list">注册用户列表:</div>

                        <div className="all_users">
                            {/*<If condition={this.state.userList.size>0}>
                             <Then><div>2342342343</div></Then>
                             <Else><div>hahaahahaha</div></Else>
                             </If>*/}

                            <table id="table-1">
                                <tbody>
                                <tr>
                                    <td>姓名</td>
                                    <td>邮箱</td>
                                </tr>
                                {
                                    this.renderAllUser(this.props.homeState.get('userList'))
                                }
                                </tbody>
                            </table>


                        </div>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className="tab_bar_icon" style={{background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}/>}
                        selectedIcon={ <div className="tab_bar_icon" style={{background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }} />}
                        title="个人中心"
                        key="My"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                                      this.setState({
                                        selectedTab: 'greenTab',
                                      });
                                        }}>
                        <NavBar>个人中心</NavBar>
                        <div className="pc_top">
                            <img className="img_header" width="60" height="60px" src="https://media2.chunyuyisheng.com/@/media/images/default_doctor.png?imageMogr2/thumbnail/150x" alt=""/>
                            <div className="right" onClick={()=> {browserHistory.push('/login')}}>
                                <span>登录/</span>
                                <span>注册</span>
                            </div>
                        </div>
                        <div className="content">
                            <List>
                                <List.Item extra="extra content" arrow="horizontal">
                                    <Badge dot>
                                        <span style={{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block' }} />
                                    </Badge>
                                    <span style={{ marginLeft: 12 }}>我的订单</span>
                                </List.Item>
                                <List.Item
                                    thumb="https://zos.alipayobjects.com/rmsportal/faMhXAxhCzLvveJ.png"
                                    extra={<Badge text={77} overflowCount={55} />}
                                    arrow="horizontal">
                                    收入结算
                                </List.Item>
                                <div className="s_con"></div>
                                <List.Item><Badge text={'促'} corner>
                                    <div className="corner-badge">发布的话题</div>
                                </Badge></List.Item>
                                <List.Item className="special-badge" extra={<Badge text={'促'} />}>
                                    经典话题
                                </List.Item>
                                <List.Item extra="extra" arrow="horizontal">
                                    <Badge text={0} style={{ marginLeft: 12 }}>心愿墙</Badge>
                                    <Badge text={'new'} style={{ marginLeft: 12 }} />
                                </List.Item>
                                <div className="s_con"></div>
                                <List.Item>
                                    优惠促销:
                                    <Badge text="减" hot style={{ marginLeft: 12 }} />
                                    <Badge text="惠" hot style={{ marginLeft: 12 }} />
                                    <Badge text="免" hot style={{ marginLeft: 12 }} />
                                    <Badge text="HOT" hot style={{ marginLeft: 12 }} />
                                </List.Item>
                                <List.Item>
                                    我的优惠券
                                    <Badge text="券" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }} />
                                    <Badge text="NEW" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                                    <Badge text="自动缴费"
                                           style={{
                                              marginLeft: 12,
                                              padding: '0 3px',
                                              backgroundColor: '#fff',
                                              borderRadius: 2,
                                              color: '#f19736',
                                              border: '1px solid #f19736',
                                            }}/>
                                </List.Item>
                            </List>
                        </div>
                    </TabBar.Item>

                </TabBar>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log('state => in mapStateToProps',state);
    return{
        homeState:state.Home,
        allState:state
    }
};


export default connect(mapStateToProps)(Home);




//var mHome =  connect(mapStateToProps)(Home);

/*
export default withLazyReducer(done => {
    setTimeout(() => {
        done(reducerMap)
    }, 0)
})(mHome)
*/
