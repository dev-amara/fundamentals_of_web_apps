import React from "react";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

const User = ({ users }) => {
    const match = useRouteMatch("/users/:id");
    const oneUser = match ? users.find((user) => user.id === match.params.id) : null;

    return (
        <>
            {oneUser && (
                <div>
                    <h2>{oneUser.name}</h2>

                    <p>added blogs</p>
                    <ul>
                        {oneUser.blogs.map((blog) => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    const { users } = state;

    return { users };
};

export default connect(mapStateToProps)(User);
