var base_url = "https://api.football-data.org/v2/";
var apikey = "c8da522def8c449abfec540dd93123eb";

//contoh with header
// fetch(base_url + "competitions/2001/standings", {
//         method: 'GET',
//         headers: {
//             'X-Auth-Token': apikey,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//       })

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json


function getMatchesToday() {
  if ('caches' in window) {
    caches.match(base_url + "matches").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          const dateToday = data.filters.dateTo;
      var d = new Date(dateToday);
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const fulldate = days[d.getDay()]+', '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
          var matchTodayHTML = `<h5 class='red-text text-darken-4'>${fulldate}</h5><br>`;
        data.matches.forEach(function(match) {
        var dh = new Date(match.utcDate);
        matchTodayHTML += `
                
           <h5>${match.competition.name} - ( ${dh.toLocaleTimeString(undefined, {hour: '2-digit',minute: '2-digit',second: '2-digit'})} )</h5>
          <div class="col s12 m5" >
          <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper  ">
          <div class="col s3 m3"> 
          <img src="https://crests.football-data.org/${match.homeTeam.id}.svg" alt="" class="circle responsive-img">
          </div>
          <div class="col s8">
          <h6 class="black-text">
          <b>${match.homeTeam.name}</b>
          </h6>
          </div>
          </div>
          </div>
          </div>
          <div class="col s12 m2" ><h4 class="center-align">VS</h4></div>
          <div class="col s12 m5" >
          <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
          <div class="col s3 m3">
          <img src="https://crests.football-data.org/${match.awayTeam.id}.svg" alt="" class="circle responsive-img">
          </div>
          <div class="col s8">
          <h6 class="black-text">
          <b>${match.awayTeam.name}</b>
          </h6>
          </div>
          </div>
          </div><br><br>
          </div>
                
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matchhomes").innerHTML = matchTodayHTML;
        })
      }
    })
  } 
  
  fetch(base_url + "matches", {
        method: 'GET',
        headers: {
            'X-Auth-Token': apikey
        }
      })
    .then(status)
    .then(json)
    .then(function(data) {
      const dateToday = data.filters.dateTo;
      var d = new Date(dateToday);
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const fulldate = days[d.getDay()]+', '+d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
          var matchTodayHTML = `<h5 class='red-text text-darken-4'>${fulldate}</h5><br>`;
          if (data.matches.length==0) {
            matchTodayHTML += `<p></p><p><b>Pertandingan Hari ini tidak ada</b></p>`;
          } else {
            data.matches.forEach(function(match) {
              var dh = new Date(match.utcDate);
              matchTodayHTML += `

              <h5>${match.competition.name} - ( ${dh.toLocaleTimeString(undefined, {hour: '2-digit',minute: '2-digit',second: '2-digit'})} )</h5>
              <div class="col s12 m5" >
              <div class="card-panel grey lighten-5 z-depth-1">
              <div class="row valign-wrapper  ">
              <div class="col s3 m3"> 
              <img src="https://crests.football-data.org/${match.homeTeam.id}.svg" alt="" class="circle responsive-img">
              </div>
              <div class="col s8">
              <h6 class="black-text">
              <b>${match.homeTeam.name}</b>
              </h6>
              </div>
              </div>
              </div>
              </div>
              <div class="col s12 m2" ><h4 class="center-align">VS</h4></div>
              <div class="col s12 m5" >
              <div class="card-panel grey lighten-5 z-depth-1">
              <div class="row valign-wrapper">
              <div class="col s3 m3">
              <img src="https://crests.football-data.org/${match.awayTeam.id}.svg" alt="" class="circle responsive-img">
              </div>
              <div class="col s8">
              <h6 class="black-text">
              <b>${match.awayTeam.name}</b>
              </h6>
              </div>
              </div>
              </div><br><br>
              </div>

              `;
            });
          }
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matchhomes").innerHTML = matchTodayHTML;
    })
    .catch(error);
}

function getLeagues() {
	if ('caches' in window) {
    caches.match(base_url + "competitions").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          // var dStart = new Date(liga.currentSeason.startDate);
          // var dEnd = new Date(liga.currentSeason.endDate);
          // const dStartfull = dStart.getDate()+'-'+dStart.getMonth()+'-'+dStart.getFullYear();
          // const dEndfull =  dEnd.getDate()+'-'+dEnd.getMonth()+'-'+dEnd.getFullYear();
        const filterLeagues = data.competitions;
     const filterL = ['2001','2002','2003','2021','2014','2015']
       let fixLeagues = filterLeagues.filter(leagues => leagues.id == '2001' || leagues.id == '2002' || leagues.id == '2003' || leagues.id == '2021' || leagues.id == '2014' || leagues.id == '2015' )  ;

      var leaguesHTML = "<br>";
      fixLeagues.forEach(function(liga) {
           leaguesHTML += `
            <div class="col s12 m4">
              <div class="card">
                    <a href="./group.html?id=${liga.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img height="250px" src="${liga.emblemUrl ? liga.emblemUrl : '/img/notFound.jpg'}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${liga.name}</span>
                      <p>Jumlah Season: ${liga.numberOfAvailableSeasons}</p>
                    </div>
                  </div>
                </div>
            `;
      });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("leagues").innerHTML = leaguesHTML;
        })
      }
    })
  }
  fetch(base_url + "competitions", {
        method: 'GET',
        headers: {
            'X-Auth-Token': apikey
        }
      })
    .then(status)
    .then(json)
    .then(function(data) {
     const filterLeagues = data.competitions;
       let fixLeagues = filterLeagues.filter(leagues => leagues.id == '2001' || leagues.id == '2002' || leagues.id == '2003' || leagues.id == '2021' || leagues.id == '2014' || leagues.id == '2015' )  ;

      var leaguesHTML = "<br>";
      fixLeagues.forEach(function(liga) {
        leaguesHTML += `
         <div class="col s12 m4">
              <div class="card">
                    <a href="./group.html?id=${liga.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img height="250px" src="${liga.emblemUrl ? liga.emblemUrl : '/img/notFound.jpg'}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${liga.name}</span>
                      <p>Jumlah Season: ${liga.numberOfAvailableSeasons}</p>
                    </div>
                  </div>
                  </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("leagues").innerHTML = leaguesHTML;
    })
    .catch(error);
}

function getTeams() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2001/teams").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          // var dStart = new Date(liga.currentSeason.startDate);
          // var dEnd = new Date(liga.currentSeason.endDate);
          // const dStartfull = dStart.getDate()+'-'+dStart.getMonth()+'-'+dStart.getFullYear();
          // const dEndfull =  dEnd.getDate()+'-'+dEnd.getMonth()+'-'+dEnd.getFullYear();
          var leaguesHTML = "<br>";
          data.teams.forEach(function(team) {
           leaguesHTML += `
            <div class="col s12 m4">
              <div class="card">
                    <a href="./team.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img height="250px" src="${team.crestUrl ? team.crestUrl : '/img/notFound.jpg'}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${team.name}</span>
                      <p>National: ${team.area.name}</p>
                    </div>
                  </div>
                  </div>
            `;
      });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = leaguesHTML;
        })
      }
    })
  }
  fetch(base_url + "competitions/2001/teams", {
        method: 'GET',
        headers: {
            'X-Auth-Token': apikey
        }
      })
    .then(status)
    .then(json)
    .then(function(data) {
      // var dStart = new Date(liga.currentSeason.startDate);
      //     var dEnd = new Date(liga.currentSeason.endDate);
      //     const dStartfull = dStart.getDate()+'-'+dStart.getMonth()+'-'+dStart.getFullYear();
      //     const dEndfull =  dEnd.getDate()+'-'+dEnd.getMonth()+'-'+dEnd.getFullYear();
      var leaguesHTML = "<br>";
      data.teams.forEach(function(team) {
        leaguesHTML += `
        <div class="col s12 m4">
              <div class="card">
                    <a href="./team.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img height="250px" src="${team.crestUrl ? team.crestUrl : '/img/notFound.jpg'}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${team.name}</span>
                      <p>National: ${team.area.name}</p>
                    </div>
                  </div>
                  </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = leaguesHTML;
    })
    .catch(error);
}




function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
          // var myObj = new Object();
          // myObj['result']   = [data];
         var teamHTML = `
       <div class="card">
       <div class="card-image waves-effect waves-block waves-light">
       <img height="300px" src="${data.crestUrl}" />
       </div>
       <div class="card-content center-align">
       <h4 class=""><b>${data.name}</b></h4>
       <div class="row center-align">
       <div class="col s12 m4">
       <h5>Alamat : </h5>
       <p>${data.address}</p>
       </div>
       <div class="col s12 m4">
       <h5>Phone : </h5>
       <p>${data.phone}</p>
       </div>
       <div class="col s12 m4">
       <h5>Email : </h5>
       <p>${data.email}</p>
       </div>
       <div class="col s12 m4">
       <h5>Established since : </h5>
       <p>${data.founded}</p>
       </div>
       <div class="col s12 m4">
       <h5>National : </h5>
       <p>${data.area.name}</p>  
       </div>
       <div class="col s12 m4">
       <h5>Club Colors : </h5>
       <p>${data.clubColors}</p>
       </div>
       <div class="col s12 m4">
       <h5>Venue : </h5>
       <p>${data.venue}</p>
       </div>
       <div class="col s12 m4">
       <h5>Website : </h5>
       <p>${data.website}</p>
       </div>
       </div>

         <hr>
       <h5 class=""><b>Squad Team</b></h5><br>
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
              <th>Role</th>
          </tr>
        </thead>

        <tbody>
          
       `;
        
        data.squad.forEach(function(squ) {
        teamHTML += `
          <tr>
            <td>${squ.name}</td>
            <td>${squ.position}</td>
            <td>${squ.nationality}</td>
            <td>${squ.role}</td>
          </tr>
        
            `;
       });

        teamHTML += `
        </tbody>
        </table>
        </div>
        </div>
            `;
            
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetch(base_url + "teams/" + idParam, {
        method: 'GET',
        headers: {
            'X-Auth-Token': apikey
        }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        // var myObj = new Object();
        //   myObj['result']   = [data];
          // console.log(myObj);
       var teamHTML = `
       <div class="card">
       <div class="card-image waves-effect waves-block waves-light">
       <img height="300px" src="${data.crestUrl}" />
       </div>
       <div class="card-content center-align">
       <h4 class=""><b>${data.name}</b></h4>
       <div class="row center-align">
       <div class="col s12 m4">
       <h5>Alamat : </h5>
       <p>${data.address}</p>
       </div>
       <div class="col s12 m4">
       <h5>Phone : </h5>
       <p>${data.phone}</p>
       </div>
       <div class="col s12 m4">
       <h5>Email : </h5>
       <p>${data.email}</p>
       </div>
       <div class="col s12 m4">
       <h5>Established since : </h5>
       <p>${data.founded}</p>
       </div>
       <div class="col s12 m4">
       <h5>National : </h5>
       <p>${data.area.name}</p>  
       </div>
       <div class="col s12 m4">
       <h5>Club Colors : </h5>
       <p>${data.clubColors}</p>
       </div>
       <div class="col s12 m4">
       <h5>Venue : </h5>
       <p>${data.venue}</p>
       </div>
       <div class="col s12 m4">
       <h5>Website : </h5>
       <p>${data.website}</p>
       </div>
       </div>

         <hr>
       <h5 class=""><b>Squad Team</b></h5><br>
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
              <th>Role</th>
          </tr>
        </thead>

        <tbody>
          
       `;
        
        data.squad.forEach(function(squ) {
        teamHTML += `
          <tr>
            <td>${squ.name}</td>
            <td>${squ.position}</td>
            <td>${squ.nationality}</td>
            <td>${squ.role}</td>
          </tr>
        
            `;
       });

        teamHTML += `
        </tbody>
        </table>
        </div>
        </div>
            `;
        
        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getLeagueById() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "competitions/" + idParam+"/standings?standingType=TOTAL").then(function(response) {
        if (response) {
          response.json().then(function(data) {
              var grplHTML = `<div class='row'>
  <blockquote>
    <h3>Klasemen Sementara ${data.competition.name}</h3>
  </blockquote>
</div>`;
        data.standings.forEach(function(group) {
          grplHTML += `
        <div class="col s12 m6">
          <div class="card center-align">

          <h5>${group.group ? group.group : 'Finalis'}</h5>
          <table >
          <thead>
          <tr>
          <th class="center-align">Position</th>
          <th class="center-align">Club</th>
          <th class="center-align">W</th>
          <th class="center-align">D</th>
          <th class="center-align">L</th>
          <th class="center-align">points</th>
          </tr>
          </thead>

          <tbody>
          `;

          group.table.forEach(function(tabel) {
          grplHTML += `
          <tr>
            <td class="center-align">${tabel.position}</td>
            <td class='valign-wrapper'><img height='25px' src="${tabel.team.crestUrl}" alt="" class="circle"> &nbsp;&nbsp; ${tabel.team.name}</td>
            <td class="center-align">${tabel.won}</td>
            <td class="center-align">${tabel.draw}</td>
            <td class="center-align">${tabel.lost}</td>
            <td class="center-align">${tabel.points}</td>
          </tr>
          `;
          })

          grplHTML += `
        </tbody>
      </table>
          </div>
          </div>
          `;
        });
            
            document.getElementById("body-content").innerHTML = grplHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          });
        }
      });
    }
    fetch(base_url + "competitions/" + idParam+"/standings?standingType=TOTAL", {
        method: 'GET',
        headers: {
            'X-Auth-Token': apikey
        }
      })
      .then(status)
      .then(json)
      .then(function(data) {
        var grplHTML = `<div class='row'>
  <blockquote>
    <h3>Klasemen Sementara ${data.competition.name}</h3>
  </blockquote>
</div>`;
        data.standings.forEach(function(group) {
          grplHTML += `
          <div class="col s12 m6">
          <div class="card center-align">

          <h5>${group.group ? group.group : 'Finalis'}</h5>
          <table >
          <thead>
          <tr>
          <th class="center-align">Position</th>
          <th class="center-align">Club</th>
          <th class="center-align">W</th>
          <th class="center-align">D</th>
          <th class="center-align">L</th>
          <th class="center-align">points</th>
          </tr>
          </thead>

          <tbody>
          `;

          group.table.forEach(function(tabel) {
          grplHTML += `
          <tr>
            <td class="center-align">${tabel.position}</td>
            <td class='valign-wrapper'><img height='25px' src="${tabel.team.crestUrl}" alt="" class="circle"> &nbsp;&nbsp; ${tabel.team.name}</td>
            <td class="center-align">${tabel.won}</td>
            <td class="center-align">${tabel.draw}</td>
            <td class="center-align">${tabel.lost}</td>
            <td class="center-align">${tabel.points}</td>
          </tr>
          `;
          })

          grplHTML += `
        </tbody>
      </table>
          </div>
          </div>
          `;
        });
        
        document.getElementById("body-content").innerHTML = grplHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
     var teamsHTML = "<br>";
          teams.forEach(function(team) {
           teamsHTML += `
            <div class="col s6 m4">
              <div class="card">
                    <a href="./team.html?id=${team.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img height="250px" src="${team.crestUrl ? team.crestUrl : '/img/notFound.jpg'}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${team.name}</span>
                      <p>National: ${team.area.name}</p>
                    </div>
                  </div>
                  </div>
            `;
      });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  return new Promise(function(resolve, reject) {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  var parfix = parseInt(idParam)
  getTById(parfix).then(function(data) {
    // console.log(data);
    var teamHTML = `
       <div class="card">
       <div class="card-image waves-effect waves-block waves-light">
       <img height="300px" src="${data.crestUrl}" />
       </div>
       <div class="card-content center-align">
       <h4 class=""><b>${data.name}</b></h4>
       <div class="row center-align">
       <div class="col s12 m4">
       <h5>Alamat : </h5>
       <p>${data.address}</p>
       </div>
       <div class="col s12 m4">
       <h5>Phone : </h5>
       <p>${data.phone}</p>
       </div>
       <div class="col s12 m4">
       <h5>Email : </h5>
       <p>${data.email}</p>
       </div>
       <div class="col s12 m4">
       <h5>Established since : </h5>
       <p>${data.founded}</p>
       </div>
       <div class="col s12 m4">
       <h5>National : </h5>
       <p>${data.area.name}</p>  
       </div>
       <div class="col s12 m4">
       <h5>Club Colors : </h5>
       <p>${data.clubColors}</p>
       </div>
       <div class="col s12 m4">
       <h5>Venue : </h5>
       <p>${data.venue}</p>
       </div>
       <div class="col s12 m4">
       <h5>Website : </h5>
       <p>${data.website}</p>
       </div>
       </div>

         <hr>
       <h5 class=""><b>Squad Team</b></h5><br>
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
              <th>Role</th>
          </tr>
        </thead>

        <tbody>
          
       `;
        
        data.squad.forEach(function(squ) {
        teamHTML += `
          <tr>
            <td>${squ.name}</td>
            <td>${squ.position}</td>
            <td>${squ.nationality}</td>
            <td>${squ.role}</td>
          </tr>
        
            `;
       });

        teamHTML += `
        </tbody>
        </table>
        </div>
        </div>
            `;
        resolve(data);
        document.getElementById("body-content").innerHTML = teamHTML;
  });
  });
}