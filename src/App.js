import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/counter';
import Movies from './components/movies';
import Navbar from './components/navbar';
import Pagination from './components/common/pagination';

export default class App extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <main className="container">
                    <Movies/>
                </main>
            </div>
        );
    }  
}