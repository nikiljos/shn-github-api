let displayFollowerCount = 0;
let displayFollowingCount = 0;
let Cfollowers, Cfollowing, followerPage, followingPage

async function getData() {
    displayFollowerCount = 0;
    displayFollowingCount = 0;
    document.getElementById("followers").innerHTML = ""
    document.getElementById("following").innerHTML = ""
    uName = document.getElementById("uName").value;
    followerPage = 1
    followingPage = 1
    await countFollow(uName)
    document.getElementById("header").innerHTML = `Followers <kbd>${Cfollowers}</kbd>`
    document.getElementById("heading").innerHTML = `Followers <kbd>${Cfollowing}</kbd>`

    followers(uName, 1)
    following(uName, 1)

}

async function countFollow(uName) {


    details = await axios.get(`https://api.github.com/users/${uName}`)
        .then((value) => {
            document.getElementById("header").setAttribute("style", "visibility: visible");
            return value.data
        })

    Cfollowers = details.followers;
    Cfollowing = details.following;




}

async function followers(uName, page) {


    details = await axios.get(`https://api.github.com/users/${uName}/followers?page=${page}`)
        .then((value) => {
            document.getElementById("header").setAttribute("style", "visibility: visible");
            return value.data
        })
        .catch(err => {
            document.getElementById("header").setAttribute("style", "visibility: hidden");
            alert("Seems like you entered an invalid username")

        })

    // console.log(details)
    n = details.length
    displayFollowerCount += n;
    followerPage++;

    for (i = 0; i < n; i++) {

        document.getElementById("followers").innerHTML += `<div class='col-md-4'><div class='card mb-4 box-shadow'><div class='card-body'> <img src="${details[i].avatar_url}" alt="profile" class="profile"><a href="${details[i].html_url}" target=_blank>${details[i].login}</a></div> </div> </div>`

    }
    if (followerPage * 30 <= Cfollowers) {
        document.getElementById("moreFollowers").innerHTML = `Showing ${displayFollowerCount} of ${Cfollowers}&nbsp;<a href="javascript:followers('${uName}',${followerPage})">Load More...</a>`
    } else {
        document.getElementById("moreFollowers").innerHTML = `Showing ${displayFollowerCount} of ${Cfollowers}`
    }

}
async function following(uName, page) {


    details = await axios.get(`https://api.github.com/users/${uName}/following?page=${page}`)
        .then((value) => {
            document.getElementById("heading").setAttribute("style", "visibility: visible");
            return value.data
        })
        .catch(err => {
            document.getElementById("heading").setAttribute("style", "visibility: hidden");

        })

    // console.log(details)
    n = details.length
    displayFollowingCount += n;
    followingPage++;

    // document.getElementById("heading").innerHTML = `Following <kbd>${Cfollowing}</kbd>`
    for (i = 0; i < n; i++) {
        document.getElementById("following").innerHTML += `<div class='col-md-4'><div class='card mb-4 box-shadow'><div class='card-body'> <img src="${details[i].avatar_url}" alt="profile" class="profile"><a href="${details[i].html_url}" target=_blank>${details[i].login}</a></div> </div> </div>`

    }
    if (followingPage * 30 < Cfollowing) {
        document.getElementById("moreFollowing").innerHTML = `Showing ${displayFollowingCount} of ${Cfollowing}&nbsp;<a href="javascript:followers('${uName}',${followingPage})">Load More...</a>`
    } else {
        document.getElementById("moreFollowing").innerHTML = `Showing ${displayFollowingCount} of ${Cfollowing}`
    }


}