import React, { Component } from "react";
import { withRouter } from 'react-router';
import { Col } from 'react-bootstrap';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logOut } from "../utils";


class Header extends Component {

    logoutDialouge = () => {
        logOut("admin-session")
            .then(res => {
                this.props.history.push("/");
            });
    }
    render() {
        return (
            <Col md={12} className='cust-header'>
                <Typography variant="h6" color="inherit" className='title'>
                    McBird
                </Typography>
                <IconButton
                    edge="end"
                    title='logOut'
                    color="inherit"
                    aria-label="logout"
                    onClick={() => this.logoutDialouge()}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Col>
        );
    }
}

export default withRouter(Header);