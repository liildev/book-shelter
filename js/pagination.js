const pageBlock = document.getElementById('page__block')
let prevPage = document.getElementById('prevPage')
let nextPage = document.getElementById('nextPage')

let page_1 = document.getElementById('page1')
let page_2 = document.getElementById('page2')
let page_3 = document.getElementById('page3')
let page_4 = document.getElementById('page4')

let pageDot = document.getElementById('pagedot')

pageBlock.addEventListener('click', (event)=>{
    let elem = event.target


    if(elem.dataset.page === 'prev'){
        if(count > 1){
            count = count-1

            page_1.classList.add('page__active')


            cardBlock.innerHTML = `
            <div class="my-slider">
            <div class="cssload-loader">
                <div class="cssload-inner cssload-one"></div>
                <div class="cssload-inner cssload-two"></div>
                <div class="cssload-inner cssload-three"></div>
            </div>    
            </div>
            `

            getBooks().then(()=>{
                try {
                    renderBooks(Data)
                } catch (error) {
                    console.log(error.message);
                }
            })

        }
    }



    if(elem.dataset.page === 'next'){
        if(count < results/10){
            count++

            cardBlock.innerHTML = `
            <div class="my-slider">
            <div class="cssload-loader">
                <div class="cssload-inner cssload-one"></div>
                <div class="cssload-inner cssload-two"></div>
                <div class="cssload-inner cssload-three"></div>
            </div>    
            </div>
            `

            getBooks().then(()=>{
                try {
                    renderBooks(Data)
                } catch (error) {
                    console.log(error.message);
                }
            })

        }
    }


    if(!isNaN(elem.dataset.page)){
        count = elem.dataset.page

        
        cardBlock.innerHTML = `
        <div class="my-slider">
        <div class="cssload-loader">
            <div class="cssload-inner cssload-one"></div>
            <div class="cssload-inner cssload-two"></div>
            <div class="cssload-inner cssload-three"></div>
        </div>    
        </div>
        `

        getBooks().then(()=>{
            try {
                renderBooks(Data)
            } catch (error) {
                console.log(error.message);
            }
        })
        
        renderPage()

        addClass(elem)
    }



    if(count == 1){
        prevPage.classList.add('page__disablet')
    }else{
        prevPage.classList.remove('page__disablet')
    }




    if(count == Math.ceil(results/10)){
        nextPage.classList.add('page__disablet')
    }else{
        nextPage.classList.remove('page__disablet')
    }



})




function addClass(elem){
    let list = pageList.querySelectorAll('.page__item')
    list.forEach(item => {
        item.classList.remove('page__active')
        if(item.textContent == count){
            item.classList.add('page__active')
        } else{
            item.classList.remove('page__active')
        }
    })
}




function renderPage(){
    if(count == Math.ceil(results/10)-3){
        pageDot.style.display="none"
    }else {
        pageDot.style.display="flex"
    }

    if(Math.ceil(results/10) > 4){
        page_1.textContent = count
        page_1.dataset.page = count

        page_2.textContent = Number(count)+1
        page_2.dataset.page = Number(count)+1

        page_3.textContent = Math.ceil(results/10)-1
        page_3.dataset.page = Math.ceil(results/10)-1
        
        page_4.textContent = Math.ceil(results/10)
        page_3.dataset.page = Math.ceil(results/10)
    }

    if(count >= Math.ceil(results/10)-3){
        page_1.textContent = Math.ceil(results/10)-3
        page_1.dataset.page = Math.ceil(results/10)-3

        page_2.textContent = Math.ceil(results/10)-2
        page_2.dataset.page = Math.ceil(results/10)-2
    }
}