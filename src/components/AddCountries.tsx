import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const AddCountries = () => {
    const [countries, setCountries] = useState([])
    const [newCountryName, setNewCountryName] = useState("")
    const [newCountryCode, setNewCountryCode] = useState("")
    let confirmationStatus = false

    const fetchCountries = async () =>{
        const countries = await fetch('http://localhost:5000/api/countries/');
        const countriesJson = await countries.json();
        const sortCountries = countriesJson.sort((a: any, b:any) =>{
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
    }
    
    useEffect(() => {
        fetchCountries();
      }, []); 

    const createNewCountry = async (name: string, code: string, confirmed: boolean) =>{
        if(name !== "" && code !== ""){
            if(confirmed === true){
                const posted = await fetch("http://localhost:5000/api/countries", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({name: name, code: code})
                })
                if(posted.status === 201){
                    alert("Country Added Successfully")
                }
                else if(posted.status === 409){
                    alert("Country Not Added, Conflict In Database")
                }
            }
        }
    }
    
    return(
        <div id="addCountryPage">
            <div>
                <label htmlFor="curCountries">Current Countries In Database:  </label>
                <select name="countryDrop" id="countryDrop">
                        <option key="#"value="#">Countries:</option>
                        {countries.map((country: any) => <option key={country._id} value={country.code}>{country.name}</option>)}
                </select>
            </div>
            <fieldset id="addCountry">
                <div>
                    <label htmlFor="countryName">New Countries' Name: </label>
                    <input type="text" name="countryName" id="countryName" onChange={(e) => setNewCountryName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="countryCode">New Countries' Code: </label>
                    <input type="text" name="countryCode" id="countryCode" onChange={(e) => setNewCountryCode(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirm">Add {newCountryName} To Database?</label>
                    <input type="checkbox" onChange={(e) => confirmationStatus = e.target.checked}/>
                </div>
                <button type="submit" onClick={(e) => createNewCountry(newCountryName, newCountryCode, confirmationStatus)}>Submit Country To Database</button>
            </fieldset>
            <Link to="/">Back to Home Page</Link>
        </div>
    )
}
export default AddCountries