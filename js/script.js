'use strict';
{
  /* options */
  const opts = {
    articleSelector: '.post', // article wrapper
    titleSelector: '.post-title', // post tile wrapper
    titleListSelector: '.titles', // titles list at the left sidebar wrapper
    articleTagsSelector: '.post-tags .list', //list <ul> of tags at the bottom of article
    articleAuthorSelector: '.post-author', // author wrapper under article title at the article content
    cloudClassCount: 5, // 7.3 number of tag sizes
    cloudClassPrefix: 'tag-size-', // 7.3 prefix for tag size class
    authorsListSelector: '.list.authors' // 7.3 authors list <ul> at the right sidebar
  };

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorSidebarLink: Handlebars.compile(document.querySelector('#template-author-sidebar-link').innerHTML)
  };

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

  function generateTitleLinks(customSelector = '') {
    console.log('10) Start of generateTitleLinks func! *** ');

    /* remove contents of titleList */
    const titleList = document.querySelector(opts.titleListSelector).innerHTML = '';
    console.log('11) generateTitleLinks - cleared titleList: *** ', titleList);

    /* for each article */
    const articles = document.querySelectorAll(opts.articleSelector + customSelector); // [data-author="' + href + '"]'
    console.log('12) generateTitleLinks - articles - document.querySelectorAll(opts.articleSelector): *** ', articles);
    console.log('12-1) generateTitleLinks - (opts.articleSelector + customSelector): *** ', opts.articleSelector + customSelector);
    console.log('12-1) customSelector: *** ', customSelector);
    console.log('13) generateTitleLinks - before loop - document.querySelector(opts.titleListSelector): *** ', document.querySelector(opts.titleListSelector));
    console.log('14) generateTitleLinks - !start loop - article of articles: *** ');
    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log('15) generateTitleLinks - articleId - article.getAttribute(\'id\'): *** ', articleId);

      /* find the title element */
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
      console.log('16) generateTitleLinks - articleTitle = article.querySelector(opts.titleSelector).innerHTML: *** ', articleTitle);

      /* get the title from the title element */

      /* create HTML of the link */
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [NEW 7.4] generating article link with handlebar template */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      console.log('17) generateTitleLinks - linkHTML: *** ', linkHTML);

      /* insert link into titleList */
      document.querySelector(opts.titleListSelector).insertAdjacentHTML('beforeend', linkHTML);
    }

    console.log('18) generateTitleLinks - !end loop - article of articles: *** ');
    console.log('19) generateTitleLinks - after loop - document.querySelector(opts.titleListSelector): *** ', document.querySelector(opts.titleListSelector));

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

  /* [NEW 7.3] add calculateTagsParams function */
  function calculateTagsParams(tags) {
    console.log('23-0-1) start of calculateTagsParams func!: *** ');
    console.log('23-0-2) calculateTagsParams parameter (tags) value: ' + tags, tags);

    /* [NEW 7.3} add object named params with min and max properties */
    const params = {
      min : 999999,
      max : 0
    };

    console.log('23-1) start calculateTagsParams func! *** ');
    console.log('23-2) calculateTagsParams - !start loop - tag in tags: *** ');

    /* [NEW 7.3] add for...in loop for object */
    for (let tag in tags) {
      console.log('23-3) calculateTagsParams - how often tag is used: *** ', tag + ' is used ' + tags[tag] + ' times');

      /* [NEW 7.3] assign min and max values to min and max properties of params object */
      params.max = Math.max(tags[tag], params.max);
      // params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);

    }
    console.log('23-6) calculateTagsParams - !end loop - tag in tags: *** ');
    console.log('23-7) calculateTagsParams: *** ', 'min: ' + params.min + ', max' + params.max);
    return params;
  }

  /* [NEW 7.3] declare calculateTagClass function with two parameters: count and params */
  function calculateTagClass (count, params) { // calculateTagClass(allTags[tag], tagsParams)
    console.log('23-8) start calculateTagClass func! *** ');
    console.log('23-9) calculateTagClass - count: ', count, 'params: ', params);

    /* [NEW 7.3] calculate size form 1 -5 */
    console.log('23-10) calculateTagClass: *** tag-size-' + Math.round((count / params.max) * opts.cloudClassCount) + ', ', Math.round((count / params.max) * opts.cloudClassCount));
    return Math.round((count / params.max) * opts.cloudClassCount);

  }

  function generateTags() {
    console.log('24) start of generateTags func! *** ');

    /* [NEW 7.3] create a new variable allTags with an empty object */
    let allTags = {};
    console.log('24-1) generateTags - allTags array', allTags);

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);
    console.log('25) generateTags - articles = document.querySelectorAll(opts.articleSelector): *** ', articles);

    /* START LOOP: for every article: */
    console.log('26) generateTags - !start loop - article of articles: *** ');
    for (let article of articles) {

      /* find tags wrapper */
      const tagWrapper = article.querySelector(opts.articleTagsSelector);
      console.log('27) generateTags - tagList = article.querySelector(opts.articleTagsSelector): *** ', tagWrapper);

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
        // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* [NEW 7.4] generating tag link with handlebar template */
        const linkHTMLData = {tagHTML: tag, tagName: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        console.log('32) generateTags - linkHTML: *** ', linkHTML);

        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log('33) generateTags - html: *** ', linkHTML);

        /* [NEW 7.3] check if this link is NOT already in allTags */
        if(!Object.prototype.hasOwnProperty.call(allTags, tag)){ // .call added after eslint error log
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        console.log('33-2) generateTags allTags.push(linkHTML): *** ', allTags);

        /* END LOOP: for each tag */
      }
      console.log('34) generateTags - !end loop - tag of articleTagsArray: *** ');

      /* insert HTML of all the links into the tags wrapper */
      article.querySelector(opts.articleTagsSelector).insertAdjacentHTML('beforeend', html);
      console.log('35) generateTags - article.querySelector(opts.articleTagsSelector): *** ', article.querySelector(opts.articleTagsSelector));

      /* END LOOP: for every article: */
    }
    console.log('36) generateTags - !end loop - article of articles: *** ');

    /* [NEW 7.3] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW 7.3] add html from allTags to tagList */
    // tagList.innerHTML = allTags.join(' ');
    // console.log('36-1) generateTags - allTags: ***', allTags);
    // console.log('36-2) generateTags - tagList.innerHTML = allTags.join(\' \'): *** ', tagList);

    // [NEW 7.3] declare const tagsParams  = calculateTagsParams(allTags); */
    const tagsParams = calculateTagsParams(allTags);
    console.log('36-2) generateTags - tagsParams: *** ' + tagsParams, tagsParams);

    /* [NEW 7.3] create variable for all links HTML code */
    // let allTagsHTML = '';

    /* NEW 7.4] create const for all links HTML code with handlebar */
    const allTagsData = {tags: []};


    /* [NEW 7.3] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW 7.3] generate code of a link and add it to allTagsHTML */
      // allTagsHTML += '<li><a class="' + opts.cloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' +  tag /*+ ' (' + allTags[tag] + ')*/ + ' </a></li>';

      /* [NEW 7.4] */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: opts.cloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)
      });


      console.log('36-3) generateTags - allTagsData: *** ', allTagsData);

      /* [NEW 7.3] END LOOP: for each tag in allTags: */
    }

    /*[NEW 7.3] add html from allTagsHTML to tagList */
    // tagList.innerHTML = allTagsHTML;

    tagList.innerHTML = templates.tagCloudLink(allTagsData); // [NEW 7.4]

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

  /* [NEW 7.3] add calculateAuthorParams function */
  function calculateAuthorParams(authors) {
    console.log('54-1) start of calculateAuthorsParams func!: *** ');
    console.log('54-2) calculateAuthorsParams parameter (authors) value: ' + authors, authors);

    /* [NEW 7.3} add object named params with min and max properties */
    const params = {
      min : 999999,
      max : 0
    };

    console.log('54-3) start calculateAuthorsParams func! *** ');
    console.log('54-4) calculateAuthorsParams - !start loop - author in authors: *** ');

    /* [NEW 7.3] add for...in loop for object */
    for (let author in authors) {
      console.log('54-5) calculateAuthorsParams - how often tag is used: *** ', author + ' is used ' + authors[author] + ' times');

      /* [NEW 7.3] assign min and max values to min and max properties of params object */
      params.max = Math.max(authors[author], params.max);
      params.min = Math.min(authors[author], params.min);

    }
    console.log('54-6) calculateAuthorsParams - !end loop - author in authors: *** ');
    console.log('54-7) calculateAuthorsParams: *** ', 'min: ' + params.min + ', max' + params.max);
    return params;
  }

  /* generateAuthors function 7.3 */
  const generateAuthors = function() {
    console.log('55) start of generateAuthors func! *** ');

    /* [NEW 7.3] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    console.log('56) generateAuthors - !start loop - article of articles: *** ');
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(opts.articleAuthorSelector); // !!!!! article not document !!!!!
      console.log('57) generateAuthors - authorWrapper = document.querySelector(opts.articleAuthorSelector): *** ', authorWrapper);

      /* get author from data-author att */
      const author = article.getAttribute('data-author').replace('by ', ''); // !!!!! article not document !!!!!
      console.log('58) generateAuthors - author = document.querySelector(\'article\').getAttribute(\'data-author\'): *** ', author);

      /* generate HTML of the link */
      // const linkHTML = 'by <a href="#author-' + author.toLowerCase().replace(' ', '-') + '">' + author + '</a>';

      /* [NEW 7.4] generating author link with handlebar */
      const authorHTMLData = {authorHTML: author.toLowerCase().replace(' ', '-'), authorName: author};
      const authorHTML = templates.authorLink(authorHTMLData);

      console.log('59) generateAuthors - [generating html link] linkHTML: *** ', authorHTML);

      /* insert HTML into the author wrapper */
      authorWrapper.innerHTML = authorHTML;
      console.log('60) generateAuthors - [inserting link to wrapper] authorWrapper.innerHTML = html: *** ', authorWrapper);

      /* [NEW 7.3] check if this link is NOT already in allAuthors */
      if(!Object.prototype.hasOwnProperty.call(allAuthors, author)){ // .call added after eslint error log
        allAuthors[author] = 1;
      } else {
        allAuthors[author] ++;
      }
      console.log('60-0-1) generateAuthors generating allAuthors: *** ', allAuthors);

    }
    console.log('61) generateAuthors - !end loop - article of articles: *** ');
    console.log('61-1) generateAuthors Complete allAuthors object: *** ' + allAuthors, allAuthors);

    /* [NEW 7.3] find list of authors in right column */
    const authorList = document.querySelector(opts.authorsListSelector);
    console.log('61-2 generateAuthors - authorList = document.querySelector(opts.authorsListSelector): *** ', authorList);

    // [NEW 7.3] declare const authorsParams  = calculateAuthorParams(allAuthors); */
    const authorsParams = calculateAuthorParams(allAuthors);
    console.log('61-3) generateAuthors - authorsParams: *** ' + authorsParams, authorsParams);

    /* [NEW 7.3] create variable for all links HTML code */
    // let allAuthorsHTML = '';

    /* [NEW 7.4] */
    const allAuthorsData = {authors: []};

    /* [NEW 7.3] START LOOP: for each author in allAuthors: */
    console.log('61-4) generateAuthors - !start loop - author in allAuthors: *** ');
    for (let author in allAuthors) {
      const authorHTML = author.toLowerCase().replace(' ', '-');
      /* [NEW 7.3] generate code of a link and add it to allAuthorsHTML */
      // allAuthorsHTML += '<li><a href="#author-' + authorHTML + '"><span class="author-name">' +  author + ' (' + allAuthors[author] + ')</span></a></li>';
      // console.log('61-5) generateAuthors - generating... allAuthorsHTML: *** ', allAuthorsHTML);

      allAuthorsData.authors.push({
        authorHTML: authorHTML,
        author: author,
        count: allAuthors[author]
      });


      /* [NEW 7.3] END LOOP: for each author in allAuthors: */
    }
    console.log('61-6) generateAuthors - !end loop - author in allAuthors: *** ');
    console.log('61-7) generateAuthors - Complete allAuthorsHTML: *** ', allAuthorsData);

    /*[NEW 7.3] add html from allAuthorsHTML to authorsList */
    // authorList.innerHTML = allAuthorsHTML;

  /* [NEW 7.4] */
    authorList.innerHTML = templates.authorSidebarLink(allAuthorsData);

    console.log('61-8) generateAuthors - authorList: *** ', authorList);

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
