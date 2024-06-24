from flask import Flask, request, send_file
from flask_restx import Resource, Api, fields, inputs, reqparse
import json, os
from pathlib import Path
import sqlite3

app = Flask(__name__)
api = Api(app,
          default = 'stops',
          title = 'Deutsche Bahn Stops and Guide API',
          description = 'Additional features on top of Deutsche Bahn Stops and Guide API'
          )

# INITIALIZATION
dbFile = "accounts.db"

# DATABASE
def createDatabase(dbFile):
   if not os.path.exists(dbFile):
      return
   try:
      conn = sqlite3.connect(dbFile)
      c = conn.cursor()
      c.execute('''DROP TABLE IF EXISTS accounts''')
      c.execute('''CREATE TABLE accounts
               (email TEXT PRIMARY KEY,
                firstName TEXT,
                lastName TEXT,
                password TEXT)''')
      conn.commit()
   except sqlite3.Error as e:
      api.abort(503)
   finally:
      if conn:
         conn.close()

def getUserDetails(email):
    try:
        conn = sqlite3.connect(dbFile)
        c = conn.cursor()
        c.execute("SELECT * FROM accounts WHERE email = ?", (email,))
        userDetails = c.fetchone()  # Fetch single row
        return userDetails
    except sqlite3.Error as e:
        print(f"Error fetching user details: {e}")
        raise
    finally:
        if conn:
            conn.close()

# MODELS
registrationModel = api.model('Register', {
   "email": fields.String,
   "firstName": fields.String,
   "lastName": fields.String,
   "password": fields.String,
   "confirmPassword": fields.String
})

login_model = api.model('Login', {
    'email': fields.String(required=True, description='Username'),
    'password': fields.String(required=True, description='Password')
})

@api.route('/register')
class Register(Resource):
    @api.expect(registrationModel)
    @api.response(200, 'OK')
    @api.response(400, 'BAD REQUEST')
    @api.response(403, 'INVALID INPUT')

    def post(self):
        try:
            data = request.json
            print(data)

            # add to database
            email = data['email']
            firstName = data['firstName']
            lastName = data['lastName']
            password = data['password']
            confirmPassword = data['confirmPassword']
            if password != confirmPassword:
                return {"Error: Password don't match"}, 400

            conn = sqlite3.connect(dbFile)
            c = conn.cursor()
            insertQuery = "INSERT INTO accounts (email, firstName, lastName, password) VALUES (?, ?, ?, ?)"
            insertValues = (email, firstName, lastName, password)
            c.execute(insertQuery, insertValues)
            conn.commit()
            conn.close()
            
            return {"message": "Registration successful"}, 200
        except Exception as e:
            return {"message": "An error occurred in registration", "error": str(e)}, 400

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    @api.response(200, 'Login successful')
    @api.response(401, 'Unauthorized')
    
    def post(self):
        try:
            data = request.json
            email = data['email']
            password = data['password']
            userDetails = getUserDetails(email)
            print(userDetails[0])
            if email == userDetails[0] and password == userDetails[3]:
                return {"message": "Login successful"}, 200
            else:
                return {"message": "Unauthorized"}, 401

        except Exception as e:
            return {"message": "An error occurred in login", "error": str(e)}, 500
    
if __name__ == '__main__':
    createDatabase(dbFile)
    app.run(debug=True)