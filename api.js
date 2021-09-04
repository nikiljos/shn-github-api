async function getData() {
    document.getElementById("followers").innerHTML = ""

    details = await axios.get(`https://api.github.com/users/nikiljos/following`)
        .then((value, err) => {
            return value.data
        })

    console.log(details)
    n = details.length
    for (i = 0; i < n; i++) {
        document.getElementById("followers").innerHTML += `<div class='col-md-4'><div class='card mb-4 box-shadow'><div class='card-body'>${details[i].login}</div> </div> </div>`

    }
}