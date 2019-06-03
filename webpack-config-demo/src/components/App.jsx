import React, { Component } from 'react';
import styles from '@/assets/styles/App.less';
import logo from '@/assets/images/logo.png';
import whatALoser from '@/assets/images/whatALoser.png';

console.log(whatALoser);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'hello react.',
            lorem: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ullam, voluptate autem ipsam animi temporibus sunt a. Quo quasi ducimus sunt deleniti aliquam praesentium distinctio, sapiente voluptate consequatur ullam alias?'
        };
    }

    render() {
        return <div className={styles.app}>
            <img src={logo} alt="logo"/>
            <br />
            {this.state.lorem}
            <p className={styles.test}>{this.state.text}</p>
            <button className="btn btn-primary">button</button>
        </div>;
    }
}

export default App;
