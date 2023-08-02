
import { Grid } from '@mui/material';
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

import React from 'react';

const Home = () => {
  return (
    <>
      <Banner/>
      <Grid container>

        <Grid item lg={2} sm={2} xs={12}>
            <Categories/>
        </Grid>
        <Grid container item lg={10} sm={10} xs={12}>
            <Posts/>
        </Grid>

      </Grid>
    </>
  )
}

export default Home;