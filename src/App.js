import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './Components/Context/AuthContext';
import CreatePost from './Components/CreatePost/Create';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import SignUp from './Components/SignUp/SignUp';

import './App.css';

import SinglePostPage from './Components/SinglePost/SinglePostPage';
import Login from './Components/Login/Login';
import SingleSubreddit from './Components/SingleSubreddit/SingleSubreddit';
import PrivateFeed from './Components/PrivateFeed/PrivateFeed';
import UserProfile from './Components/UserProfile/UserProfile';
import Settings from './Components/Settings/Settings';

function App() {
  return (
    <div className="App">
      
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/create-post">
              <CreatePost />
            </Route>
            <Route exact path="/post/:postID">
              <SinglePostPage />
            </Route>
            <Route path='/feed'>
              <PrivateFeed />
            </Route>
            <Route path='/settings'>
              <Settings />
            </Route>
            <Route path="/subreddit/:subreddit">
              <SingleSubreddit />
            </Route>
            <Route path="/user/:username">
              <UserProfile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>

          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
