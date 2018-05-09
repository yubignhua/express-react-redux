/**
 * Created by yubh on 2017/12/30.
 */
import React from 'react';
import ContentLoader from 'react-content-loader';
import './nofindpage.scss';
import no_resource from '../../assets/img/no_res.png';

//import LoadingPage from '../../components/Loading';

class NotFindPage extends React.Component {
    componentWillMount(){
        this.clinetWith = document.body.clientWidth;
        this.height = window.screen.height;
        console.log('document.body.clientHeight',window.screen.height)
    }
    render() {
        var sty = {position:'absolute'};
        return (
            <div className="not_find_page">
                <div className="no_page">
                    <img width="50px" src={no_resource} alt=""/>
                    <div style={{paddingTop:10}}>没有找到您的网页</div>
                </div>
                <ContentLoader className="mContent" width={this.clinetWith} height={this.height}>
                    {/* Pure SVG */}
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </ContentLoader>

            </div>
        )
    }
}
export default NotFindPage;
























