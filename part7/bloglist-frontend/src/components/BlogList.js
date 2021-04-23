import React, { useState } from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const BlogList = ({ blogsToShow }) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <h2>blog app</h2>

      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>create new note</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm setLoginVisible={setLoginVisible} />
      </div>

      <TableContainer component={Paper}>
        <table className="table striped">
          <TableBody>
            {blogsToShow.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </TableContainer>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { blogs } = state
  const blogsToShow = [...blogs].sort((a, b) => b.likes - a.likes)

  return { blogsToShow }
}

export default connect(mapStateToProps, {})(BlogList)
