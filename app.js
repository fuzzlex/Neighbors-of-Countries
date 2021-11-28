const container = document.querySelector(".container");
const countryValue = document.getElementById("country-value")
const newCountries = document.querySelector(".new-countries")


window.onload =  () =>{
	 callCountryAll()



}
const callCountryAll = async () => {
	try{
    let response = await fetch("https://restcountries.com/v3.1/all");
    let countryName = await response.json()

    countryName
        .map(array => array.name.common)
        .forEach(country => {
            countryValue.innerHTML += ` <option value="${country}">${country}</option>`
        });


        
    } catch (error) {
        return "Something is wrong!!!"
        
    }
    
}

countryValue.addEventListener("change",  (e)=>{
    valueCountry = e.target.value;
    
     showCountry(valueCountry) 
     if(newCountries.textContent !== "" ) newCountries.innerHTML = ""
     
 
 })






const openCountryApiName = async countryName =>{
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        if(!response.ok) throw new Error(`Something is wrong!! ${response.status}`)
        const jsonData = await response.json();
        return jsonData[0]
        
    } catch (error) {
        return "Something is wrong!!!"
        
    }
    
}



const openCountryApiClass = async countryClass =>{
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryClass}`)
        if(!response.ok) throw new Error(`Something is wrong!! ${response.status}`)
        const jsonData = await response.json();
        return jsonData[0]
        
    } catch (error) {
        return "Something is wrong!!!"
        
    }
    
}
const showCountry = async countryName =>{
    const dataName = await openCountryApiName(countryName);
    renderCountry(dataName)
    const countryClass = dataName.borders;
    countryClass.forEach(async element => {
        const dataClass = await  openCountryApiClass(element);
        renderCountry(dataClass)
    });
    
   



    }


const renderCountry = (data) =>{
    const {
        name : {common : countryName},
        region,
        capital,
        flags: {svg: countryflag},
    } = data;

   const innerHTML = `<div class="country">
    <h1>${countryName}</h1>
    <h3> Capital : ${capital}</h3>
    <h3> Region : ${region}</h3>
    <img style="width:20rem" src="${countryflag}"/></div>
    `
    newCountries.insertAdjacentHTML("beforeend", innerHTML)

}





