getData();

async function getData() {

    details = await axios.get(`https://api.github.com/users/nikiljos/following`)
        .then((value, err) => {
            return value.data[20]
        })

    console.log(details)

}