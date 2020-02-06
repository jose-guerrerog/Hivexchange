import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import app from './views/app';
import main from './views';
import Login from './views/Login';
import Lottie from 'react-lottie';
import animationData from './splash-screen.json'

function App() {

  const [showSVGLoader, setShowSVGLoader] = useState(false);
  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  useEffect(() => {
    setShowSVGLoader(true);
  }, []);

   
  const PrivateRoute = ({ component: Component, ...props }) => {
    const token = localStorage.getItem('token');
    return (
      <Route
        {...props}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  if (showSVGLoader) {
    return (
      <div>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
        eventListeners={[
          {
            eventName: 'complete',
            callback: obj => {
              setShowSVGLoader(false);
            }
          }
        ]}
      />
    </div>

    )
  }

  return (
      <div>
        <Router>
          <Switch>
            <PrivateRoute path="/app" component={app} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={main} />
          </Switch>
        </Router>
      </div>
  )
}

export default App;
