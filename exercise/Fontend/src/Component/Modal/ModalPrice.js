import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom';
import PriceSizeLocker from '../PriceSizeLocker'
import moment from 'moment'
import { post } from '../../service/service'


export default class ModalPrice extends Component {

    constructor() {
        super();
        this.state = {
            duration_time: "",
            total_money: "",
            insert_money: "",
            change_money: "",
            data: [],
            kik: []

        }
    }

    componentWillMount() {
        this.setState({
            num_locker: this.props.num_locker,
            name: this.props.name
        })
        setTimeout(() => {
            this.compare_size_loc(this.state.num_locker)
        }, 100)
    }

    compare_size_loc(num_locker) {
        let { Size_loc, Size } = this.state
        let logger_array = [
            [1, 4, 7, 10],
            [2, 5, 8, 11],
            [3, 6, 9, 12]
        ]
        let logger_result = -1
        logger_array.map((logger_element, index) => {
            let index_logger = logger_element.indexOf(num_locker)
            if (index_logger > -1) {
                logger_result = index
            }
        })
        if (logger_result === 0) {
            Size = "Size : S"
        } else if (logger_result === 1) {
            Size = "Size : M"
        } else if (logger_result === 2) {
            Size = "Size : L"
        }
        this.setState({ Size_loc: Size })
    }


    loggerTime = (duration_time) => {
        // const { total_money } = this.state
        let time = duration_time
        let spcial_amount
        let amount = 0
        let size = this.dataFunction(this.state.num_locker)
        if (size > -1) {
            if (size === 0) {
                amount = 50
                spcial_amount = 25
            } else if (size === 1) {
                amount = 100
                spcial_amount = 50
            } else if (size === 2) {
                amount = 200
                spcial_amount = 100
            }

            if (parseInt(time / 60) >= 1) {
                amount = amount + (Math.ceil(((time - 60) / 60)) * spcial_amount)
                // return amount
            }
            this.state.total_money = amount
        } else {
            console.log("Error!! No number");
        }

    }
    dataFunction = (num_locker) => {
        let logger_array = [
            [1, 4, 7, 10],
            [2, 5, 8, 11],
            [3, 6, 9, 12]
        ]
        let logger_result = -1
        logger_array.map((logger_element, index) => {
            let index_logger = logger_element.indexOf(num_locker)
            if (index_logger > -1) {
                logger_result = index
            }
        })
        return logger_result
    }


    _on_insert_money = (insert_money) => {
        let words_string = ""
        let thousand = 0
        let Five_hundred = 0
        let hundred = 0
        let fifty = 0
        let twenty = 0
        let ten = 0
        let five = 0
        let two = 0
        let one = 0
        let total_money = this.state.total_money
        let toltal = 0
        let cal_money = insert_money - total_money
        let test = 0

        /////Show modal////
        if (insert_money) {
            toltal = insert_money - total_money
        }
        this.state.toltal = toltal


        /////show main////
        if (insert_money - total_money < 0) {
            cal_money = insert_money
        } else if (cal_money == 0) {
            words_string += 0
        }


        thousand = Math.floor(cal_money / 1000)
        if (thousand > 0) { words_string += "1000X" + Math.floor(thousand) + "\n" }
        cal_money = cal_money % 1000

        Five_hundred = Math.floor(cal_money / 500)
        if (Five_hundred > 0) { words_string += "500X" + Math.floor(Five_hundred) + "\n" }
        cal_money = cal_money % 500

        hundred = Math.floor(cal_money / 100)
        if (hundred > 0) { words_string += "100X" + Math.floor(hundred) + "\n" }
        cal_money = cal_money % 100

        fifty = Math.floor(cal_money / 50)
        if (fifty > 0) { words_string += "50X" + Math.floor(fifty) + "\n" }
        cal_money = cal_money % 50

        twenty = Math.floor(cal_money / 20)
        if (twenty > 0) { words_string += "20X" + Math.floor(twenty) + "\n" }
        cal_money = cal_money % 20

        ten = Math.floor(cal_money / 10)
        if (ten > 0) { words_string += "10X" + Math.floor(ten) + "\n" }
        cal_money = cal_money % 10

        five = Math.floor(cal_money / 5)
        if (five > 0) { words_string += "5X" + Math.floor(five) + "\n" }
        cal_money = cal_money % 5

        two = Math.floor(cal_money / 2)
        if (two > 0) { words_string += "2X" + Math.floor(two) + "\n" }
        cal_money = cal_money % 2

        one = Math.floor(cal_money / 1)
        if (one > 0) { words_string += "1X" + Math.floor(one) + "\n" }
        cal_money = cal_money % 1

        words_string = words_string.split(" ").join(" ")
        this.state.change_money = words_string



    }
    _oninput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    sento_locker() {

        let data = this.state.data
        let num_locker = this.state.num_locker
        let cal_money = this.state.insert_money - this.state.total_money
        let item_back
        if (cal_money < 0) {
            item_back = "false"
        } else {
            item_back = "true"
        }


        if (this.state.duration_time > 0 && this.state.insert_money > 0) {
            data = {
                num_locker: this.state.num_locker,
                duration_time: this.state.duration_time,
                total_money: this.state.total_money,
                insert_money: this.state.insert_money,
                change_money: this.state.change_money,
                select: "true",
                item_back: item_back,
                name: this.state.name

            }

            this._on_post_to_base(data)
            this.props.data_modal(data)
            this.props.onClose()
        } else {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน")
        }

    }

