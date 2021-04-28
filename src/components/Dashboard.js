import React ,{useState} from 'react'
import {Card,Button,Alert}from 'react-bootstrap'
import {useHistory,Link} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
const Dashboard = () => {
    const history=useHistory()
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const {logout,currentUser}=useAuth()

    async function handleLogout(){
        try{
            setloading(true)
            await logout()
            setloading(false)
        }catch(e){
            setloading(false)
            seterror('Unable to Logout')
        }
    }

    if(!currentUser){
        history.push("/login")
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error &&<Alert variant="danger">{error}</Alert>}
                    {currentUser?<><strong>Email : </strong> {currentUser.email}</>:<div></div>}
                    <Link to="update" className="btn btn-primary w-100 mt-3">Update</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
