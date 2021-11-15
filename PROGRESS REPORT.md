## Progress Report

### Completed Tasks

* Chrome Extension Setup: We have been researching and implementing the bare bones chrome extension setup.
* Installing and running training BioBERT.  
    * Installed tensorflow version 1.15.0 to run biobert as newer version deprecate Optimizer used in biobert
    * Utilize BC2GM, BC4CHEMD, BC5CDR-chem, BC5CDR-disease, JNLPBA, linnaeus, NCBI-disease and s800 as Corpus for Named Entity Recognition (NER) training data
* Register team to Azure service for Bing Search API
* Added Bing Search API call implementation

### Ongoing Tasks

* Implementation of Page Scraper to create word collection from page
* Implementation of PLSA Algorithm to grab topics/keywords & key terms from scraped information
* Implementation of BM25 to retrieve definitions for each retrieved word/term
* Parsing and ranking the result provided by Bing Search API
* Integrating web extension with web pages and highlighting relevant words

### Challenge

* For the Chrome extension, the background language has to be Javascript, but the library we are working with is Python based. To solve this, there are a few options including compiling the Python to Javascript or finding a Javascript based library.
* For biobert the learning takes a long time, the latest training trial lasts for more than 4 hours.
* Configuring the PLSA algorithm to a level where only specific medical keywords are considered is proving to be challenging.
