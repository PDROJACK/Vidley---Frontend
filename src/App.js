import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import NotFound from './components/common/notFound';
import Rentals from './components/rentals';
import MoviesForm from './components/moviePage';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

export default class App extends Component {
    render() {
        return ( <div >
            <Navbar/>
            <main className = "container" >
            <Switch>
            <Route path = '/login' component = {LoginForm}/> 
            <Route path = '/rentals' component = {Rentals}/>
            <Route path = '/customers' component = {Customers}/>
            <Route path = '/movies/:id' component = {MoviesForm}/>
            <Route path = '/movies' component = {Movies}/>
            <Route path = '/register' component = {RegisterForm}/>
            <Route path = '/not-found' component = {NotFound}/>
            <Redirect from = '/' to = '/movies'/>
            <Redirect to = '/not-found'/>
            </Switch> 
            </main> 
            </div>
        );
    }
}