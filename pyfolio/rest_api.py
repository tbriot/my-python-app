"""Rest API managing trades"""
import json
from flask import Flask, request, Response
import bson.json_util as bson
from pymongo import MongoClient

app = Flask(__name__)

BASE_URI = "/api/trades"

client = MongoClient("mongodb://192.168.99.100:27017")
db = client.userData

@app.route('/')
def index():
    """Root. Can be called by load balancers to check health"""
    return "Index Page"

@app.route(BASE_URI, methods=['GET'])
def get_trades():
    """Returns all trades"""
    cursor = db.trade.find()
    return Response(bson.dumps(cursor), mimetype='application/json', status=200)

# @app.route('/v1/holding/<int:id>', methods=['GET'])
# def getHolding(id):
# 	for h in holdings:
# 		if h['id'] == id:
# 			return Response(json.dumps(h), mimetype='application/json')
# 	return "Could not find any holding with id=" + str(id), 404

@app.route(BASE_URI, methods=['POST'])
def add_trade():
    """Add a trade"""
    result = db.trade.insert_one(request.get_json())
    print("insertedID=" + str(result.inserted_id))
    json_response = {}
    json_response["tradeId"] = str(result.inserted_id)
    return Response(json.dumps(json_response), mimetype='application/json', status=201)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
