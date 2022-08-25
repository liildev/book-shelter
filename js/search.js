let searchInput = document.getElementById('searchInput')

window.addEventListener('click', event=>{
    let elem = event.target

    if(elem.dataset.search === 'search'){

        cardBlock.innerHTML = `
        <div class="my-slider">
        <div class="cssload-loader">
            <div class="cssload-inner cssload-one"></div>
            <div class="cssload-inner cssload-two"></div>
            <div class="cssload-inner cssload-three"></div>
        </div>    
        </div>
        `

        count = 1
        prevPage.classList.add('page__disablet')
        page_1.classList.add('page__active')

        getBooks().then(()=>{
            try {
                renderBooks(Data)
            } catch (error) {
                console.log(error.message);
            }
        })

        renderPage()
    }
    



    if(elem.dataset.order === 'newest'){
        cardBlock.innerHTML = `
        <div class="my-slider">
        <div class="cssload-loader">
            <div class="cssload-inner cssload-one"></div>
            <div class="cssload-inner cssload-two"></div>
            <div class="cssload-inner cssload-three"></div>
        </div>    
        </div>
        `
        count = 1

        getNewestBooks().then(()=>{
            try {
                renderBooks(Data)
            } catch (error) {
                console.log(error.message);
            }
        })

        page_1.classList.add('page__active')

        renderPage()
    }

})



searchInput.addEventListener('keyup', event => {
    if(event.code === 'Enter'){
        cardBlock.innerHTML = `
        <div class="my-slider">
        <div class="cssload-loader">
            <div class="cssload-inner cssload-one"></div>
            <div class="cssload-inner cssload-two"></div>
            <div class="cssload-inner cssload-three"></div>
        </div>    
        </div>
        `

        count = 1
        
        getBooks().then(()=>{
            try {
                renderBooks(Data)
            } catch (error) {
                console.log(error.message);
            }
        })
        
        prevPage.classList.add('page__disablet')
        page_1.classList.add('page__active')

        renderPage()

    }
})



async function getNewestBooks(){
    let books = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&startIndex=${(count-1)*10}&orderBy=newest`)
    books = await books.json()
    results = books.totalItems
    Data = books.items
}

