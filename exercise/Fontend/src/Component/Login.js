import React, { Component } from 'react'
import { post } from '../service/service'
class Login extends Component {

    constructor() {
        super();
        this.state = {
            Username: "",
            PassWord: ""
        }
    }



    open_locker = async (Username, PassWord) => {

        const object = {
            Username: Username,
            PassWord: PassWord
        }

        try {
            if (Username, PassWord) {
                await post(object, 'locker/login_locker').then((res) => {
                    if (res.success) {
                        if (res.success === true) {
                            let data_user = res.result
                            this.props.history.push({
                                pathname: '/lockernumber',
                                state: data_user
                            })
                        }

                    } else {
                        alert("ชื่อผู้ใช้และรหัสผ่านไม่ตรงกัน")

                    }
                })
            }
        } catch (error) {

        }

    }

    render() {
        const { Username, PassWord } = this.state
        return (
            <div className="background">
                <div className="center-input" >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>Coin Locker</div>
                        <input style={{ fontSize: 15 }} placeholder="Username" id="input-login" value={Username} onChange={(e) => this.setState({ Username: e.target.value })} ></input>
                        <input style={{ marginTop: 10, fontSize: 15 }} type="password" value={PassWord} placeholder="Password" id="input-login" onChange={(e) => this.setState({ PassWord: e.target.value })}  ></input>
                        <div style={{ textAlign: 'center' }}>
                            <button onClick={() => this.open_locker(Username, PassWord)} id="button-login" >Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default Login