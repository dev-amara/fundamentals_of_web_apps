import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { initBlogs } from "./reducers/blogReducer";
import { initUsers } from "./reducers/userReducer";
import Users from "./components/Users";
import Blog from "./components/Blog";
import { AppBar, Button, Container, Toolbar } from "@material-ui/core";
import { logout } from "./reducers/authReducer";
import User from "./components/User";

const App = ({ initBlogs, initUsers, user, logout }) => {
    useEffect(() => {
        initBlogs();
        initUsers();
    }, [initBlogs, initUsers]);

    const history = useHistory();


    const handleLogout = () => {
        logout()
        history.push("/login");
    }

    return (
        <Container>
            <Notification />
            {user === null ? (
                <>
                    <LoginForm />
                </>
            ) : (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit" component={Link} to="/">
                                blogs
                            </Button>
                            <Button color="inherit" component={Link} to="/users">
                                users
                            </Button>
                            {user.name} logged-in{" "}
                            <Button color="inherit" onClick={handleLogout}>
                                logout
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Switch>
                        <Route path="/users/:id">
                            <User />
                        </Route>
                        <Route path="/blogs/:id">
                            <Blog />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <BlogList />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
};

const mapStateToProps = (state) => {
    const { user } = state.auth;

    return { user };
};

export default connect(mapStateToProps, { initBlogs, initUsers, logout })(App);
