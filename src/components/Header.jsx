// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout, auth, db } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import './Header.css';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [userName, setUserName] = useState(null);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    async function fetchUserName() {
      if (user) {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserName(doc.data().name);
            });
          } else {
            console.log('No matching documents.');
          }
        } catch (error) {
          console.error('Error fetching user name: ', error);
        }
      } else {
        setUserName(null);
      }
      setFetching(false);
    }

    fetchUserName();
  }, [user]);

  if (loading || fetching) {
    return <p>Loading...</p>;
  }
  return (
    <div className="header-container">
      <div className="navbar-collapse">
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user && (
            <>
              <Link to="/countries" className="nav-link">
                Countries
              </Link>
              <Link to="/favourites" className="nav-link">
                Favourites
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
          {user && (
            <Link to="#" className="nav-link" onClick={logout}>
              Logout
            </Link>
          )}
        </nav>
        <p className="welcome">{userName ? `Hello ${userName}!` : 'Guest!'}</p>
      </div>
    </div>
  );
};

export default Header;
