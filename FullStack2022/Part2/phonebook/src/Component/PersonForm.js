import React from "react";

function PersonForm ({addPerson, handleNameChange, handleNumberChange}) {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}  id='name'/>
        </div>
        <div>number: <input onChange={handleNumberChange} id='number'/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm