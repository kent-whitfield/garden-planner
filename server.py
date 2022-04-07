# Install packages to venv
# python -m pip install Flask-PyMongo
# python -m pip install pymongo[srv]
# python -m pip install -U flask-cors
# python -m pip install python-bsonjs
# python -m pip install flask-jwt-extended

# Activate venv: .venv\scripts\activate

from flask import Flask, request, json, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

secret_key = '563d471dc25c951762108a95c727574d'
app.config['JWT_SECRET_KEY'] = secret_key
jwt = JWTManager(app)

app.config['CORS_HEADERS'] = "Content-Type"
app.config['CORS_RESOURCES'] = {r"/*": {"origins": "*"}}
cors = CORS(app)

mongoURI = 'mongodb+srv://langara-user:AUserAtLangara@cluster0.37t0h.mongodb.net/garden_planner'
app.config['MONGO_URI'] = mongoURI
mongo1 = PyMongo(app, uri=mongoURI)
dbSeeds = mongo1.db.seeds
dbUsers = mongo1.db.users
dbGardens = mongo1.db.gardens


@app.route('/')
def home():
    return('<h1>Garden Planner Server</h1>')


@app.route('/user/register', methods=['POST'])
def user_register():
    reqEmail = request.json['email']
    reqFirstName = request.json['firstName']
    reqLastName = request.json['lastName']
    reqPassword = request.json['password']

    regResult = {}

    if dbUsers.find_one({"email": reqEmail}):
        regResult['message'] = "email " + reqEmail + " already has an account"
        regResult['status'] = 409
    else:
        newUser = {}
        newUser['email'] = reqEmail
        newUser['firstName'] = reqFirstName
        newUser['lastName'] = reqLastName
        newUser['password'] = generate_password_hash(
            reqPassword, method='sha256')
        pyResult = dbUsers.insert_one(newUser)
        if pyResult.inserted_id:
            regResult['message'] = pyResult.inserted_id
            regResult['auth_token'] = create_access_token(identity=reqEmail)
            regResult['status'] = 201
        else:
            regResult['message'] = "unable to register user"
            regResult['status'] = 500

    return json_util.dumps(regResult), regResult['status']


@app.route('/user/login', methods=['POST'])
def user_login():
    reqEmail = request.json['email']
    reqPassword = request.json['password']

    loginResult = {}

    user = dbUsers.find_one({"email": reqEmail})
    if user == None:
        loginResult['message'] = "invalid email address"
        loginResult['status'] = 401
    elif check_password_hash(user['password'], reqPassword):
        loginResult['message'] = "login successful"
        loginResult['auth_token'] = create_access_token(identity=user['email'])
        loginResult['status'] = 200
    else:
        loginResult['message'] = "invalid password"
        loginResult['status'] = 401

    return json_util.dumps(loginResult), loginResult['status']


@app.route('/create/seed', methods=['POST'])
def create_seed():
    data = request.get_json()
    oID = dbSeeds.insert_one(data)
    print(oID)
    return jsonify({"result": "ok"})


@app.route('/update/seed', methods=['POST'])
def update_seed():
    data = request.get_json()
    seedQuery = {"_id": ObjectId(oid=str(data['_id']['$oid']))}
    newValue = {"$set": {
        "type": data['type'], "variety": data['variety'], "maturity_days": data['maturity_days']}}
    oid = dbSeeds.update_one(seedQuery, newValue)
    return jsonify({"result": "ok"})


@app.route('/delete/seed', methods=['POST'])
def delete_seed():
    data = request.get_json()
    oid = dbSeeds.delete_one({"_id": ObjectId(oid=str(data['_id']['$oid']))})
    return jsonify({"result": "ok"})


@app.route('/create/garden', methods=['POST'])
@jwt_required()
def create_garden():
    user = get_jwt_identity()
    data = request.get_json()
    data['user'] = user
    oId = dbGardens.insert_one(data)
    return jsonify({"result": "ok"})


@app.route('/update/garden', methods=['POST'])
@jwt_required()
def update_garden():
    data = request.get_json()
    gardenQuery = {"_id": ObjectId(oid=str(data['_id']['$oid']))}
    newValue = {"$set": {"plants": data['plants']}}
    oId = dbGardens.update_one(gardenQuery, newValue)
    print(oId)
    return jsonify({"result": "ok"})


@app.route('/data/seeds')
def show_data():
    allSeeds = list(dbSeeds.find({}, {}).sort("type"))
    return json_util.dumps(allSeeds)


@app.route('/data/gardens')
@jwt_required()
def show_gardens():
    user = get_jwt_identity()
    #userGardens = list(dbGardens.find({"user": user}, {"_id": 0}))
    userGardens = list(dbGardens.find({"user": user}, {}))
    # return json.dumps(userGardens)
    return json_util.dumps(userGardens)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
