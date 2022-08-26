import React from "react";


function Filter ({handleSearchChange, searchQuery}) {
    return(
    <form>
        <div>filter shown with <input onChange={handleSearchChange} value={searchQuery}/></div>
      </form>
    )
}

export default Filter;