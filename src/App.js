import React, {
    Component
} from 'react';
import Movies from './components/movies';
import Customers from './components/customers';
import NotFound from './components/common/notFound';
import Rentals from './components/rentals';
import MoviesForm from './components/movieForm';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import auth from "./services/authService";

export default class App extends Component {
    state={}

    componentDidMount(){
        const user = auth.getCurrentUser();
        this.setState({user});
    }
    render(){
        return ( 
        <div>
            <Navbar user={this.state.user} />
            <main className = "container" >
            <Switch>
            <Route path = '/login' component = {LoginForm}/> 
            <Route path = '/rentals' component = {Rentals}/>
            <Route path = '/customers' component = {Customers}/>
            <ProtectedRoute path = '/movies/:id' component = {MoviesForm}/>
            <Route path = '/movies' render={props=> <Movies {...props} user={this.state.user}/>}/>
            <Route path = '/register' component = {RegisterForm}/>
            <Route path = '/not-found' component = {NotFound}/>
            <Route path = '/logout' component={Logout}/>
            <Redirect from = '/' to = '/movies'/>
            <Redirect to = '/not-found'/>
            </Switch> 
            </main> 
        </div>
        );
    }
}