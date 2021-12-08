# CS410 CourseProject : Medical Recommendation Extension


## Team The Recommenders

Members :
* Satyo Iswara (iswara2) (captain)
* Molly Graton (mgraton2)
* Eric Wong (etw2)

## Overview 

Medical journals/articles contains a lot of terms that are domain specific and thus create a challenge for user to comprehend the main concepts in it.  Our team aimed to bridge this challenge by adding a recommender system that helps users. This is relevant to the theme of the class as it extends to an intelligent browsing function and utilizes search/ranking to provide quick information to the user. Our team plans to use PLSA algorithm to generate several topic and significant terms from users browser current page.  After topic and significant term identification, our extension will search the web (via Bing Search API) for related pages for term definitions.  On the returned list, we further rank the document with BM25 to present user with the most relevant information.  

## Implementation

For this recomendation system we use the following external data sets and resources:
* BioBert (https://github.com/dmis-lab/biobert)

    BioBert will provide us background languange model that we will use to implement our PLSA model.  Since BioBert is specifically designed for biomedical text mining task, this language model fits our project challanges.

* Bing Search API (https://www.microsoft.com/en-us/bing/apis/bing-web-search-api)

    Bing Search API will provide us with a shorthand of all pages related to our query term which we plan to further rank.

* Mark JS (https://markjs.io/)
    
    Mark JS is a Javascript keyword highlighter library used to highlight the words on the page. 

## Instructions

To use this extension, download the repo as a zip folder and unzip it. Navigate to chrome://extensions/, turn developer mode on, and click load unpacked to upload the repo folder. The extension should now appear in the extension library. To test out the extension, navigate to a website (for example: X), and allow the extension permissions by clicking on it (in the upper right hand corner of your chrome window). Once you open the extension, click the gray box to run the extension. You can now see the relevant highlighted words and the corresponding related links. 


## Contributions

Satyo Iswara (iswara2):
* BioBert

Molly Graton (mgraton2):
* Set up chrome extension

Eric Wong (etw2):
* BM25, Bing API
