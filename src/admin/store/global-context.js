import { createContext, useState } from "react";
import axios from "axios";

const GlobalContext = createContext({
  idParameter: '',
  handleChange: () => { },
  handleType: () => { },
  handledate: () => { },
  handleSearch: () => { },
  countryChange: () => { },
  getAllAdminHomeID: () => { },
});

export function GlobalContextProvider(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [searchType, setSearchType] = useState("Clients");
  const [daterange, setdaterange] = useState("Date");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchFor, setSearchFor] = useState("");
  const [search, setSearch] = useState("");
  const [param, setparam] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.label);
    setSelectedOption(e);
  };
  let idParameter;
  const handleSearch = (e) => {
    setSearch((prevState) => {
      let data = e.map((item) => {
        return item.label;
      });
      return (prevState = data);
    });
    setSearchFor(e);
    idParameter = e.map(item => item.value).join(',');
    setparam(idParameter);
  };

  const handleType = (e) => {
    setSearchType(e.label);
    setSelectedType(e);
  };

  const handledate = (e) => {
    let date = e.target.value;
    let dateRange = date.split("-");
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
    setdaterange(date);
  };

  let carehomeId = "";
  const countryChange = (event) => {
    if (event.target.value) {
      console.log("=======", event)
      setSelectedCountry(event.target.value);
      console.log(event.target.value);
      carehomeId = event.target.value;
      console.log(carehomeId, "carehomeId2")
      localStorage.setItem("carehomeId", event.target.value);
    }
  };

  const getAllAdminHomeID = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/careHomelisting`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let carehome = res.data.listing;
        console.log(res, "careHomelisting");
        localStorage.setItem('carehomeId', carehome[0]?._id);
        localStorage.setItem('carefacility', carehome[0]?.carefacility);
        localStorage.setItem('companyName', carehome[0]?.companyName);
        localStorage.setItem('carehomeName', carehome[0]?.careSiteName);
        setData(carehome);
      })
      .catch((error) => console.error(`Error, ${error}`));
  };

  const context = {
    selectedOption: selectedOption,
    searchInput: searchInput,
    selectedType: selectedType,
    searchType: searchType,
    daterange: daterange,
    startDate: startDate,
    endDate: endDate,
    search: search,
    searchFor: searchFor,
    idParameter: idParameter,
    param: param,
    selectedCountry: selectedCountry,
    data: data,
    handleSearch: handleSearch,
    handleChange: handleChange,
    handleType: handleType,
    handledate: handledate,
    countryChange: countryChange,
    getAllAdminHomeID: getAllAdminHomeID,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
