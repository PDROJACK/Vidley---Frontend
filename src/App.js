import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MoviesDetails from './components/moviePage';
import Navbar from './components/navbar';
import Pagination from './components/common/pagination';
import {Route,Switch} from 'react-router-dom';

export default class App extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <main className="container">
                    <Switch>
                        <Route path='/rentals' component={Rentals} />
                        <Route path='/customers' component={Customers} />
                        <Route path='/movies/:id' component={MoviesDetails} />
                        <Route path='/movies' component={Movies} />
                        <Route path='/not-found' component={Movies} />
                        <Route path='/' component={Movies} />
                    </Switch>
                </main>
            </div>
        );
    }  
}