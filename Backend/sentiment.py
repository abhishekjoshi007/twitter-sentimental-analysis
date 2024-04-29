import csv
from textblob import TextBlob

# Function to train the sentiment analysis model


def convert_row(row):
    row_dict = {}
    for key, value in row.items():
        keyAscii = key.encode('ascii', 'ignore').decode()
        valueAscii = value.encode('ascii', 'ignore').decode()
        row_dict[keyAscii] = valueAscii
    return row_dict


def train_sentiment_model(file_name):
    sentiment_model = {}
    with open(file_name, 'r') as csvfile:
        csvreader = csv.DictReader(csvfile)

        for row in csvreader:
            value = convert_row(row)

            sentiment_model[value['text']] = value['sentiment']
    return sentiment_model

# Function to predict the sentiment of a given text


# def predict_sentiment(text, sentiment_model):
#     sentiment = TextBlob(text).sentiment.polarity
#     if sentiment > 0:
#         return sentiment_model['positive']
#     elif sentiment < 0:
#         return sentiment_model['negative']
#     else:
#         return sentiment_model['neutral']
# Train the sentiment analysis model
sentiment_model = train_sentiment_model('./data/sentiments.csv')


def predict_sentiment(text):
    sentiment = TextBlob(text).sentiment.polarity
    if sentiment > 0:
        return "positive"
    # elif sentiment < 0:
    #     return sentiment_model['negative']
    else:
        return "negative"
# Get user input
# input_text = input("Enter a text: ")

# Predict the sentiment of the input text
# sentiment = predict_sentiment(input_text, sentiment_model)


# Print the sentiment
# print(f"The sentiment of the text is: {sentiment}")
