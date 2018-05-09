import React from 'react';
import 'normalize.css'
import '../../assets/style/common.css';
import './app.scss'
class App extends React.Component{
    render(){
        return(
            <div className="app">
                {this.props.children}
            </div>
        )
    }
}
export default App;