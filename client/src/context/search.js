import { useState, useContext, createContext } from "react";

const SearchContext = createContext(); //creating context here

//search provider created with this we can access anywhere in the app
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
