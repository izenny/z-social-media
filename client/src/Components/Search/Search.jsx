import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Search.css";




import { SearchApi } from "../../Api/UsersApi";
import { useNavigate } from "react-router-dom";
const Search = ({friendsId}) => {
  console.log('idsdsd',friendsId);


  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigateSearch = useNavigate();
  const submitSearch = async () => {
    try {
      const searchResult = await SearchApi(searchText);
      console.log(searchText);
      setSearchResults(searchResult);
      console.log("search result in jsx", searchResult);
      
      navigateSearch(`/searchresults/${encodeURIComponent(JSON.stringify(searchResult))}`);
      
    } catch (err) {
      console.log("search errorr in jsx");
    }
  };

  return (
    <div className="search-p">
      <div className="search-c">
        <div className="search-input-div">
          <input
            type="text"
            placeholder="Search here..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <div>
          <button className="search-button" onClick={submitSearch}>
            <BsSearch />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Search;