'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
}); */
{
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

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    const generateTitleLinks = () => {
        console.log('start of generateTitleLinks function');
        /* [DONE] remove contents of titleList */
        /*const titleSelector = document.querySelector(optTitleListSelector);
        console.log(titleSelector);
        titleSelector.innerHTML = '';*/
        document.querySelector(optTitleListSelector).innerHTML = '';

        /* [IN PROGRESS] for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */

            /* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            const articleLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            /* insert link into titleList */
            document.querySelector('ul' + optTitleListSelector).insertAdjacentHTML('beforeend', articleLink);
        }
        const links = document.querySelectorAll('.titles a');
        console.log(links);
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    };

    generateTitleLinks();
}