import React ,{useRef, useState}from 'react'
import {Form,Card,Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link ,useHistory} from 'react-router-dom'

const Login = () => {
    const history=useHistory()
    const emailRef=useRef()
    const passwordRef=useRef()
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const {login}=useAuth()

    async function handleSubmit(e){
        e.preventDefault()
        try{
            seterror('')
            setloading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        }catch(e){
            console.log(e)
            seterror('Failed to sign in')
        }
        setloading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>LogIn</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="forgetPassword">Forget Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Dont have an account ? <Link to="/signup">Signup</Link>
            </div>   
        </>
    )
}

export default Login
