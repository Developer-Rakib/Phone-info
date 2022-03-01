
let phones = document.getElementById("phones");
let phone = document.getElementById("phone");
let inputFeild = document.getElementById("input-feild");
let load = document.getElementById("loading");
let notFoundSec = document.getElementById("not-found-section");


// let url = `https://openapi.programming-hero.com/api/phones?search`
// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         data.data.forEach(a => console.log(a.brand))
//     })

document.getElementById("search-btn").addEventListener("click", () => {

    if (isNaN(inputFeild.value) == false || inputFeild.value == "") {
        alert("please enter valid input")
    } else {

        load.style.display = "block";
        phones.textContent = "";
        phone.textContent = "";
        notFoundSec.textContent = "";

        let url = `https://openapi.programming-hero.com/api/phones?search=${inputFeild.value}`
        fetch(url)
            .then(res => res.json())
            .then(data => {


                setTimeout(() => {
                    if (data.status == false) {
                        let notFoundDiv = document.createElement("div");
                        notFoundDiv.innerHTML = `
                            <img id="not-found" src="img/notFound.png" alt="">
                        `;
                        notFoundSec.appendChild(notFoundDiv)
                    } else {
                        displyData(data.data);
                    }
                }, 500);

                setTimeout(() => {
                    load.style.display = "none";
                }, 500);



            })
        inputFeild.value = "";
    }


})


const displyData = datas => {

    let data20 = datas.slice(0, 20);
    data20.forEach(data => {
        let div = document.createElement("div");
        div.classList.add("phones-div")
        div.innerHTML = `
                        <div><img src="${data.image}" alt=""></div>
                        <h5>Phone Name : ${data.phone_name}</h5>
                        <p>Brand : ${data.brand}</p>
                        <button onclick="leadSinglePhone('${data.slug}')">Explore</button>

            `;
        phones.appendChild(div);
    });

}

const leadSinglePhone = PhoneCode => {
    load.style.display = "block";
    let url = `https://openapi.programming-hero.com/api/phone/${PhoneCode}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            setTimeout(() => {
                displySinglePhone(data.data)
            }, 500);

            setTimeout(() => {
                load.style.display = "none";
            }, 500);
        })
}
const displySinglePhone = data => {
    phone.textContent = "";
    let singlePhone = document.createElement("div");
    singlePhone.classList.add("single-phone");
    if (data.releaseDate == "") {
        data.releaseDate = "Release date not found";
    }
    let sensor = String(data.mainFeatures.sensors).replaceAll(",", ", ");
    // let a = sensor 
    singlePhone.innerHTML = `

                    <div class="img-div"><img src="${data.image}" alt=""></div>
                    <h5>Phone Name : ${data.name}</h5>
                    <p>Release Date : ${data.releaseDate}</p>
                    <p>Brand : ${data.brand}</p>
                    <p>Main Features :</p>
                    <ul id="mainfeatures">
                        <li>Storage : ${data.mainFeatures.storage}</li>
                        <li>display Size : ${data.mainFeatures.displaySize}</li>
                        <li>Memory : ${data.mainFeatures.memory}</li>
                        <li>ChipSet : ${data.mainFeatures.chipSet}</li>
                        <li id="sensor">Sensors : 
                            <ul id="sensor :">
                                <li>${sensor}</li>

                            </ul>
                        </li>
                    </ul>
                    
        `;

    phone.appendChild(singlePhone);

    if (data.others != undefined) {
        let div = document.createElement("div");
        div.innerHTML = `
                            <p>Others :</p>
                            <ul id="others">
                                <li>Bluetooth : ${data.others?.Bluetooth}</li>
                                <li>WLAN : ${data.others?.WLAN}</li>
                                <li>USB : ${data.others?.USB}</li>
                                <li>GPS : ${data.others?.GPS}</li>
                                <li>NFC : ${data.others?.NFC}</li>
                                <li>Radio : ${data.others?.Radio}</li>
                            </ul>
            
            `;
        singlePhone.appendChild(div);
    }


}
