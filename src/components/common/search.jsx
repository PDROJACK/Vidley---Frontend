import React from "react";

const SearchBox =({value, onChange})=>{
    return(
        <input
            placeholder="search..."
            value={value}
            type= "text"
            name="query"
            onChange={e=>onChange(e.currentTarget.value)}
        />
    );
}

export default SearchBox;