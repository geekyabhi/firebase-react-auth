import React ,{useRef, useState}from 'react'
import {Form,Card,Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
const Signup = () => {
    const history=useHistory()
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const {signUp,currentUser}=useAuth()

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return seterror('Password do not match')
        }
        try{
            seterror('')
            setloading(true)
            await signUp(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        }catch(e){
            console.log(e)
            seterror('Failed to create account')
        }
        setloading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {currentUser&& <Alert variant="success">{currentUser.email} created</Alert>}
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
                        <Form.Group id="confirm-password">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>SignUp</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to="/login">Login</Link>
            </div>   
        </>
    )
}

export default Signup
