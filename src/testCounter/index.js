import React from 'react';

class Couter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 }
    }

    addNumber = (event) => {
        this.setState({
            number: this.state.number + 1
        })
        console.log('1', this.state.number);
        this.setState({
            number: this.state.number + 1
        })
        console.log('2', this.state.number);

        setTimeout(() => {
            this.setState({
                number: this.state.number + 1
            })
            console.log('3', this.state.number);
            this.setState({
                number: this.state.number + 1
            })
            console.log('4', this.state.number);
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.addNumber}>➕</button>
            </div>
        )
    }
}

export default Couter