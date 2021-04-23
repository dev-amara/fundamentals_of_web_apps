import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../reducers/authReducer'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username: username, password: password })

    setUsername('')
    setPassword('')

    history.push('/')
  }

  return (
    <>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin} id="form-login">
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Username"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
                        login
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default connect(null, { login })(LoginForm)
