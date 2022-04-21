import Component from './Component'

class Couter extends Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 }
    }

    addNumber(event) {
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
        // console.log('调和完成✅', this.state.number);
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.addNumber}>➕</button>
            </div>
        )
    }
}

export default Couter