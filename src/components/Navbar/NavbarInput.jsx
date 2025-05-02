import { useEffect, useRef } from "react";


function NavbarInput({ query, setQuery }) {
  const inputEl = useRef(null)
    
  useEffect(function(){
    inputEl.current.focus()
    console.log(inputEl.current);
    
    
  }, [])
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    );
  }
  export default NavbarInput;