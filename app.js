function searchOfCountry(){

    inputtedValue = document.querySelector("#input-field").value;  
    let description ; 
    let res ; 
    let latlongArr ; 
    let flag ;
    let capital ; 
    let subRegion ; 
    let continent ; 
    let area ; 
    let languages = "" ; 
    let countryName = document.querySelector("#country-name");
    let errorMessage = document.querySelector("#error");
    fetch("https://raw.githubusercontent.com/mledoze/countries/master/countries.json").then(response =>{
        return response.json(); 
    }).then(data => {
        for (let obj of data){
           inputtedValue = inputtedValue[0].toUpperCase() + inputtedValue.slice(1);
           if(inputtedValue ==  obj.name.common) {
                errorMessage.style.display= "none";
                description = obj.name.official; 
                flag = obj.flag ; 
                capital = obj.capital ; 
                latlongArr = obj.latlng;
                subRegion = obj.subregion ; 
                continent = obj.region;
                for(let o in obj.languages){
                    languages+= obj.languages[o] + " \n" ; 
                }
                area = obj.area ;   
                break ;
           }
           else{
                res = "Sorry bro !"
             }
        }
        if(description === undefined){
            console.log("Getlak ehna !");
            
            errorMessage.innerHTML = "Inexistant country";           
            errorMessage.style.display= "block";
            return false ; 
        }
        console.log(res);

        let countryFlag = document.querySelector("#flag");
        let countryCapital  = document.querySelector("#capital");
        let countryLanguages =  document.querySelector("#languages");
        let countryContinent =  document.querySelector("#continent");
        let countrySubRegion =  document.querySelector("#sub-region");
        let countryArea =  document.querySelector("#area");

        countryFlag.innerHTML = flag ? flag : "" ; 
        countryName.innerHTML = inputtedValue + `<br><span id="description">${description}</span>`;
        countryCapital.innerHTML = capital;
        countryContinent.innerHTML = continent ; 
        countrySubRegion.innerHTML = subRegion ; 
        countryLanguages.innerHTML = languages ;
        countryArea.innerHTML = area + " km<sup>2</sup>"; 
        document.querySelector("#display-div").style.display = "grid";

        displayWeather(latlongArr[0],latlongArr[1]) ; 
    }).catch(error => {
        console.log(error);
       
    });

}

function displayWeather(lat,long){
    // fetch the JSON data
    let weatherData ; 
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`).then(response => {
       return response.json(); 
    }).then(data => {  
        let temp = document.querySelector("#temp"); 
        let tempIcon = document.querySelector("#temp-icon"); 
        temp.innerHTML = Math.round(data.main.temp) + "&#8451 "; 
        tempIcon.innerHTML =  `<img src="${data.weather[0].icon}" />`; 
    })
    .catch(err => {
        console.log("coudnt fetch data!");
    });
}


