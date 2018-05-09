/**
 * Created by yubh on 2018/1/10.
 */

//import React from 'react';
import {View,connect,React} from '../utils/boot';
import '../assets/style/common.css'

class NewLoadingPage extends View{
    componentWillMount(){}
    loadData(){}
    render(){
        return(
            <div className="new_loading">
                <div id="loading-screen" className="container">
                    <div className="cube">
                        <div className="sides">
                            <div className="top"></div>
                            <div className="right"></div>
                            <div className="bottom"></div>
                            <div className="left"></div>
                            <div className="front"></div>
                            <div className="back"></div>
                        </div>
                    </div>
                    <div className="text">请稍等 正在加载中...</div>
                </div>

            </div>
        )
    }
}



export default NewLoadingPage

