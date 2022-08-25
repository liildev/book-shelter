const bookMarkBlock =  document.getElementById('bookmarkBlock')
let bookmarkTemplate = document.getElementById('bookmarkTemplate').content

let localBooks = []



if(window.localStorage.getItem('bookMark')){
    localBooks = JSON.parse(window.localStorage.getItem('bookMark'))
    renderLocalStorage(localBooks)
}




window.addEventListener('click', event => {
    let elem = event.target

    if(elem.dataset.task === 'bookmark') renderBookmark(elem)
    if(elem.dataset.task === 'delet') deletBook(elem)
})




function renderBookmark(elem){
    let markBooks = {
        title:elem.closest('.card').querySelector('#title').textContent,
        author:elem.closest('.card').querySelector('#author').textContent
    }
     
    
    renderLocalStorage([markBooks], elem)

}



function renderLocalStorage(Arr, elem = ''){

    let bookFragment = document.createDocumentFragment()

    Arr.forEach(item => {
        let cloneBook = document.importNode(bookmarkTemplate, true)
        
        let title = cloneBook.querySelector('#mark_title')
        title.textContent = item.title
        
        let author = cloneBook.querySelector('#mark_author')
        author.textContent = item.author

        bookFragment.appendChild(cloneBook)
    })


    if(elem){
        let includes = false
        
        localBooks.forEach(item => {
            if(item.title === elem.closest('.card').querySelector('#title').textContent){
                includes = true
            }
        })
    
    
        if(includes === false){
            bookMarkBlock.appendChild(bookFragment)
            localBooks.push(Arr[0])
            window.localStorage.setItem('bookMark', JSON.stringify(localBooks))   
        }
    } else {
        bookMarkBlock.appendChild(bookFragment)
    }
    
}




function deletBook(elem){

    elem.closest('.bookmark').remove()

    let titleOfBook = elem.closest('.bookmark').querySelector('.bookmark__title').textContent

    localBooks = localBooks.filter(item => {
        return item.title !== titleOfBook
    })
    console.log(localBooks);
    window.localStorage.setItem('bookMark', JSON.stringify(localBooks))

}