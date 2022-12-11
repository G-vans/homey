import "../styles/Filter.css";

export default function Filter({input, setFilter, filterProperties, properties }) {
  return (
    <div className="filter">
      <div className="category-buttons">
        <p className="instruction">Categories:</p>
        <p onClick={() => setFilter(properties)}>All</p>
        <p onClick={() => filterProperties("Residential")}>Residential</p>
        <p onClick={() => filterProperties("Commercial")}>Commercial</p>
        <p onClick={() => filterProperties("Industrial")}>Industrial</p>
        <p onClick={() => filterProperties("Agricultural")}>Agricultural</p>
      </div>
      <div className="filter-container">
        <div className="wrap">
          <div className="search">
            <input type="text" className="searchTerm" placeholder="What property are you looking for?" onChange={(e) => input(e.target.value.toLocaleUpperCase())}/>
            <button type="submit" className="searchButton">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
