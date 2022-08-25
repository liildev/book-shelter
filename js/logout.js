let logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    console.log('click');
    window.localStorage.removeItem('token')
    window.location.replace('login.html')
})