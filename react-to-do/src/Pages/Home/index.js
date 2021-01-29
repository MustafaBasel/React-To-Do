import React from 'react';
import styles from './style.module.scss'



export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            todo: "",
            list: [

            ]
        }

    }

    deleteItem = (item) => {
        var index = this.state.list.indexOf(item)
        if (index > -1) {
            this.state.list.splice(index, 1)
            this.setState({ list: this.state.list }, this.uptadeLocal)

        }
    }

    uptadeLocal = () => {
        var chnstr = JSON.stringify(this.state.list);
        localStorage.setItem('myData', chnstr)

    }

    getLocal = () => {

        const data = localStorage.getItem('myData')
        this.setState({ list: JSON.parse(data) })
    }

    componentDidMount() {
        this.getLocal()
    }




    checkText = (index) => {
        const { list } = this.state
        if (list[index].checked === true) {
            list[index].checked = false
        }
        else {
            list[index].checked = true
        }
        this.setState({ list: list }, this.uptadeLocal)
    }


    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    isEmptyOrSpaces = (str) => {
        return str === null || str.match(/^ *$/) !== null;

    }

    keyPress = (e) => {
        const { list, inputValue } = this.state;




        if (e.which === 13 || e.keyCode === 13) {
            if (!this.isEmptyOrSpaces(inputValue)) {
                list.push({ text: inputValue, checked: false })
                this.setState({ inputValue: '', list: list }, this.uptadeLocal)

            }
        }
    }

    render() {
        const { inputValue, list } = this.state
        console.log(list)
        return (
            <div className={styles.home}>
                <input onChange={this.handleChange} value={inputValue} onKeyPress={this.keyPress}
                    className={styles.inputBar} placeholder="What do you want to do ?">
                </input>
                <>{list.map((item, index) => {
                    return <div className={styles.keyspan} key={index}>
                        <input onClick={() => this.checkText(index)} type="checkbox" ></input>
                        <span className={list[index].checked ? styles.linethr : styles.remline} key={index}>{item.text}</span>
                        <button onClick={() => this.deleteItem(item)}>Delete</button>
                    </div>

                })}</>

            </div >
        );
    }
}






