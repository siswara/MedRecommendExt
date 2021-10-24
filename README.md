# CS410 CourseProject : Medical Recommendation Extension


## Team The Recommenders

Members :
* Satyo Iswara (iswara2) (captain)
* Molly Graton (mgraton2)
* Eric Wong (etw2)

## Challenges 

Medical journals/articles contains a lot of terms that are domain specific and thus create a challenge for user to comprehend the main concepts in it.  Our team wants to bridge this challenge by adding a recommender system that helps users to bridge this problem. This is relevant to the theme of the class as it extends to an intelligent browsing function and utilizes search/ranking to provide quick information to the user. 

## Algorithms / Techniques

Our team plans to use PLSA algorithm to generate several topic and significant terms from users browser current page.  After topic and significant term identification, our extension will search the web (via Bing Search API) for related pages for term definitions.  On the returned list, we plan to further rank the document with BM25 to present user with the most relevant information.  

## Data Sets

For this recomendation system we are planning to use the following external data sets and resources:
* BioBert (https://github.com/dmis-lab/biobert)

    BioBert will provide us background languange model that we will use to implement our PLSA model.  Since BioBert is specifically designed for biomedical text mining task, this language model fits our project challanges.

* Bing Search API (https://www.microsoft.com/en-us/bing/apis/bing-web-search-api)

    Bing Search API will provide us with a shorthand of all pages related to our query term which we plan to further rank.


## Demonstration

Our team plans to demonstrate our program by pulling up a medical article, showing which words are highlighted, viewing related links of such words as provided by the chrome extension.  The provided links would provide definition to the highlighted terms.


## Programing Languages

This project will be implemented using :
* HTML/CSS for browser UI
* Javascript for the extension functionality
* Python for text analysis backend

## Workload

Estimated time spend are follows

| Work Item | Hours          |
| --------- | ------------: |
| Setting up BioBert | 6 |
| Implementation of page scraper | 4 |
| Implementation of PLSA algorithm | 10 |
| Implementation of BM25 | 10 |
| Implementation of Bing Callout | 5 |
| Integrating Chrome extension styles | 20 |
| Quality Testing | 10 |
| Documentation | 5 |
| **Total**  | **70** |


