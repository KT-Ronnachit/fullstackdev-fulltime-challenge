import React, { Component } from 'react'
import './Locker.css'
import moment from 'moment'
import PriceSizeLocker from './PriceSizeLocker'
import Modal from 'react-responsive-modal';
import ModalPrice from './Modal/ModalPrice'
import socketIOClient from 'socket.io-client'
import { Row, Col } from 'reactstrap'




class LockerNumber extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            data_modal: [],
            duration_time: "",
            money_number: "",
            mo_change_money: [],
            end_time: "",
            num_locker: "",
            story_locker: [],
            message: [],
            endpoint: "https://server-coinlocker.herokuapp.com"

        }
    }
    back_homepage() {
        window.location.href = '/'
    }

    select_locker(num_loc) {

        this.setState({
            num_locker: num_loc
        })

        let status = true
        this.state.message.map((message_element) => {
            if (message_element.num_locker === num_loc) {
                status = false
            }
        })

        if (status) {
            this.onOpenModal()
        } else {
            alert("ไม่สามารถจองได้")
        }

    }


    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };

    _on_data_modal(data) {

        let { item_back, data_number } = this.state
        this.setState({
            data_number: data.num_locker,
            item_back: data.item_back
        })

        const { endpoint } = this.state
        const socket = socketIOClient(endpoint)
        socket.emit('sent-message', data)


    }

    componentDidMount() {
        this.response()
        let data_user = this.props.location.state
        let name = ""
        name = data_user.name
        this.setState({ name })


    }
    response = () => {
        const { endpoint, message } = this.state
        const temp = []
        const socket = socketIOClient(endpoint)
        socket.on('new-message', (messageNew) => {
            temp.push(messageNew)
            this.setState({ message: temp })

        })



    }

    changeInput = (e) => {
        this.setState({ input: e.target.value })
    }

    render() {
        let { num_loc } = this.state

        const { open, message } = this.state;
        return (
            <div className="background" >
                <div >

                    <nav class="navbar navbar-light bg-light justify-content-between">
                        <a></a>
                        <a class="navbar-brand"  > Coin Locker</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-item">{this.state.name}</a>

                                    </li>
                                    <li class="nav-item">
                                        <button class="nav-item" onClick={() => this.back_homepage()} id="button-logout" >Log Out</button>
                                    </li>

                                </ul>
                            </div>
                        </button>
                    </nav>




                    {/* < div style={{ textAlign: 'center', paddingTop: 20, fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
                        Coin Locker
                       
                    </div> */}

                    <div style={{ paddingLeft: 200, fontSize: 20, fontWeight: "bolder", marginTop: 50 }}>Locker Number</div>
                    <div className="center-locker">
                        <table id="loceker" >
                            <thead  >
                                <tr>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                </tr>
                            </thead>

                            <tbody style={{ cursor: 'pointer' }}>

                                <tr>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 1)}>1</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 2)}>2</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 3)}>3</h2></td>
                                </tr>
                                <tr>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 4)}>4</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 5)}>5</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 6)}>6</h2></td>
                                </tr>
                                <tr>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 7)}>7</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 8)}>8</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 9)}>9</h2></td>
                                </tr>
                                <tr>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 10)}>10</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 11)}>11</h2></td>
                                    <td><h2 className="lockernumber" onClick={() => this.select_locker(num_loc = 12)}>12</h2></td>
                                </tr>

                            </tbody>
                        </table>

                        <table id="loceker_story" style={{ width: 800, marginLeft: 15 }}>
                            <tr>
                                <th></th>
                                <th >Story</th>
                                <th>Unit selected</th>
                                <th>Can select?</th>
                                <th>Duration of deposit (Minutes)</th>
                                <th>Insert</th>
                                <th>Charge</th>
                                <th >Change</th>
                                <th>Got item back?</th>

                            </tr>
                            {
                                message.map((el, index) => {
                                    return (<tr >
                                        <td>{index + 1}</td>
                                        <td>{`${el.name} select unit of ${el.num_locker} and insert ${el.insert_money} baht for charge`}</td>
                                        <td>{el.select}</td>
                                        <td>{el.num_locker}</td>
                                        <td>{el.duration_time}</td>
                                        <td>{el.insert_money}</td>
                                        <td>{el.total_money}</td>
                                        <td style={{ textAlign: "left" }}>{el.change_money}</td>
                                        <td>{el.item_back}</td>

                                    </tr>
                                    )
                                })
                            }




                        </table>




                    </div>



                    <Modal open={open} onClose={this.onCloseModal} center>

                        <ModalPrice {...this.state} data_modal={(data) => this._on_data_modal(data)} onClose={this.onCloseModal} />
                    </Modal>

                </div>
            </div >

        )
    }
} export default LockerNumber

