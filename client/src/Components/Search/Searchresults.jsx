import React from 'react'
import Users from '../Users/Users'
import { useParams } from 'react-router-dom'
import './Searchresults.css'
const Searchresults = ({userId}) => {
    const { searchresults } = useParams();
    const decodedSearchResults = JSON.parse(searchresults);
  
    return (
      <div className='search-results-p'>
        <Users searchResults={decodedSearchResults} userId ={userId}/>
      </div>
    );
  };
  
  export default Searchresults;
  