import './styles/styles.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './configs/firebase';
import { authIsChecked } from './store';

import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Details from './pages/Details';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import MyList from './pages/MyList';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      const currentUser = user
        ? {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
          }
        : null;
      dispatch(authIsChecked(currentUser));

      // only want to call the listener once in the beginning
      return () => unsubscribe();
    });
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:listType"
            element={user ? <MyList /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/movie/:id" element={<Details />} /> */}
          {/* <Route path="/tv/:id" element={<Details />} /> */}
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
