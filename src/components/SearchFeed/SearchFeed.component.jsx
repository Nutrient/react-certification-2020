import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Grid, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

import { SearchContext } from '../../providers/Search';


import './SearchFeed.styles.css';


function SearchFeed({query}) {

    const [searchResult, setSearchResult] = useState([]);
    const { getVideoSearch } = useContext(SearchContext);


    useEffect(() => {
        const search = async () => {
            setSearchResult(await getVideoSearch(query));
        };

        search();
    }, [getVideoSearch, query])

    return (
        <Grid container md={12} className="SearchFeedGrid">
            <Grid item md={12}>
                <h3>Search results for: {query}</h3>
            </Grid>
            <Grid container item md={12} direction="row" >
                <GridList cellHeight={180} cols={5} spacing={20} >
                    {searchResult.map((video, i) => (
                        <GridListTile cols={1} key={i}>
                            <img src={`${video.info.thumbnails.high.url}`}></img>
                            <GridListTileBar
                                title={video.info.title}
                                actionIcon={
                                    <IconButton  >
                                        <StarBorder />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        </Grid>
    );
}

export default SearchFeed;
