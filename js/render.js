const cardBlock = document.getElementById('card__block')
let cardTemplate = document.getElementById('card__template').content
let pageTemplate = document.getElementById('page__template').content
let pageList = document.getElementById('page__list')

let count = 1
let Data = []
let results = 0
let selfLink = ''


let showResults = document.querySelector('#results')



async function getBooks(){
    let books = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&startIndex=${(count-1)*10}`)
    books = await books.json()
    results = books.totalItems
    selfLink = books.selfLink
    Data = books.items

    if(results) showResults.textContent = `Showing ${results} Result(s)`
    else showResults.textContent = ''

}




getBooks().then(()=>{
    try {
        renderBooks(Data)
        page_1.classList.add('page__active')
    } catch (error) {
        console.log(error.message);
    }
})





function renderBooks(data){
    cardBlock.innerHTML = ''

    renderPage()

    cardFragment = document.createDocumentFragment()
    
    if(!data){
        cardBlock.textContent = 'Books not found'
        pageBlock.style.display="none"
    }
    else{
    pageBlock.style.display="flex"

    data.forEach(element => {
        let cloneCard = document.importNode(cardTemplate, true);
        cloneCard.querySelector('.card').dataset.link = element.selfLink

        let cardImg = cloneCard.getElementById('img');
        if(element.volumeInfo.imageLinks){
            cardImg.setAttribute('src', element.volumeInfo.imageLinks.thumbnail)
        }else{
            console.log(`img of ${element.volumeInfo.title} is not found`);
        }

        let cardTitle = cloneCard.getElementById('title')
        if(element.volumeInfo.title){
            cardTitle.textContent = element.volumeInfo.title
        }else{
            console.log(`title is not found`);
        }

        let cardAuthor = cloneCard.getElementById('author')
        if(element.volumeInfo.authors){
            element.volumeInfo.authors.forEach(item=>{
                cardAuthor.textContent = `${cardAuthor.textContent} ${item}`
            })
        }else{
            console.log(`authors of ${element.volumeInfo.title} is not found`);
        }


        let cardYear = cloneCard.getElementById('year')
        if(element.volumeInfo.publishedDate){
            cardYear.textContent = element.volumeInfo.publishedDate
        }else{
            console.log(`year of ${element.volumeInfo.title} is not found`);
        }


        cardFragment.appendChild(cloneCard)
    });

    cardBlock.appendChild(cardFragment)
    }
}