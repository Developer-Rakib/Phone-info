
let Teams = document.getElementById("Teams");
let team = document.getElementById("team");
let inputFeild = document.getElementById("input-feild");
let load = document.getElementById("loading");

document.getElementById("search-btn").addEventListener("click", () => {

    if (isNaN(inputFeild.value) == false || inputFeild.value == "") {
        alert("please enter valid input")
    } else {

        load.style.display = "block";
        Teams.textContent = "";
        team.textContent = "";
        let url = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?s=${inputFeild.value}&c=Spain`
        fetch(url)
            .then(res => res.json())
            .then(data => {


                setTimeout(() => {
                    displyData(data.teams);

                }, 500);
                setTimeout(() => {

                    load.style.display = "none";

                }, 500);



            })
        inputFeild.value = "";
    }


})


function displyData(datas) {
    if (datas == null) {
        alert("Data Not Avaiable")

    } else {
        datas.forEach(data => {
            // console.log(data);
            let div = document.createElement("div");

            div.innerHTML = `
                            <img src="${data.strTeamBadge}" alt="">
                            <h5>Team Name</h5>
                            <h4>${data.strTeam}</h4>
                            <p>League</p>
                            <p>${data.strLeague}</p>

                `;
            Teams.appendChild(div);


            div.addEventListener("click", () => {
                team.textContent = "";
                let TeamDiv = document.createElement("div");

                console.log(data);
                TeamDiv.innerHTML = `
                                
                                <img src="${data.strTeamBadge}" alt="">
                                <h3> ${data.strTeam}</h3>
                                <p>Team Id : ${data.idTeam}</p>
                                <p>Formed Year : ${data.intFormedYear}</p>
                                <p>Sports Type : ${data.strSport}</p>
                                <p>Team Gender : ${data.strGender}</p>
                                <p>League : ${data.strLeague}</p>
                                <p>Stadium : ${data.strStadium}</p>
                                <p>Description : ${data.strDescriptionEN.slice(0, 150)}</p>

                    `;
                team.appendChild(TeamDiv);
                Teams.setAttribute("for", "team");

            })
        });
    }

}
