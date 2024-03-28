import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const FetchCountriesAndStates = () => {
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const fetchCountries = async () =>{
        const countries = await fetch('http://localhost:5000/api/countries/');
        const countriesJson = await countries.json();
        const sortCountries = await countriesJson.sort((a: any, b:any) =>{
            const aLow = a.name.toLowerCase()
                    const bLow = b.name.toLowerCase()
                    if(aLow > bLow){
                        return 1
                    }
                    else{
                        return -1
                    }
        })
        setCountries(sortCountries);
        return;
    }

    const fetchStates = async (countryCode: any) =>{
        if(countryCode !== "#"){
            const fetchStateList = await fetch(`http://localhost:5000/api/countries/${countryCode}/states`)
            const stateListJson = await fetchStateList.json()
            const sortCountries = await stateListJson.sort((a: any, b:any) => {
                const aLow = a.name.toLowerCase()
                        const bLow = b.name.toLowerCase()
                        if(aLow > bLow){
                            return 1
                        }
                        else{
                            return -1
                        }
            })
            setStates(sortCountries);
        }
        else{
            setStates([])
        }
    }
    
    useEffect(() => {
        fetchCountries();
      }, []); 
    
    return(
        <div id="homePage">
            <div>
                <label htmlFor="countryDrop">Select a Country: </label>
                <select name="countryDrop" id="countryDrop" onChange={(e) => fetchStates(e.target.selectedOptions[0].value)}>
                    <option key="#"value="#">Countries:</option>
                    {countries.map((country: any) => <option key={country._id} value={country.code}>{country.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="stateDrop">Select a State: </label>
                <select name="stateDrop" id="stateDrop">
                    <option key="#"value="#">States:</option>
                    {states.map((state: any) => <option key={state._id} value={state.code}>{state.name}</option>)}
                </select>
            </div>
            <Link to="/AddCountry">Add Countries</Link>
            <Link to="/AddState">Add States</Link>
        </div>
    )
}

export default FetchCountriesAndStates