const form = document.getElementById('form')
let nameInput =  document.getElementById('input_name')
let passwordInput =  document.getElementById('input_password')
const formBtn = document.getElementById('form__btn')



form.addEventListener('submit', (event)=>{
    event.preventDefault()

    let user = {
        email:nameInput.value,
        password:passwordInput.value
    }

    
    try {
        login(user)
    } catch (err) {
        alert(err)
        console.log(err.message);
    }

})




async function login(user){
    let login = await fetch('https://reqres.in/api/login', {
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            "Content-type":'application/json'
        }
    })

    if(login.status > 300){
        alert('error')
        return false
    }

    else{
        login = await login.json()
        window.localStorage.setItem('token', login.token)
        window.location.replace('index.html')
    }
}