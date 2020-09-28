import React from 'react';

import { Grid, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './Navbar.styles.css';

function Navbar() {
  return (
    <Grid container item alignItems="center" className="NavbarContainer">
      <Grid container item md={2} justify="center" className="NavBarTitle">
        <span>WizeTube</span>
      </Grid>
      <Grid container item md={8} alignItems="center" spacing={0}>
        <Grid item xs={10}>
          <input type="text" className="NavBarInput" placeholder="Search" />
        </Grid>
        <Grid container item md={2} justify="flex-start">
          <IconButton color="default" className="NavbarSearchIcon">
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
