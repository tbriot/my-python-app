from flask import Flask, request, Response
import json

# My dummy comment 4
app = Flask(__name__)

holdings = [
	{
		'id':1,
		'symbol':'ENB',
		'quantity':3 
	},
	{
		'id':2,
		'symbol':'BNS',
		'quantity':11 
	},
	{
		'id':3,
		'symbol':'TD',
		'quantity':4
	}
]

@app.route('/')
def index():
	return "Index Page"

@app.route('/v1/holdings', methods=['GET'])
def getHoldings():
	return Response(json.dumps(holdings), mimetype='application/json')

@app.route('/v1/holding/<int:id>', methods=['GET'])
def getHolding(id):
	for h in holdings:
		if h['id'] == id: 
			return Response(json.dumps(h), mimetype='application/json')
	return "Could not find any holding with id=" + str(id), 404

@app.route('/v1/holding', methods=['POST'])
def addHolding():
	holding = request.get_json()
	holding['id'] = len(holdings)+1
	holdings.append(holding)	
	return "Holding created successfully" , 201

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)
