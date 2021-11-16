import React from "react";

const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input onChange={inputHandler} type="text" />
      {/*search 原先是自己的 function, 因為state lifting的關係被上移*/}
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
