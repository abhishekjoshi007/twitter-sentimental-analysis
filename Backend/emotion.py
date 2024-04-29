import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
data = pd.read_csv('./data/emotions.csv')
# Convert the sentiment column to lowercase
data['sentiment'] = data['sentiment'].str.lower()
# Convert the sentiment column to lowercase
data['sentiment'] = data['sentiment'].str.lower()

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    data['content'], data['sentiment'], test_size=0.2, random_state=42)
vectorizer = CountVectorizer(stop_words='english')
X_train_counts = vectorizer.fit_transform(X_train)
X_test_counts = vectorizer.transform(X_test)
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    data['content'], data['sentiment'], test_size=0.2, random_state=42)

clf = MultinomialNB().fit(X_train_counts, y_train)
y_pred = clf.predict(X_test_counts)
# print(classification_report(y_test, y_pred))


def predict_emotion(text):
    text_counts = vectorizer.transform([text])
    sentiment = clf.predict(text_counts)
    return sentiment[0]

# input_string = "I am a driving."
# predicted_sentiment = predict_sentiment(input_string)
# print(predicted_sentiment)
