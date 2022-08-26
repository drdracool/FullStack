import React from "react";

function Persons({getContent}){
    return <ul>{getContent()}</ul>;
}

export default Persons