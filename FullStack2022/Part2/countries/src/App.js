
import './App.css';
import { useState } from 'react';
import GetResults from './components/GetResults';

const App = () => {
  const [query, setQuery] = useState([]);

  const handleQueryChange = event => {
    event.preventDefault();
    setQuery(event.target.value);
  }

  return (
    <div>
    <form>
      <div>
        find countries: <input onChange={handleQueryChange} value={query}/>
      </div>
    </form>
    <GetResults query={query}/>
    </div>
  );
}

export default App;
