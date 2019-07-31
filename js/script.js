'use strict';
{
  const titleClickHandler = function (event) {
    console.log('1) Start of titleClickHandler func! *** ');
    event.preventDefault();
    const clickedElement = this;
    console.log('2) titleClickHandler - Link was clicked! *** ');
    console.log('3) titleClickHandler - event: *** ', event);
    console.log('4) titleClickHandler - document.querySelectorAll(\'.titles a\'): *** ', document.querySelectorAll('.titles a'));

    const activeLinks = document.querySelectorAll('.titles a');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    console.log('5) titleClickHandler - clickedElement: *** ', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article');
    console.log('6) titleClickHandler - !start loop - activeArticle of activeArticles: *** ');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    console.log('7) titleClickHandler - !end loop - activeArticle of activeArticles: *** ');

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('8) titleClickHandler - articleSelector - clickedElement.getAttribute(\'href\'): *** ' + articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('9) titleClickHandler - targetArticle - document.querySelector(articleSelector): *** ', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = '') {
    console.log('10) Start of generateTitleLinks func! *** ');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
    console.log('11) generateTitleLinks - cleared titleList: *** ', titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector); // [data-author="' + href + '"]'
    console.log('12) generateTitleLinks - articles - document.querySelectorAll(optArticleSelector): *** ', articles);
    console.log('12-1) generateTitleLinks - (optArticleSelector + customSelector): *** ', optArticleSelector + customSelector);
    console.log('12-1) customSelector: *** ', customSelector);
    console.log('13) generateTitleLinks - before loop - document.querySelector(optTitleListSelector): *** ', document.querySelector(optTitleListSelector));
    console.log('14) generateTitleLinks - !start loop - article of articles: *** ');
    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log('15) generateTitleLinks - articleId - article.getAttribute(\'id\'): *** ', articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('16) generateTitleLinks - articleTitle = article.querySelector(optTitleSelector).innerHTML: *** ', articleTitle);

      /* get the title from the title element */

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('17) generateTitleLinks - linkHTML: *** ', linkHTML);

      /* insert link into titleList */
      document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeend', linkHTML);
    }

    console.log('18) generateTitleLinks - !end loop - article of articles: *** ');
    console.log('19) generateTitleLinks - after loop - document.querySelector(optTitleListSelector): *** ', document.querySelector(optTitleListSelector));

    const links = document.querySelectorAll('.titles a');
    console.log('20) generateTitleLinks - links = document.querySelectorAll(\'.titles a\'): *** ', links);
    console.log('21) generateTitleLinks - !start loop - link of links *** ');
    for (let link of links) {
      link.addEventListener ('click', titleClickHandler);
      console.log('22) link.addEventListener(\'click\', titleClickHandler)');
    }
    console.log('23) generateTitleLinks - !end loop - link of links *** ');
  }

  generateTitleLinks();

  function generateTags() {
    console.log('24) start of generateTags func! *** ');

    /* [NEW 7.3] create a new variable allTags with an empty object */
    let allTags = {};
    console.log('24-1) generateTags - allTags array', allTags);

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('25) generateTags - articles = document.querySelectorAll(optArticleSelector): *** ', articles);

    /* START LOOP: for every article: */
    console.log('26) generateTags - !start loop - article of articles: *** ');
    for (let article of articles) {

      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      console.log('27) generateTags - tagList = article.querySelector(optArticleTagsSelector): *** ', tagWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('28) generateTags - article.getAttribute(\'data-tags\'): *** ', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('29) generateTags - articleTagsArray = articleTags.split(\' \'): *** ', articleTagsArray);

      console.log('30) generateTags - !start loop - tag of articleTagsArray: *** ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('31) generateTags - tag: *** ', tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log('32) generateTags - linkHTML: *** ', linkHTML);

        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log('33) generateTags - html: *** ', linkHTML);

        /* [NEW 7.3] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        console.log('33-2) generateTags allTags.push(linkHTML): *** ', allTags);

        /* END LOOP: for each tag */
      }
      console.log('34) generateTags - !end loop - tag of articleTagsArray: *** ');

      /* insert HTML of all the links into the tags wrapper */
      article.querySelector(optArticleTagsSelector).insertAdjacentHTML('beforeend', html);
      console.log('35) generateTags - article.querySelector(optArticleTagsSelector): *** ', article.querySelector(optArticleTagsSelector));

      /* END LOOP: for every article: */
    }
    console.log('36) generateTags - !end loop - article of articles: *** ');

    /* [NEW 7.3] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW 7.3] todo add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');
    console.log('36-1) generateTags - allTags: ***', allTags);
    console.log('36-2) generateTags - tagList.innerHTML = allTags.join(\' \'): *** ', tagList);

    /* [NEW 7.3] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW 7.3] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW 7.3] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '">' +  tag + ' (' + allTags[tag] + ')</a></li>';
      console.log('36-3) generateTags - allTagsHTML: *** ', allTagsHTML);

      /* [NEW 7.3] END LOOP: for each tag in allTags: */
    }

    /*[NEW 7.3] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    console.log('36-4) generateTags - tagList: *** ', tagList);

  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    console.log('37) Start of tagClickHandler func! *** ');
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('38) tagClickHandler - Link was clicked! *** ');
    console.log('39) tagClickHandler - event: *** ', event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('40) tagClickHandler - href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('41) tagClickHandler - extracted tag - tag = href.replace(\'#tag-\', \'\'): *** ', tag);

    /* find all tag links with class active */
    let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); // let special for console (50) test above
    console.log('42) tagClickHandler - activeTagLinks = document.querySelectorAll(\'a.active[href^="#tag-"]\'): *** ', activeTagLinks);

    /* START LOOP: for each active tag link */
    console.log('43) tagClickHandler - !start loop - activeTagLink of activeTagLinks: *** ');
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');
      console.log('44) tagClickHandler - removing active class from activeTagLinks: ***', activeTagLink);

      /* END LOOP: for each active tag link */
    }
    console.log('45) tagClickHandler - !end loop - activeTagLink of activeTagLinks: *** ');

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('46) tagClickHandler - tagLinks = document.querySelectorAll(\'a[href="\' + href + \'"]\'): *** ', tagLinks);

    /* START LOOP: for each found tag link */
    console.log('47) tagClickHandler - !start loop - tagLink of tagLinks: *** ');
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      console.log('48) tagClickHandler - adding active class to tagLink: ***', tagLink);
      /* END LOOP: for each found tag link */
    }
    console.log('49) tagClickHandler - !end loop - tagLink of tagLinks: *** ');
    activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('50) tagClickHandler - activeTagLinks = document.querySelectorAll(\'a.active[href^="#tag-"]\'): *** ', activeTagLinks);

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  const addClickListenersToTags = () => {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log('51) addClickListenersToTags - tagLinks = document.querySelectorAll(\'a[href^="#tag-"]\'): *** ', tagLinks);

    /* START LOOP: for each link */
    console.log('52) addClickListenersToTags - !start loop - tagLink of tagLinks: *** ');
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log('53) addClickListenersToTags - tagLink.addEventListener(\'click\', tagClickHandler)', tagLink);

      /* END LOOP: for each link */
    }
    console.log('54) addClickListenersToTags - !end loop - tagLink of tagLinks: *** ');
  };

  addClickListenersToTags();

  /* ******************************************************************************************* */

  const generateAuthors = function() {
    console.log('55) start of generateAuthors func! *** ');

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    console.log('56) generateAuthors - !start loop - article of articles: *** ');
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector); // !!!!! article not document !!!!!
      console.log('57) generateAuthors - authorWrapper = document.querySelector(optArticleAuthorSelector): *** ', authorWrapper);

      /* get author from data-author att */
      const author = article.getAttribute('data-author').replace('by ', ''); // !!!!! article not document !!!!!
      console.log('58) generateAuthors - author = document.querySelector(\'article\').getAttribute(\'data-author\'): *** ', author);

      /* generate HTML of the link */
      const linkHTML = 'by <a href="#author-' + author.toLowerCase().replace(' ', '-') + '">' + author + '</a>';
      console.log('59) generateAuthors - [generating html link] linkHTML: *** ', linkHTML);

      /* insert HTML into the author wrapper */
      authorWrapper.innerHTML = linkHTML;
      console.log('60) generateAuthors - [inserting link to wrapper] authorWrapper.innerHTML = html: *** ', authorWrapper);
    }
    console.log('61) generateAuthors - !end loop - article of articles: *** ');

  };

  generateAuthors();


  const authorClickHandler = function(event) {
    /* prevent default action for this event */
    console.log('62) Start of authorClickHandler func! *** ');
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('63) authorClickHandler - Link was clicked! *** ', clickedElement);
    console.log('64) authorClickHandler - event: *** ', event);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('65) authorClickHandler - href: *** ', href);

    /*const authorHref = href.replace('#author-');*/
    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '').replace('-', ' ').replace(/\b(\w)/g,x=>x.toUpperCase());
    console.log('66) ', author);

    /*console.log('66) authorClickHandler - extracted author - authorHref = href.replace(\'#author-\', \'\'): *** ', authorHref);*/

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log('67) authorClickHandler - activeTagLinks = document.querySelectorAll(\'a.active[href^="#author-"]\'): *** ', activeAuthorLinks);

    /* START LOOP: for each active author link */
    console.log('68) authorClickHandler - !start loop - activeAuthorLink of activeAuthorLinks: *** ');
    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');
      console.log('69) authorClickHandler - removing active class from activeTagLinks: ***', activeAuthorLink);

      /* END LOOP: for each active tag link */
    }
    console.log('70) authorClickHandler - !end loop - activeAuthorLink of activeAuthorLinks: *** ');

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('71) authorClickHandler - authorLinks = document.querySelectorAll(\'a[href="\' + href + \'"]\'): *** ', authorLinks);

    /* START LOOP: for each found author link */
    console.log('72) authorClickHandler - !start loop - authorLink of authorLinks: *** ');
    for (let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');
      console.log('73) authorClickHandler - adding active class to authorLink: ***', authorLink);
      /* END LOOP: for each found tag link */
    }
    console.log('74) authorClickHandler - !end loop - authorLink of authorLinks: *** ');

    console.log('75) authorClickHandler - activeAuthorLinks = document.querySelectorAll(\'a.active[href^="#author-"]\'): *** ', document.querySelectorAll('a.active[href^="#author-"]'));

    /* execute function "generateTitleLinks" with article selector as argument */
    console.log('76) generateTitleLinks(\'[data-author="\' + href + \'"]\'): *** ', generateTitleLinks('[data-author="' + href + '"]'));
    generateTitleLinks('[data-author="' + author + '"]');


  };

  const addClickListenersToAuthors = function() {
    console.log('77) start addClickListenersToAuthors func! *** ');
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    console.log('78) addClickListenersToAuthors - authorLinks = document.querySelectorAll(\'a[href^="#author-"]\'): *** ', authorLinks);

    /* START LOOP: for each link */
    console.log('79) addClickListenersToAuthors - !start loop - authorLink of authorLinks ***');
    for (let authorLink of authorLinks) {

      /*  add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
    console.log('80) addClickListenersToAuthors - !end loop - authorLink of authorLinks ***');

  };
  addClickListenersToAuthors();

}
