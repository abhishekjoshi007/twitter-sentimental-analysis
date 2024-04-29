from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from emotion import predict_emotion
from sentiment import predict_sentiment
app = Flask(__name__)

# database = []


CORS(app)


@app.route('/api/emotion', methods=['POST'])
def emotion_data():
    data = request.get_json()
    # database.append(data)
    if ('text' in data and len(data['text'])):
        return jsonify({
            'status': 200,
            'msg': 'Data added successfully',
            'data': {
                'emotion': predict_emotion(data['text'])
            }
        })
    else:
        return jsonify({
            'status': 422,
            'msg': 'Invalid Request'
        })


@app.route('/api/sentiment', methods=['POST'])
def sentiment_data():

    data = request.get_json()
    # database.append(data)
    if ('text' in data and len(data['text'])):
        return jsonify({
            'status': 200,
            'msg': 'Data added successfully',
            'data': {
                'sentiment': predict_sentiment(data['text'])
            }
        })
    else:
        return jsonify({
            'status': 422,
            'msg': 'Invalid Request'
        })


if __name__ == '__main__':
    app.run(port=8000, debug=True)
