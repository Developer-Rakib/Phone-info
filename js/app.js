
let phones = document.getElementById("phones");
let phone = document.getElementById("phone");
let inputFeild = document.getElementById("input-feild");
let load = document.getElementById("loading");


// let url = `https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`
// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data.data);
//     })

document.getElementById("search-btn").addEventListener("click", () => {

    if (isNaN(inputFeild.value) == false || inputFeild.value == "") {
        alert("please enter valid input")
    } else {

        load.style.display = "block";
        phones.textContent = "";
        phone.textContent = "";
        let url = `https://openapi.programming-hero.com/api/phones?search=${inputFeild.value}`
        fetch(url)
            .then(res => res.json())
            .then(data => {


                setTimeout(() => {
                    if (data.status == false) {
                        alert("Data Not Available")
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


function displyData(datas) {

    let data20 = datas.slice(0, 20);
    data20.forEach(data => {
        let div = document.createElement("div");
        div.classList.add("phones-div")
        div.innerHTML = `
                        <div><img src="${data.image}" alt=""></div>
                        <h5>Phone Name : ${data.phone_name}</h5>
                        <p>Brand : ${data.brand}</p>
                        <p>Phone Code : ${data.slug}</p>
                        <button onclick="leadSinglePhone('${data.slug}')">Tap More Details</button>

            `;
        phones.appendChild(div);
    });

}

function leadSinglePhone(PhoneCode) {
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
function displySinglePhone(data) {
    console.log(data)
    phone.textContent = "";
    let singlePhone = document.createElement("div");
    singlePhone.classList.add("single-phone");
    singlePhone.innerHTML = `

                    <div class="img-div"><img src="${data.image}" alt=""></div>
                    <h5>Phone Name : ${data.name}</h5>
                    <p>Brand : ${data.brand}</p>
                    <p>Phone Code : ${data.slug}</p>
                    <p>Release Date : ${data.releaseDate}</p>
                    <p>Main Features</p>
                    <ul id="mainfeatures">
                        <li>Storage : ${data.mainFeatures.storage}</li>
                        <li>display Size : ${data.mainFeatures.displaySize}</li>
                        <li>Memory : ${data.mainFeatures.memory}</li>
                        <li>ChipSet : ${data.mainFeatures.chipSet}</li>
                        <li>Sensors : 
                            <ul id="sensor">
                                <li>${data.mainFeatures.sensors[0]}</li>
                                <li>${data.mainFeatures.sensors[1]}</li>
                                <li>${data.mainFeatures.sensors[2]}</li>
                            </ul>
                        </li>
                    </ul>
                    
        `;

    phone.appendChild(singlePhone);

    if (data.others != undefined) {
        let div = document.createElement("div");
        div.innerHTML = `
                            <ul id="others">
                                <p>Others</p>
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
    // phones.setAttribute("for", "team");


}
