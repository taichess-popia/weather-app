console.log('file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    console.log(location)
    msg1.textContent = 'Loading...'
    msg2.textContent = ' '
    fetch ('http://localhost:3000/weather?address=' + location).then ((response) =>{
    response.json().then ((data) =>{
        if (data.error) {
            msg1.textContent = data.error
            msg2.textContent = ' '
            console.log(data.error)
        } else {
            msg1.textContent = data.address
            msg2.textContent = data.forecast
            console.log(data)
            console.log(data.forecast)
        }
    })
})
})