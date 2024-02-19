import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Search.css";
// import { SearchApi } from "../../Api/UsersApi";
import { Modal, Button } from "react-bootstrap";
// import Users from "../Users/Users";
const Search = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const submitSearch = async () => {
    try {
    //   const searchResult = await SearchApi(searchText);
    //   console.log(searchText);
    //   setSearchResults(searchResult);
    //   console.log("search result in jsx", searchResult);
      setShowModal(true);
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
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-responsive"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Users searchusers={searchResults} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
