import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Paper, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

const Users = ({ users }) => {
    return (
        <div>
            <div className="c-users">
                <h2>Users</h2>
                {!users.length && <p>There are no Users to display</p>}
                {users.length > 0 && (
                    <TableContainer component={Paper}>
                        <table className="table striped">
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Blogs</TableCell>
                                </TableRow>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>
                                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                                        </TableCell>
                                        <TableCell>{user.blogsCreated}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const users = state.users.map((user) => {
        const blogsCreated = user.blogs.length;

        return {
            username: user.username,
            name: user.name,
            id: user.id,
            blogsCreated,
        };
    });

    return { users };
};

export default connect(mapStateToProps)(Users);
