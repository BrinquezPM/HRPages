import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div style={{ visibility: props.searchVisibility }} className="search-bar">
      <div className="search-bar-container">
        <img
          id="search-icon"
          src="./images/main-layout/search-icon.png"
          alt="prefix-icon"
        />
        <input
          type="text"
          placeholder="e.g. John Doe"
          value={props.value}
          onChange={props.onChange}
          name="search"
          onBlur={props.onBlur}
        />
      </div>
    </div>
  );
};

export default SearchBar;
