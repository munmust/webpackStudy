if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/server-work.js').then(
            registeration=>{
                console.log('serviceWork register');
            }
        ).catch(error=>{
            console.log('fail');
        })
    })
}
import {BrowserRouter,Route} from 'react-router-dom';
import React,{Component} from 'react';
class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <Route path='' component="" />
            </div>
            </BrowserRouter>
        )
    }
}
