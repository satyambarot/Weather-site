import React, { useState } from "react";
import cloud from "../image/Clouds.png"
import rain from "../image/Rain.png"
import mist from "../image/mist.png"
import clear from "../image/Clear.png"
import err from "../image/error.png"
function Myapp() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState(false);  
  const API_KEY = "16a9fc449c3ed3a7d481b0fa4f6f1ba8";
  const APi =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  const myFun = async () => {
    const get = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
    );
    const jsonData = await get.json();

    console.log(jsonData);
    setData(jsonData);

    if(search==""){
        alert("Enter Name");
        setError("Please Enter Name")
    }
   else if(jsonData.cod=='404'){
        setError("Please Enter Valid Name !");
    }else{
        setError("");
    }
    setSearch("");
  };

  return (
    <div className="container">
      <div className="inputs">
        <input
          type="text"
          placeholder="Enter city, country"
          value={search}
          onChange={handleInput}
        />
        <button onClick={myFun}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div>
        {
            error?
            <div className="errorPage">
                <p>{error}</p>
                <img src={err} alt="" /> 
            </div>:""
        }
        {
            data && data.weather?
            <div className="weathers" >
                <h2 className="cityName">{data.name}</h2>
                <img src={data.weather[0].main=="Clouds"?cloud:""} alt="" />
                <img src={data.weather[0].main=="Rain"?rain:""} alt="" />
                <img src={data.weather[0].main=="Clear"?clear:""} alt="" />
                <img src={data.weather[0].main=="Mist"?mist:""} alt="" />
                <img src={data.weather[0].main=="Haze"?cloud:""} alt="" />
                <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
                <p className="climate">{data.weather[0].description}</p>
            </div>:
            ""
        }
      </div>
    </div>
  );
}

export default Myapp;
