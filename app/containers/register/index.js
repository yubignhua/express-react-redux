
import {View,connect,React} from '../../utils/boot';
import { withLazyReducer } from 'lazy-reducer';
import { List, InputItem, WhiteSpace,NavBar,Icon,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {Link,browserHistory } from 'react-router';

import '../../assets/style/common.css';
import './register.scss';
import {subData} from '../../utils/ajax';
import URL from '../../url_config';

var initState = {//定义初始状态
    name:'register',
    list:[]
};
//定义本组件的 reducer
const reducerMap = {
    'Register': (state=initState,action) =>{
        switch (action.type){
            case "ADD":
                return [...state.list,["棒球"]];break;
            default:
                return state;
        }
    }
};

/**
 * 注册页面组件
 */
@withLazyReducer(reducerMap)
class Register extends View{
    componentWillMount(){
        console.log('Register :: location-----',this.props.location);

    }
    submitData(data){
        this.props.dispatch(subData(URL.register,function (res) {
            Toast.success(res.msg+'!!!');
            browserHistory.push({
                pathname:'/',
                query:{selectedTab:'greenTab'}
            })
        },data,function (err) {
            console.log(err)
        },'POST'));
    }
    render(){
        return(
            <div className="register">
                <BasicInputExample subdata={this.submitData.bind(this)}/>
            </div>
        )
    }

}

/**
 * 表单组件
 */
@createForm()
class BasicInputExample extends React.Component {
    componentDidMount() {
        // this.autoFocusInst.focus();
    }
    handleClick(){
        this.customFocusInst.focus();
    };

    /**
     * 表单提交方法
     */
    submit(){
        let that = this;
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            that.props.subdata(value);
        });
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
    render() {
        const { getFieldProps } = this.props.form;
        //console.log('---this.props.form----',this.props.form);
        //console.log('-------',getFieldProps('phone'));
        return (
            <div>
                <NavBar icon={<Icon type="left" />} onLeftClick={this.onBack}>注册</NavBar>
                <InputItem {...getFieldProps('name')} type="text" placeholder="请填写您的姓名">昵称</InputItem>
                <InputItem {...getFieldProps('phone')} type="phone" placeholder="请输入您的电话号码">手机号码</InputItem>
                <InputItem {...getFieldProps('email')} type="email" placeholder="请输入您的邮箱">邮箱</InputItem>
                <InputItem {...getFieldProps('password')} type="password" placeholder="****">密码</InputItem>
                <div className="btn_wraper">
                    <Button onClick={this.submit.bind(this)} type="primary">提交</Button>
                </div>
            </div>
        );
    }
}




const mapStateToProps = (state, ownProps) => {
    console.log('state => in mapStateToProps',state);
    return{}
};


export default connect(mapStateToProps)(Register);

