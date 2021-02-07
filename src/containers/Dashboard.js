import React, { Component } from "react";
import * as actions from "../redux/actions/teams";
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10
        }
    }

    componentDidMount() {
        this.props.getTeamsData();
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: +event.target.value
        })
    };

    render() {
        const { teamsData, loading } = this.props
        const { rowsPerPage, page } = this.state
        return (
            <div className='dashboard-wrap'>
                <Typography variant="h6" color="inherit" className='title my-2'>
                    Teams Details
                </Typography>
                <TableContainer component={Paper} >
                    <Table className={'dashboard-table'} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell >Team Name</TableCell>
                                <TableCell >Email Id</TableCell>
                                <TableCell >Establishment</TableCell>
                                <TableCell >Host Name</TableCell>
                                <TableCell >Country</TableCell>
                                <TableCell >Website</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teamsData && teamsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                                <TableRow key={data.id}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell >{data.team}</TableCell>
                                    <TableCell className='cust-column' title={data.email}>{data.email}</TableCell>
                                    <TableCell >{data.establishment || '-'}</TableCell>
                                    <TableCell className='cust-column' title={data.host} >{data.host}</TableCell>
                                    <TableCell >{data.country}</TableCell>
                                    <TableCell className='cust-column' >
                                        {data.website ?
                                            <a href={data.website[0]} target='blank'>{data.website[0]}</a>
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={teamsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teamsData: state.teams && state.teams.data,
        loading: state.employees && state.employees.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTeamsData: (data) => dispatch(actions.getTeamsDetails(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)