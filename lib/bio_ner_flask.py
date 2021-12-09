from flask import Flask
from flask import request

from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

from BingSearch import getDefinition

app = Flask(__name__)

@app.route("/bio_ner_ping", methods=['POST'])
def bio_ner_ping():
    return {
        "return" : "I'm alive!"
    }

@app.route("/bio_ner", methods=['POST'])
def bio_ner():
    
    bodyText = request.get_json()["body"]
    tokenizer = AutoTokenizer.from_pretrained("ugaray96/biobert_ncbi_disease_ner")
    model = AutoModelForTokenClassification.from_pretrained("ugaray96/biobert_ncbi_disease_ner")
    
    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    ner_results = nlp(bodyText)

    part_entities = []
    for ner_result in ner_results :
        if (ner_result['entity'] == 'No Disease') :
            continue
        else :
            part_entities.append(ner_result)

    entities = []
    entity = ''
    for part_entity in part_entities :
        if not ('Continuation' in part_entity['entity']) :
            if (entity != '') and (not (entity in entities)) :
                entities.append(entity)
            entity = part_entity['word']
        else :
            if part_entity['word'].startswith('##'):
                entity += part_entity['word'].replace('##', '')
            else:
                entity += ' ' + part_entity['word']
    
    entities_with_links = []
    for entity in entities:
        if len(entity) <= 1:
            continue
        entity_with_links = {
            "name" : entity,
            "links" : getDefinition(entity)
        }
        entities_with_links.append(entity_with_links)

    return {
        "entities_with_links" : entities_with_links
    }