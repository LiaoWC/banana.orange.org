var axios = require('axios')


axios.post('https://e464f1497bc9.ngrok.io/response',  {'type': 'meeting','content':'https://banana-orange.herokuapp.com/meeting?room_name=Public'})
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

