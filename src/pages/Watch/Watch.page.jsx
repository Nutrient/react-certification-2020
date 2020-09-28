import React from 'react';
import { Grid } from '@material-ui/core';

import { useParams } from "react-router-dom";

import './Watch.styles.css';

import VideoPlayer from '../../components/VideoPlayer';
import RecommendationFeed from '../../components/RecommendationFeed';

function WatchPage() {
    const { id } = useParams();

    
    return (
        <section className="Watch">
            <Grid container md={12}>
                <Grid item md={9} className="WatchPageVideoPlayer" >
                    <VideoPlayer videoId={id}/>
                </Grid>
                
                <Grid container item md={3} justify="center">
                    <Grid container item md={12}  >
                        <RecommendationFeed videoId={id}/>
                    </Grid>
                </Grid>
            </Grid>
        </section>
    );
}

export default WatchPage;
