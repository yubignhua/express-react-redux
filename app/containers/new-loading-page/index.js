/**
 * Created by yubh on 2018/1/10.
 */

import React from 'react';

import NewLoad from '../../components/new_loading';

class NewLoading extends React.Component {
    componentWillMount(){
        this.clinetWith = document.body.clientWidth;
        this.height = window.screen.height;
        console.log('document.body.clientHeight',window.screen.height)
    }
    render() {
        var sty = {position:'absolute'};
        return (
            <div className="not_find_page">
                <NewLoad/>
            </div>
        )
    }
}
export default NewLoading;
