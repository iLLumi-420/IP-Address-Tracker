window.location = 'https://www.google.com'
const searchBar = document.querySelector('.searchBar');
const button = document.querySelector('.clickButton');
const resultContainer = document.querySelector('.resultContainer')
let IP = searchBar.value;
let mymap;

console.log(IP);
let URL = `https://ip-api.com/json/${IP}`;
main(URL);
function main(URL){
  fetch(URL)
  .then(function(response) {
  response.json().then(jsonData => {
  console.log(jsonData);
  let lat= jsonData.lat;
  let lon= jsonData.lon;
  let chords = [lat,lon];
  addMap(chords);
  let results = getResults(jsonData, IP);
  resultContainer.innerHTML = results
  console.log(results);
  });
  })
  .catch(function(error) {
  console.log(error)
  });
}

button.addEventListener('click', () =>{
  console.log('clicked');
  IP = searchBar.value;
  URL = `http://ip-api.com/json/${IP}`;
  mymap.remove();
  main(URL);
})

function addMap(chords){
console.log(chords);
mymap = L.map('mapid').setView(chords, 15);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiaWxsdW1pLTY5IiwiYSI6ImNrb3dqdng5czAzOHAycGs4cnVjdjV1dTIifQ.pkLGMz2DkYn7UnpsR0OHdw'
}).addTo(mymap);
}
function getResults(mainData, ip){
  console.log("maps");
  return `<div class="item">
          <p class="resultHead ipHead">IP ADDRESS</p>
          <p>${ip}</p>
          </div>
          <div class="item">
          <p class="resultHead">COUNTRY</p>
          <p>${mainData.country}</p>
          </div>
          <div class="item">
          <p class="resultHead">CITY</p>
          <p>${mainData.city}</p>
          </div>
          <div class="item">
          <p class="resultHead">ISP</p>
          <p>${mainData.isp}</p>
          </div>`
}
