const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')
const city_name = document.getElementById('city_name')
const temp_status = document.getElementById('temp_status')
const temp = document.getElementById('temp')
const dataHide = document.querySelector('.middle_layer');


const getCurrentDay = () => {
    let weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";

    let currentTime = new Date();
    let day = weekDay[currentTime.getDay()]
    const day1 = document.getElementById('day');

    day1.innerText = day;
}
getCurrentDay();

const todDate = () => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date();
    let name = month[d.getMonth()];
    let date2 = d.getDate();
    let updateDate=document.getElementById('today_data');

    updateDate.innerText = `${date2}  ${name}`
}
todDate();


const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "plz write the name of before search";
        dataHide.classList.add("data_hide")
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f9a1493ae202b52dabfc488ea3394f65`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real.innerText = arrData[0].main.temp;

            // condition to check sunny or cloudy
            let tempmode = arrData[0].weather[0].main;

            if (tempmode === "Clear") {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color:#eccc68'></i> "
            } else if (tempmode === "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color:#f1f2f6'></i> "
            } else if (tempmode === "Rain") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-rain' style='color:#a4b0be'></i> "
            } else {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color:#eccc68'></i> "
            }

            dataHide.classList.remove("data_hide")


        } catch {
            city_name.innerText = "plz enter the city name properly";
            dataHide.classList.add("data_hide")

        }
    }
}

submitBtn.addEventListener("click", getInfo)