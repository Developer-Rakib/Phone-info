
let phones = document.getElementById("phones");
let phone = document.getElementById("phone");
let inputFeild = document.getElementById("input-feild");
let load = document.getElementById("loading");


let url = `https://openapi.programming-hero.com/api/phones?search=iphone`
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.data[0]);
    })

document.getElementById("search-btn").addEventListener("click", () => {

    if (isNaN(inputFeild.value) == false || inputFeild.value == "") {
        alert("please enter valid input")
    } else {

        load.style.display = "block";
        phones.textContent = "";
        phone.textContent = "";
        let url = `https://openapi.programming-hero.com/api/phones?search=iphone`
        fetch(url)
            .then(res => res.json())
            .then(data => {


                setTimeout(() => {
                    displyData(data.data);

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
        let data20 = datas.slice(0, 20);
        data20.forEach(data => {
            // console.log(data);
            let div = document.createElement("div");
            div.classList.add("phones-div")
            div.innerHTML = `
                            <div><img src="${data.image}" alt=""></div>
                            <h5>Phone Name : ${data.phone_name}</h5>
                            <p>Brand : ${data.brand}</p>
                            <p>Phone Code : ${data.slug}</p>
                            <button onclick="displySinglePhoen('${data.slug}')">Tap More Details</button>

                `;
            phones.appendChild(div);



        });
    }

}

function displySinglePhoen(PhoneCode) {

    console.log(PhoneCode);
    // phone.textContent = "";
    // let TeamDiv = document.createElement("div");

    // console.log(data);
    // TeamDiv.innerHTML = `

    //                 <img src="${data.strTeamBadge}" alt="">
    //                 <h3> ${data.strTeam}</h3>
    //                 <p>Team Id : ${data.idTeam}</p>
    //                 <p>Formed Year : ${data.intFormedYear}</p>
    //                 <p>Sports Type : ${data.strSport}</p>
    //                 <p>Team Gender : ${data.strGender}</p>
    //                 <p>League : ${data.strLeague}</p>
    //                 <p>Stadium : ${data.strStadium}</p>
    //                 <p>Description : ${data.strDescriptionEN.slice(0, 150)}</p>

    //     `;
    // phone.appendChild(TeamDiv);
    // phones.setAttribute("for", "team");


}
