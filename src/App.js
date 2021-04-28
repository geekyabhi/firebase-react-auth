import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import Login from './components/Login'
import Update from './components/Update'
import DashBoard from './components/Dashboard'
import {AuthProvider} from './contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import ForgetPassword from "./components/ForgetPassword";
function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}
      >
      <div className="w-100" style={{maxWidth:"400px"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path='/' exact><DashBoard></DashBoard></Route>
              <Route path='/signup'><Signup></Signup></Route>
              <Route path='/login'><Login></Login></Route>
              <Route path='/update'><Update></Update></Route>
              <Route path='/forgetPassword'><ForgetPassword></ForgetPassword></Route>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
      </Container>
  )
}

export default App;
