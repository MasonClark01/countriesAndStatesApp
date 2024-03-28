import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddState = () =>{
    const [curCountry, setCurCountry] = useState("")
    const [curCountryName, setCurCountryName] = useState("")
    const [countries, setCountries] = useState([])

    const [stateName, setStateName] = useState("")
    const [stateCode, setStateCode] = useState("")
    const [confirmationStatus, setConfirmationStatus] = useState(false)

    const setCountryData = (countryId: string, countryName: string) =>{
        if(countryId !== "#" && countryName !== "Countries:"){
            setCurCountryName(countryName + "?")
            setCurCountry(countryId)
        }
        else{
            setCurCountryName("")
            setCurCountry("")
        }
    }
    
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
    };

    useEffect(() => {
        fetchCountries();
      }, []); 

    const createNewState = async (name: string, code: string, countryId: string, confirmed: any) =>{
        if(name !== "" && code !== "" && countryId !== ""){
            if(confirmed === true){
                const convertCountryId = parseInt(countryId)
                const posted = await fetch("http://localhost:5000/api/states", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({name: name, code: code, countryId: convertCountryId})
                })
                if(posted.status === 201){
                    alert("State added Successfully")
                }
                else if(posted.status === 409){
                    alert('State Not Added, Conflict in Database')
                }
            }
        }
    };
    
    return(
        <div id="addStatePage">
            <div>
                <label htmlFor="countryDropStatePage">Add New State To:  </label>
                <select name="countryDropStatePage" id="countryDropStatePage" onChange={(e)=> setCountryData(e.target.selectedOptions[0].value, e.target.selectedOptions[0].innerText)}>
                        <option key="#"value="#">Countries:</option>
                        {countries.map((country: any) => <option key={country._id} value={country._id}>{country.name}</option>)}
                </select>
            </div>
            <div>
                <fieldset id="addState">
                    <div>
                        <label htmlFor="stateName">New State's Name: </label>
                        <input type="text" id="stateName" onChange={(e) => setStateName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="stateCode">New State's Code: </label>
                        <input type="text" id="stateCode" onChange={(e) => setStateCode(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="confirm">Add State To: {curCountryName}   </label>
                        <input type="checkbox" onChange={(e) => setConfirmationStatus(e.target.checked)}/>
                    </div>
                    <button onClick={(e) => createNewState(stateName, stateCode, curCountry, confirmationStatus)}>Submit State To Database</button>
                </fieldset>
            </div>
            <Link to="/">Back to Home Page</Link>
        </div>
    )
}

export default AddState