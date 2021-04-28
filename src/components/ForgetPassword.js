import React ,{useRef, useState}from 'react'
import {Form,Card,Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link ,useHistory} from 'react-router-dom'

const ForgetPassword = () => {
    const history=useHistory()
    const emailRef=useRef()
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState('')
    const {resetPassword}=useAuth()

    async function handleSubmit(e){
        e.preventDefault()
        try{
            seterror('')
            setloading(true)
            await resetPassword(emailRef.current.value)
            setmessage('Check your inbox for further instruction')
        }catch(e){
            console.log(e)
            seterror('Failed to reset password')
        }
        setloading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message &&<Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default ForgetPassword