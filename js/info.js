const wrapperTemplate = document.getElementById('wrapperTemplate').content
let modalItem = document.getElementById('modalItemTemplate').content
let wrapper = document.getElementById('wrapper')

window.addEventListener('click', event => {
    if(event.target.dataset.task === 'moreInfo'){
        openWraper(event.target)
    }

    if(event.target.dataset.close === 'close'){
        event.target.closest('.modal').remove()
        wrapper.style.display="none"
    }
})

async function openWraper(elem) {

    wrapper.innerHTML = ''
    wrapper.style.display="flex"

    let link = elem.closest('.card').dataset.link
    
    let info = await fetch(link)
    info = await info.json()

    let cloneWrapper = document.importNode(wrapperTemplate, true)
    
    let title = cloneWrapper.getElementById('wrapper__title')
    title.textContent = info.volumeInfo.title

    let img = cloneWrapper.getElementById('wrapper__img')
    img.setAttribute('src', info.volumeInfo.imageLinks.thumbnail)

    let desc = cloneWrapper.getElementById('wrapper__desc')
    desc.innerHTML = info.volumeInfo.description

    let author = cloneWrapper.getElementById('wrapper__author')
    info.volumeInfo.authors.forEach(elem => {
        let item = document.importNode(modalItem, true).querySelector('div')
        item.textContent = elem
        author.append(item)
    })


    let published = cloneWrapper.getElementById('wrapper__published')
    let publishedItem = document.importNode(modalItem, true).querySelector('div')
    publishedItem.textContent = info.volumeInfo.publishedDate
    published.append(publishedItem)


    let publishers = cloneWrapper.getElementById('wrapper__publishers')
    let publishersItem = document.importNode(modalItem, true).querySelector('div')
    publishersItem.textContent = info.volumeInfo.publisher
    publishers.append(publishersItem)

    let categories = cloneWrapper.getElementById('wrapper__categories')
    info.volumeInfo.categories.forEach(elem => {
        let itemOfCategories = document.importNode(modalItem, true).querySelector('div')
        itemOfCategories.textContent = elem
        categories.append(itemOfCategories)
    })

    let pages = cloneWrapper.getElementById('wrapper__pages')
    let pagesItem = document.importNode(modalItem, true).querySelector('div')
    pagesItem.textContent = info.volumeInfo.pageCount
    pages.append(pagesItem)

    wrapper.append(cloneWrapper)
}