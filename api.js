function getData() {
    uName = document.getElementById("uName").value;
    followers(uName)
    following(uName)

}

async function followers(uName) {
    document.getElementById("followers").innerHTML = ""

    details = await axios.get(`https://api.github.com/users/${uName}/followers`)
        .then((value) => {
            document.getElementById("header").setAttribute("style", "visibility: visible");
            return value.data
        })
        .catch(err => {
            document.getElementById("header").setAttribute("style", "visibility: hidden");
            alert("Seems like you entered an invalid username")

        })

    console.log(details)
    n = details.length
    for (i = 0; i < n; i++) {

        document.getElementById("followers").innerHTML += `<div class='col-md-4'><div class='card mb-4 box-shadow'><div class='card-body'> <img src="${details[i].avatar_url}" alt="profile" class="profile">${details[i].login}</div> </div> </div>`

    }
}
async function following(uName) {
    document.getElementById("following").innerHTML = ""

    details = await axios.get(`https://api.github.com/users/${uName}/following`)
        .then((value) => {
            document.getElementById("heading").setAttribute("style", "visibility: visible");
            return value.data
        })
        .catch(err => {
            document.getElementById("heading").setAttribute("style", "visibility: hidden");

        })

    console.log(details)
    n = details.length
    for (i = 0; i < n; i++) {
        document.getElementById("following").innerHTML += `<div class='col-md-4'><div class='card mb-4 box-shadow'><div class='card-body'> <img src="${details[i].avatar_url}" alt="profile" class="profile">${details[i].login}</div> </div> </div>`

    }
}