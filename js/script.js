'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
}); */
const titleClickHandler = function(event){
//    console.log('Link was clicked!');
    const clickedElement = this;
    event.preventDefault();
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const titleHref = clickedElement.getAttribute('href');
    console.log(titleHref);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const articleToBeActivated = document.querySelector(titleHref);
    console.log(articleToBeActivated);

    /* [DONE] add class 'active' to the correct article */
    articleToBeActivated.classList.add('active');

};

const links = document.querySelectorAll('.titles a');
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}