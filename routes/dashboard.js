var express = require('express');
var axios = require('axios');
var router = express.Router();

// React example
router.get('/', (req, res) => {
    res.render('dashboard')
})

router.get('/birthday', (req, res) => {
    axios.post('https://0a9d3cc2f07d.ngrok.io/response',  {'type': 'birthday','content':'徐育倫'})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    res.redirect('/dashboard')
})

router.get('/location',(req,res) =>{
    axios.post('https://0a9d3cc2f07d.ngrok.io/response',  {'type': 'location','content':'台北'})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    res.redirect('/dashboard')
})

router.get('/vote',(req,res) =>{
    axios.post('https://0a9d3cc2f07d.ngrok.io/response',  {'type': 'vote','content':'2020-10-30'})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    res.redirect('/dashboard')
})


module.exports = router;
