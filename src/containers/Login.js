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

class LoginPage extends Component {

    state = {
        email: "",
        password: "",
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
        const { email, password } = this.state;
        let error = {}

        if (Validator.empty(email)) {
            error.email = "Email is required!";
        }

        if (!Validator.empty(email) && !Validator.email(email)) {
            error.email = "Invalid email!";
        }

        if (Validator.empty(password)) {
            error.password = "Password is required!";
        }
        console.log(error, 'errors===', isEmpty(error))
        this.setState({
            errors: error
        });
        return isEmpty(error)
    }


    //Function Name : login.
    //Parameters Used : n/a.
    //Working : Used to send login credentials.
    login = () => {
        const { email, password } = this.state;

        const isValid = this.isValid();

        if (isValid) {
            this.props.login({ login: email, password }).then(res => {
                if (res.status == 200) {
                    toast.success('Logged in successfully!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.props.history.push("/dashboard");
                }
            }).catch(err => {
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
        }
    }

    render() {
        const {
            errors,
            email,
            password
        } = this.state;

        const { loading } = this.props

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
                                    <h3>Login</h3>
                                    <Form >
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email Id</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => this.onHandleChange(e)}
                                                autoComplete='off'
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

                                        <div className="form-group">
                                            <Button className="float-right primary" loading={loading} onClick={() => this.login()}>Sign In</Button>
                                        </div>
                                    </Form>
                                    <hr />
                                    <div className='text-center'>
                                        <span className='grayText'>Don't have an account ? </span><Link to='/signup'>Sign up</Link>
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
        loading: state.auth && state.auth.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(actions.loginUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);