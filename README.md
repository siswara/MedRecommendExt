# CS410 CourseProject : Medical Recommendation Extension


## Team The Recommenders

Members :
* Satyo Iswara (iswara2) (captain)
* Molly Graton (mgraton2)
* Eric Wong (etw2)

## Overview + Purpose

Medical journals/articles contains a lot of terms that are domain specific and thus create a challenge for user to comprehend the main concepts in it.  Our team aimed to bridge this challenge by adding a recommender system that helps users. With our extension, relevant medical terms on a page will be highlighted and link to articles to learn more about these terms. This creates an easy and efficient way to understand medical articles without having to stop to research each term that a user is not familar with.

## Implementation

The extension works using BioBert to decide which words would be most useful to be defined for a user, the Bing API to retrieve relevant search results, and a BM25 implementation to further rank these search results. The Chrome Extension also utilizes the MarkJS library to efficiently highlight the terms, and Javascript logic to link the relevant links to the terms.

External data sets and resources:
* BioBert (https://github.com/dmis-lab/biobert)

    BioBert will provide us background languange model that we will use to implement our PLSA model.  Since BioBert is specifically designed for biomedical text mining task, this language model fits our project challanges.

* Bing Search API (https://www.microsoft.com/en-us/bing/apis/bing-web-search-api)

    Bing Search API will provide us with a shorthand of all pages related to our query term which we plan to further rank.

* Mark JS (https://markjs.io/)
    
    Mark JS is a Javascript keyword highlighter library used to highlight the words on the page. 

## Installation
Requirement : python version 3.6
1. Download the repo as a zip folder and unzip it.
1. Navigate to chrome://extensions/
1. Turn developer mode on
1. Load unpacked to upload the repo folder
1. Open bash line to install python dependencies. Run the following commands:
```
    cd MedRecommendExt   // or whatever you named the repo folder download
    cd lib
    python3 -m venv env
    source env/bin/activate
    python3.6 -m pip install torch
    python3.6 -m pip install transformers
    python3.6 -m pip install flask
    export FLASK_APP=bio_ner_flask
    flask run
```
Note: if you get an error about "flask run" failing due to an ImportError, run "python3.6 bio_ner_flask.py" to view the cause of the error. You may need to upgrade other packages or uninstall NumPy, but the python3.6 command should tell you what is needed. 

## How-to-use

To test out the extension, navigate to a website (for example: X), and allow the extension permissions by clicking on it (in the upper right hand corner of your chrome window). Once you open the extension, click the button inside the extension. You can now see the relevant disease entity and the corresponding related links. 


![Alt Text](https://raw.githubusercontent.com/siswara/MedRecommendExt/main/assets/MedExtension_Gif.gif)


## Contributions

Satyo Iswara (iswara2):
* Researched and implemented BioBert
* Connected the various components of the extension

Molly Graton (mgraton2):
* Set up chrome extension to connect with other components
* Integrated highlighting library with extension

Eric Wong (etw2):
* Implemented BM25 algorithm
* Set up Bing API usage
