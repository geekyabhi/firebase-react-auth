import React ,{useRef, useState}from 'react'
import {Form,Card,Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
const Update = () => {
    const history=useHistory()
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const {updateEmail,updatePassword,currentUser}=useAuth()

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return seterror('Password do not match')
        }

        const promises=[]
        setloading(true)
        seterror('')
        if(emailRef.current.value!==currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(()=>{seterror('Failed to update account')}).finally(()=>{setloading(false)})
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser?currentUser.email:null} placeholder="Leave blank to keep the same"></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"></Form.Control>
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Update</Button>
                    </Form>
                </Card.Body>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
            </Card>
        </>
    )
}

export default Update
