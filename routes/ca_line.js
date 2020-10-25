var axios = require('axios')


axios.post('https://65651a0eda8e.ngrok.io/response', { 'type': 'meeting', 'content': 'https://banana-orange.herokuapp.com/meeting?room_name=Public' })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

