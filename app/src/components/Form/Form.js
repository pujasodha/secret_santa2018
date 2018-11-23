import React, { Component } from 'react';
import { rejects } from 'assert';
import { toast, ToastContainer, Slide } from 'react-toastify';


export default class Form extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        }
        fetch("http://localhost:4000/createUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(function (response) {
            if (response.code){
                return Promise.reject(response)
            }
            toast.success("you are now registered ggwp", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                transition: Slide
            })
            document.getElementById("name").value = ""
            document.getElementById("email").value = ""
            console.log("you are now registered ggwp")
        }).catch(function (err) {
            let message =""
            switch (err.errno) {
                case 1062:
                    message = "This Email Already Exists"
                    console.error("this email already exist")
                    break;
            
                default:
                    message = "Something went wrong"
                    console.error("something went wrong")
                    break;
            }
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    transition: Slide
                })
        });
    }
    

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Name</label>
                    <input type="text" id="name" name='name' required/>
                    <label>Email</label>
                    <input type="email" id="email" name='email'  required/>
                    <input type = 'submit' />
                </form>
                <ToastContainer autoClose ={1000}/>
            </div>
        );
    }
}