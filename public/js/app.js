console.log('client side js is loades')

// fetch('http://puzzle.mead.io/puzzle').then((res,error) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// }, (error) => {
// 	console.log('inside error')
// })

let weatherForm = document.getElementById('form');
let input = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+input.value).then((response) => {
    response.json().then((data) => {
        console.log(data)
        let location = document.createElement('p')
        let foreCast = document.createElement('p')
        foreCast.innerHTML = data.forecast
        location.innerHTML = data.location;
        document.body.appendChild(location)
        document.body.appendChild(foreCast)


    })
})
})

// fetch('http://localhost:3000/weather?address='+address).then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })