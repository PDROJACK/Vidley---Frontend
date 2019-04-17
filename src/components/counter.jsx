import React ,{Component} from 'react';

export default class Counter extends Component {
    state = {
        count: 1,
    }
    render(){
        return(
            <div>
                <span>{this.formatHandler()}</span>
                <button>Increment</button>
            </div>
        );
    }

    formatHandler(){
        const { count } = this.state;
        return count === 0 ? 'Zero':count;
    }
}