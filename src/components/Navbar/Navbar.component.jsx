import React, { createRef } from 'react';
import { useHistory } from 'react-router';

import { Grid, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './Navbar.styles.css';

function Navbar() {
  const history = useHistory();
  const searchRef = createRef();

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

  return (
    <Grid container item alignItems="center" className="NavbarContainer">
      <Grid container item md={2} justify="center" className="NavBarTitle">
        <span>WizeTube</span>
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
            <SearchIcon className="NavbarSearchIconColor" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container item md={2} justify="flex-end" alignItems="center" spacing={8}>
        <Button variant="contained" size="small">
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default Navbar;
