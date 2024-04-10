import unicodedata
import re
from dataclasses import dataclass


units = {
    "l": ["l", "litre", "litres", "liter", "liters"],
    "ml": ["ml", "millilitre", "milli litre", "millilitres", "milli litres", "milliliter", "milli liter", "milliliters", "milli liters"],
    "g": ["g", "gram", "grams"],
    "mg": ["mg", "milligram", "milli gram", "milligrams", "milli grams"],
    "kg": ["kg", "kilogram", "kilo gram", "kilograms", "kilo grams"],
    "oz": ["oz", "ounce", "ounces", "-ounce"],
    "qt": ["qt", "quart"],
    "fl": ["fl"],
    "tsp": ["tsp", "tsps", "tsp.", "tsps.", "teaspoon", "teaspoons"],
    "tbsp": ["tbs", "tbsp", "tbsps", "tbsp.", "tbsps.", "tablespoon", "tablespoons"],
    "cup": ["cup", "cups", "c."],
    "pint": ["pint", "pints"],
    "pinch": ["pinch"],
    "strip": ["strip", "strips"],
    "envelope": ["envelope", "envelopes", "sheet", "sheets"],
    "gal": ["gal", "gallon", "gallons"],
    "dash": ["dash"],
    "can": ["can", "cans"],    
    "lb": ["lb", "lbs", "lb.", "lbs.", "pound", "pounds", "-pound"],
    "whole": ["whole"],
    "head": ["head", "heads"],
    "clove": ["clove", "cloves"],
    "bunch": ["bunch", "bunches"],
    "handful": ["handful", "handfuls"],
    "piece": ["piece", "pieces", "pc", "pc."],
    "inch": ["inch", "inches", "\""], # e.g.: "2-3inch piece of ginger" or 2-3" piece of ginger
    "cm": ["cm"] # see inch…
}

# numbers with a simple slash fraction (1 1/3, 2 4/5, etc.)
numberAndSlashFraction = re.compile(r'(\d{1,3}?\s\d\/\d{1,3})')
# Vulgar fractions (½, ⅓, etc.)
fractionMatch = re.compile(r'[\u00BC-\u00BE\u2150-\u215E]')
# numbers (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
numberMatch = re.compile(r'(\d*(\.?|,?)?\d*)')
# numbers and fractions (1⅓, 1 ⅓, etc.)
numberAndFractionMatch = re.compile(r'(\d{1,3}\s?[\u00BC-\u00BE\u2150-\u215E])')
# simple slash fractions (1/2, 1/3, 5/4, etc.)
slashFractionMatch = re.compile(r'(\d{1,3}\/\d{1,3})')
# vulgar slash which is it's own character in unicode.
# for example: 1⁄2, 4⁄3
vulgarSlashFractionMatch = re.compile(r'(\d{1,3}\u2044\d{1,3})')
# number with a vulgar slash in a fraction (1 1⁄2)
numberAndVulgarSlashFraction = re.compile(r'(\d{1,3}?\s\d\u2044\d{1,3})')
# any of the above, where the first character is not a word (to keep out "V8")
quantityMatch = re.compile(r'(?<!\w)((\d{1,3}?\s\d\/\d{1,3})|(\d*(\.?)?\d*)|(\d{1,3}?\s?\d\u2044\d{1,3})|(\d{1,3}\u2044\d{1,3})|(\d{1,3}\s?[\u00BC-\u00BE\u2150-\u215E])|([\u00BC-\u00BE\u2150-\u215E])|(\d{1,3}\/?\d?)%?)')
# string between parantheses, for example: "this is not a match (but this is, including the parantheses)"
betweenParanthesesMatch = re.compile(r'\(([^\)]+)\)')

def isFullTypedFraction(text : str) -> bool:
    if text.find('/') >= 0 or text.find('\u2044') >= 0:
        return True
    else:
        return False
    
def cleanhtml(raw_html):
    """ In some recipe websites, the ingredient can contain an HTML tag, mostly an anchor
        to link to some other recipe. Let's remove those.
    """
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext


def parse_ingredient(text : str):
    """ Tries to extract the quantity, the unit and the ingredient itself from a string """

    # We're doing a VERY simple parse. This could probably be better with some NLP
    # but we have nowhere near time enough for that during this assignment.

    text = cleanhtml(text)

    # Recipe websites tend to put a comment between parantheses. 
    # for example: 1 (fresh) egg. Let's see if we can find any and extract it
    text = re.sub(r'\s*\([^)]*\)', '', text)

    # Some recipe websites tend to put a comment in the end of the line
    # seperated by a comma. Let's see if we can find any and extract it
    # We do this here, pretty early, because there might be numbers in there
    # we don't want to take in account for quantities.
    commaSplitted = text.split(',')
    if len(commaSplitted) > 1:
        # But we also want to allow decimals in the form of 0,5
        if (len(commaSplitted[0]) == 0 or not commaSplitted[0][-1].isnumeric()) and not commaSplitted[1][0].isnumeric():
            comment = comment + ' ' + ', '.join(commaSplitted[1:])
            comment = comment.strip(' ')
            text = commaSplitted[0]

    match = quantityMatch.search(text)

    if match:
        text = text[match.endpos:]
    return text