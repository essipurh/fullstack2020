import React, { useState,useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setNewSearch] = useState('')
  const countriesToShow = countries.filter(country => country.name.toLowerCase().match(searchCountry.toLowerCase()))


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        
      })
  },[])
 

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleClick = (country) => {
    setNewSearch(country.name)
  }
  
  return (
    <div>
      <form>
        <div>
          Find countries
          <input 
            value={searchCountry}
            onChange={handleSearch}
          />
        </div>
      </form>
      <div>
        <Countries countriesToShow={countriesToShow} onClick={handleClick} />
      </div>
    </div>
  )
}

export default App;
