
#Copyright (c) Microsoft Corporation. All rights reserved.
#Licensed under the MIT License.

# -*- coding: utf-8 -*-

import json
import os 
from pprint import pprint
import requests
import math

'''
This sample makes a call to the Bing Web Search API with a query and returns relevant web search.
Documentation: https://docs.microsoft.com/en-us/bing/search-apis/bing-web-search/overview
'''

# Add your Bing Search V7 subscription key and endpoint to your environment variables.
subscription_key = '' 
endpoint = 'https://api.bing.microsoft.com/v7.0/search'

# Test Query term(s) to search for. 
query = "UIUC CS410"

# Construct a request
mkt = 'en-US'
params = { 'q': query, 'mkt': mkt }
headers = { 'Ocp-Apim-Subscription-Key': subscription_key }

def BM25(corpus, query, k1=1.5, b=0.75):
    """
    Uses BM25 algorithm to take in a list of strings representing documents
    and a Query string, and returns a corresponding list of similarity scores

    Parameters
    ----------
    corpus : list[str]
        List of strings containing the texts of each document

    query : str
        Search query to compare the texts in each document to

    k1 : float, default = 1.5

    b : float, default = 0.75

    Attributes
    ----------

    stopwords : set(list[str])
        A list of stopwords to filter out of the query/corpus

    word_count_dict : dict[str, int]
        Dictionary of each term in the corpus and its number of appearances
    
    M : int
        Total number of documents in the corpus

    doc_length : int
        Total length of a document based on words

    avdl : float
        Average length of all documents in the corpus based on words

    tf : list[dict[str,int]]
        List containing all the term frequencies of each document

    df : dict[str, int]
        Dictionary of term string and the corresponding document frequency int

    query_tf : dict[str, int]
        Dictionary of term string and the corresponding count in the query
        
    """
    #Create a set of stopwords to filter out of the query/corpus
    stopwords = set(['for', 'a', 'of', 'the', 'and', 'to', 'in'])

    docs_tokenized = [
        [text for text in doc.lower().split() if text not in stopwords]
        for doc in corpus
    ]

    query_tokenized = [text for text in query.lower().split() if text not in stopwords]

    word_count_dict = {}
    for text in docs_tokenized:
        for token in text:
            word_count = word_count_dict.get(token, 0) + 1
            word_count_dict[token] = word_count

    #Calculate M
    M = len(corpus)

    #Calculate |d| (Document Lengths)
    doc_length = []
    for doc in docs_tokenized:
        doc_length.append(len(doc))

    #Calculate avdl
    avdl = sum(doc_length)/M

    #Calculate Term Frequency and Document Frequency
    tf = []
    df = {}
    for doc in docs_tokenized:
        frequencies = {}
        for term in doc:
            term_count = frequencies.get(term,0) + 1
            frequencies[term] = term_count

        tf.append(frequencies)

        for term, count in frequencies.items():
            df_count = df.get(term,0) + 1
            df[term] = df_count


    query_tf = {}
    for term in query_tokenized:
        term_count = query_tf.get(term,0) + 1
        query_tf[term] = term_count



    #Conduct BM25 scoring accumulations
    scores = []
    for i in range(0, len(docs_tokenized)):
        score = 0.0

        curr_doc_length = doc_length[i]
        frequencies = tf[i]
        for term in query_tokenized:
            if term in frequencies and term in query_tf:
                curr_term_freq = frequencies[term]
                curr_doc_frequency = df[term]
                currScore = query_tf[term]*((k1+1)*curr_term_freq)/(curr_term_freq+k1*(1-b+b*curr_doc_length/avdl))*math.log((M+1)/curr_doc_frequency)
                score = score + currScore
        scores.append(score)


  
    return scores

# Call the API
try:
    response = requests.get(endpoint, headers=headers, params=params)
    response.raise_for_status()

    print("Headers:")
    print(response.headers)

    #print("JSON Response:")
    #print(response.json())

    print("URL Result:")
    for webPage in response.json()["webPages"]["value"]:
        print("{0} - {1}".format(webPage["name"], webPage["url"]))
    #BM25 Demonstration
    corpus = []
    for webPage in response.json()["webPages"]["value"]:
        corpus.append(webPage["name"])
    query = "Text Information Systems"
    bm25_scores = BM25(corpus, query)
    print("------------------------")
    print("BM25 SCORES BASED ON QUERY: '" + str(query) + "'")
    for i in range(0, len(bm25_scores)):
        print("[Score: {0}]  {1}".format(round(bm25_scores[i],3),corpus[i]))

    
    
except Exception as ex:
    raise ex
    