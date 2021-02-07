import React, { Component } from "react";
import {
    Col,
    Container,
    Form
} from "react-bootstrap";
import Button from 'react-bootstrap-button-loader';
import * as actions from "../redux/actions/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import Validator from 'is_js';
import { Link } from "react-router-dom";

class SignUpPage extends Component {

    state = {
        email: "",
        password: "",
        name: "",
        confirm_password: "",
        errors: {}
    }

    //Function Name : onHandleChange.
    //Parameters Used : e.
    //Working : Store the values in the state.
    onHandleChange = (e) => {
        const { name, value } = e.target;
        const { errors } = this.state;

        this.setState({
            [name]: value,
            errors: {
                ...errors,
                [name]: ""
            }
        });
    }

    isValid = () => {
        const { name, email, password, confirm_password } = this.state;
        let error = {};

        if (Validator.empty(name)) {
            error.name = "User name is required!";
        }

        if (Validator.empty(email)) {
            error.email = "Email is required!";
        }

        if (!Validator.empty(email) && !Validator.email(email)) {
            error.email = "Invalid email!";
        }

        if (Validator.empty(password)) {
            error.password = "Password is required!";
        }


        if (Validator.empty(confirm_password)) {
            error.confirm_password = "Confirm Password is required!";
        }

        if (!Validator.empty(password) && !Validator.empty(confirm_password) && (password != confirm_password)) {
            console.log(password, confirm_password, 'ppppp', password != confirm_password)
            error.confirm_password = "Confirm Password must be same as password!";
        }

        this.setState({
            errors: error
        });
        return isEmpty(error)
    }


    //Function Name : signup.
    //Parameters Used : n/a.
    //Working : Used to send registerUser data.
    registerUser = () => {
        const isValid = this.isValid();
        const { name, email, password } = this.state;
        if (isValid) {
            this.props.signup({ name, email, password }).then(res => {
                if (res.status == 200) {
                    toast.success("Registered successfully.", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.props.history.push("/");
                }
            }).catch(err => {
                const message = err && err.response && err.response.data && err.response.data.message || "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
        }
    }

    render() {
        const {
            name,
            errors,
            email,
            password,
            confirm_password
        } = this.state;

        const { loadingSignup } = this.props
        console.log(errors, 'erros-signup')
        return (
            <Container className="form-pages">
                <div className="login-container">
                    <div className='login-header-div'>
                        <h3><strong>Mc Bird</strong></h3>
                    </div>
                    <div className="login-container-inner">
                        <Col md={12}>
                            <div className="login-form">
                                <div className="form-inner">
                                    <h3>Sign up</h3>
                                    <Form >
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label required >User Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter user name"
                                                name="name"
                                                value={name}
                                                autoComplete='off'
                                                onChange={(e) => this.onHandleChange(e)}
                                            />
                                            {errors.name && <div className='error-span'>
                                                {errors.name}
                                            </div>}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email Id</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                autoComplete='off'
                                                value={email}
                                                onChange={(e) => this.onHandleChange(e)}
                                            />
                                            {errors.email && <div className='error-span'>
                                                {errors.email}
                                            </div>}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                placeholder="Password"
                                                type="password"
                                                name="password"
                                                autoComplete='off'
                                                value={password}
                                                onChange={(e) => this.onHandleChange(e)}
                                            />
                                            {errors.password && <div className='error-span'>
                                                {errors.password}
                                            </div>}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicConfirmPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                placeholder="Confirm Password"
                                                type="password"
                                                name="confirm_password"
                                                autoComplete='off'
                                                value={confirm_password}
                                                onChange={(e) => this.onHandleChange(e)}
                                            />
                                            {errors.confirm_password && <div className='error-span'>
                                                {errors.confirm_password}
                                            </div>}
                                        </Form.Group>

                                        <div className="form-group">
                                            <Button className="float-right secondary" loading={loadingSignup} onClick={() => this.registerUser()}>Sign Up</Button>
                                        </div>
                                    </Form>
                                    <hr />
                                    <div className='text-center'>
                                        <span className='grayText'>Go Back to </span><Link to='/'>Sign in</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadingSignup: state.auth && state.auth.loadingSignup
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (data) => dispatch(actions.registerUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);