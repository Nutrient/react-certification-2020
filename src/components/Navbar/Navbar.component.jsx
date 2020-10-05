import React, { useState, createRef, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Grid, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';
import LoginModal from '../../modals/Login';
import { AUTH_USER_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';

import './Navbar.styles.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState({});
  const userInfo = storage.get(AUTH_USER_KEY);

  const history = useHistory();
  const searchRef = createRef();
  const { logout, authenticated } = useAuth();

  useEffect(() => {
    setIsLogged(authenticated);
  }, [authenticated]);

  function search(query) {
    if (query && query !== '') {
      history.push(`/search/${query}`);
    }
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      search(e.target.value);
    }
  }

  function handleIconClick() {
    search(searchRef.current.value);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container item alignItems="center" className="NavbarContainer">
      <Grid container item md={2} justify="center" className="NavBarTitle">
        <Link to="/">
          <span>WizeTube</span>
        </Link>
      </Grid>
      <Grid container item md={8} alignItems="center" spacing={0}>
        <Grid item xs={10}>
          <input
            type="text"
            className="NavBarInput"
            placeholder="Search"
            onKeyDown={handleEnter}
            ref={searchRef}
          />
        </Grid>
        <Grid container item md={2} justify="flex-start">
          <IconButton
            color="default"
            className="NavbarSearchIcon"
            onClick={handleIconClick}
          >
            <SearchIcon title="search" className="NavbarSearchIconColor" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container item md={2} justify="flex-end" alignItems="center" spacing={8}>
        {isLogged && userInfo ? (
          <Grid container item md={12} justify="center" alignItems="center">
            <Grid
              container
              item
              md={9}
              justify="space-around"
              alignItems="center"
              spacing={0}
            >
              <Grid item md={6}>
                <Button style={{ fontSize: '10px', color: 'ivory', width: '50%' }}>
                  <Link to="/favorites">Favorites</Link>
                </Button>
              </Grid>
              <Grid item md={6}>
                <Button
                  onClick={logout}
                  style={{ fontSize: '10px', color: 'ivory', width: '50%' }}
                >
                  Log out
                </Button>
              </Grid>
            </Grid>

            <Grid container item md={3} justify="flex-end" alignItems="flex-end">
              <img
                src={userInfo.avatarUrl}
                alt={userInfo.name}
                className="NavBarAvatar"
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Button variant="contained" size="small" onClick={handleOpen}>
              Login
            </Button>
            <LoginModal open={open} handleClose={handleClose} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Navbar;
