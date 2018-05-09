
import React from 'react';
import {connect } from 'react-redux';
import { withLazyReducer } from 'lazy-reducer'
import { List, InputItem, WhiteSpace,NavBar,Icon,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {Link,browserHistory} from 'react-router';
import {subData} from '../../utils/ajax';
import URL from '../../url_config';

import '../../assets/style/common.css';
import './login.scss';



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
@createForm()
class Login extends React.Component{
    componentWillMount(){}
    /**
     * 表单提交方法
     */
    submitData(){
        let that = this;
        this.props.form.validateFields((error, value) => {
            console.log('表单数据===formData::::',value);
            that.props.dispatch(subData(URL.token,function (res) {
                Toast.success('获取 token 成功');
                that.props.dispatch({type:'SAVE_TOKEN',value:res.token});
                // browserHistory.push({
                //     pathname:'/',
                //     query:{selectedTab:'greenTab'}
                // })
            },value,function (err) {
                console.log(err)
            },'POST'));
        });

    }
    changeData(){
        var that= this;
        console.log('=======',this.props.loginInfo.get('token'));
        that.props.dispatch(subData(URL.login,function (res) {
            Toast.success('登录成功');
        },{token:this.props.loginInfo.get('token'),id:35},function (err) {
            Toast.success('登录失败');
        },'POST'));
    }
    /**
     * 返回按钮点击事件
     */
    onBack(){
        browserHistory.push({
            pathname:'/',
            state:'greenTab'
        })
    }

    render(){
        console.log('======== render ===========',this.props.loginInfo.toJS());
        const { getFieldProps } = this.props.form;
        //console.log('this.props',this.props);
        return(
            <div className="login">
                <NavBar icon={<Icon type="left" />} onLeftClick={this.onBack}>登录</NavBar>
                <InputItem {...getFieldProps('email')} type="email" placeholder="请输入您的邮箱">账号</InputItem>
                <InputItem {...getFieldProps('password')} type="password" placeholder="****">密码</InputItem>
                <div className="btn_wraper">
                    <Button onClick={this.submitData.bind(this)} type="primary">提交</Button>
                    <Button className="mbtn" onClick={this.changeData.bind(this)} >changeData</Button>

                </div>
            </div>
        )
    }

}




const mapStateToProps = (state, ownProps) => {
    console.log('state => in mapStateToProps',state);
    return{
        loginInfo:state.Login
    }
};
export default connect(mapStateToProps)(Login);


/*

const mapStateToProps = (state, ownProps) => {
    console.log('state => in mapStateToProps',state);
    return{
        loginInfo:state.loginInfo
    }
};
const mapDispathchToProps = dispatch => {
    return {
        changeData: increase(dispatch)
    }
};
const LoginWithConnect =  connect(mapStateToProps,mapDispathchToProps)(Login);




export default withLazyReducer(done => {
    setTimeout(() => {
        done({
            loginInfo: loginReducer
        })
    }, 0)
})(LoginWithConnect)


*/
