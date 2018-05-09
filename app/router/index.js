
import React from 'react';
import { Router, Route, Redirect,browserHistory,IndexRoute,hashHistory } from 'react-router';
import Home from 'containers/home';
import Login from 'containers/login';
import App from 'containers/app';
import Newloading from 'containers/new-loading-page';
import ErrorPage from 'containers/nofindpage';
//import Index from 'containers/index';



const FootBall = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../containers/football').default)
    },'football')
};

const Nopage = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../containers/nopage').default)
    },'nopage')
};

/**
 * 注册页面
 * @param location
 * @param callback
 * @constructor
 */
const Register = (location,callback) => {
    require.ensure([],require =>{
        callback(null,require('../containers/register').default)
    },'register')
};

const CreateTasks = (location,callback) => {
    require.ensure([],require =>{
        callback(null,require('../containers/create_task').default)
    },'create_task')
};

// const ClassMates = (location, callback) => {
//     require.ensure([], require => {
//         callback(null, require('../containers/reduxTest').default)
//     },'reduxtest')
// };



const AntiTest = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../containers/anti-mobile-test').default)
    },'antitest')
};

export default class MyRounter extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    {/*404页面*/}
                    <Route path="login" component={Login}/>
                    <Route path="error_page" component={ErrorPage}/>
                    <Route path="new_loading_page" component={Newloading}/>
                    <Route path="football" getComponent={FootBall}/>
                    <Route path="no_page" getComponent={Nopage}/>
                    <Route path="anti_test" getComponent={AntiTest}/>
                    <Route path="register" getComponent={Register}/>
                    <Route path="create_task" getComponent={CreateTasks}/>
                </Route>
                {/*未匹配到路径 重定向到404页面*/}
                <Redirect path="*" to="/error_page"/>
            </Router>
        )
    }
}

