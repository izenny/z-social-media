import React from 'react'
import Users from '../Users/Users'
import { useParams } from 'react-router-dom'
import './Searchresults.css'
const Searchresults = () => {
    const { searchresults } = useParams();
    const decodedSearchResults = JSON.parse(searchresults);
  
    return (
      <div className='search-results-p'>
        <Users searchResults={decodedSearchResults} />
      </div>
    );
  };
  
  export default Searchresults;
  