    _on_post_to_base = async (data) => {
        const object = {
            data: data
        }
        try {
            if (data) {
                await post(object, 'locker/story_locker').then((res) => {
                    if (res.success) {
                        alert("เพิ่มข้อมูลสำเร็จ")
                    } else {
                        alert("เพิ่มข้อมูลไม่สำเร็จ")

                    }

                })

            } else {

            }

        } catch (error) {

        }

    }

    render() {
        const { duration_time, total_money, insert_money, change_money } = this.state

        return (

            <div>
                <div >
                    <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bolder' }}>{`${`Locker : ${this.state.num_locker}`} ${this.state.Size_loc} `}  </div>

                    <div style={{ fontSize: 15 }}>

                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}> <PriceSizeLocker /></div>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>{`เวลา ณ ปัจจุบัน :  ${moment().format('h:mm:ss a')}`}</div>
                        <form>
                            <Row>
                                <Col>
                                    <div class="form-group">
                                        <label >จำนวนเวลาในการจอง</label>
                                        <input class="form-control" id="input-login" placeholder="Duration" type="number" name="duration_time" value={this.loggerTime(duration_time)} onChange={(e) => this._oninput(e)} />

                                    </div>

                                    <div class="form-group">
                                        <label >กรุณาระบุจำนวนเงิน</label>
                                        <input class="form-control" id="input-login" type="number" label="kik" placeholder="Insert" name="insert_money" value={this._on_insert_money(insert_money)} onChange={(e) => this._oninput(e)} />

                                    </div>
                                </Col>

                                <Col>
                                    <div class="form-group">
                                        <label style={{ marginLeft: 15 }} >คิดเป็นเงิน</label>
                                        <input class="form-control" id="input-login" disabled placeholder="Charge" name="total_money" value={duration_time > 0 ? this.state.total_money : ""} onChange={(e) => this._oninput(e)} />
                                    </div>
                                    <div class="form-group">
                                        <label style={{ marginLeft: 15 }} >เงินทอน </label>
                                        <input class="form-control" id="input-login" disabled placeholder="Change" name="change_money" value={`${this.state.toltal} บาท`} onChange={(e) => this._oninput(e)} />

                                    </div>
                                </Col>
                            </Row>
                        </form>




                        <div style={{ textAlign: 'center' }}>
                            <button onClick={() => this.sento_locker()} id="button-login" >ตกลง</button>
                            <button style={{ marginLeft: 15 }} onClick={() => this.props.onClose()} id="cancle-button" >ยกเลิก</button>
                        </div>
                    </div>
                </div>


            </div >
        )
    }

}







