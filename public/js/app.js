console.log('client side js is loades')

let weatherForm = document.getElementById('form');
let input = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('/weather?address='+input.value).then((response) => {
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