import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

import { jobsData } from "../assets/assets";

export const AppContextProvider = (props) => {
  let [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  let [isSearched, setIsSearched] = useState(false);

  let [jobs, setJobs] = useState([]);

  let [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  //Function to fetch jobs
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
