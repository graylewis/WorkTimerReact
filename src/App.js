import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './stylesheets/main.scss';

// PAGES
import Landing from './components/pages/landing'
import Login from './components/pages/login'
import Register from './components/pages/register'
import TimerPage from './components/pages/timerPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <PrivateRoute path="/timer">
          <TimerPage></TimerPage>
        </PrivateRoute>
        <Route path="/">
          <Landing></Landing>
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
