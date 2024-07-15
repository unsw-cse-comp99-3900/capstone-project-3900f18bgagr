from flask import Flask, request, send_file
from flask_restx import Resource, Api, fields, inputs, reqparse
import json, os
from pathlib import Path
import sqlite3
import uuid
import secrets
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
api = Api(app,
          default = 'stops',
          title = 'Deutsche Bahn Stops and Guide API',
          description = 'Additional features on top of Deutsche Bahn Stops and Guide API'
          )
CORS(app)

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
               (id TEXT PRIMARY KEY,
                email TEXT,
                firstName TEXT,
                lastName TEXT,
                password TEXT,
                skills TEXT,
                token TEXT)''')
      conn.commit()
   except sqlite3.Error as e:
      api.abort(503)
   finally:
      if conn:
         conn.close()

def getUserDetails(id):
    try:
        print('hererere')
        conn = sqlite3.connect(dbFile)
        c = conn.cursor()
        c.execute("SELECT * FROM accounts WHERE id = ?", (id,))
        userDetails = c.fetchone()  # Fetch single row
        
        if userDetails:
            print("User details found:", userDetails)
            return userDetails
        else:
            print("User details not found")
            return None  # or handle as needed
        
    except sqlite3.Error as e:
        print(f"Error fetching user details: {e}")
        raise  # Rethrow the exception to handle it at a higher level

    finally:
        if conn:
            conn.close()

# MODELS
registrationModel = api.model('Register', {
    "email": fields.String,
    "firstName": fields.String,
    "lastName": fields.String,
    "password": fields.String,
    "confirmPassword": fields.String,
})

login_model = api.model('Login', {
    "id": fields.String(required=True, description='Username'),
    "password": fields.String(required=True, description='Password')
})

logout_model = api.model('Logout',  {
    "id": fields.String(required=True, description='Username'),
})

edit_detail_model = api.model('Edit_detail',  {
    'id': fields.String(required=True, description='Username'),
    'firstName': fields.String(description='First Name'),
    'lastName': fields.String(description='Last Name'),
    'skills': fields.List(fields.String, description='List of skills')
})

@api.route('/register')
class Register(Resource):
    @api.expect(registrationModel)
    @api.response(200, 'OK')
    @api.response(400, 'BAD REQUEST')
    @api.response(403, 'INVALID INPUT')

    def post(self):
        try:
            print('Someone trying to register ...')
            data = request.json

            # add to database
            email = data['email']
            firstName = data['firstName']
            lastName = data['lastName']
            password = data['password']
            confirmPassword = data['confirmPassword']
            print('Data received==========')
            print(password, confirmPassword) 
            if password != confirmPassword:
                return {"Error": "Password don't match"}, 400
            
            print('Data received==========')
            #unique user ID
            user_id = str(uuid.uuid4())
            token = secrets.token_hex(16)

            conn = sqlite3.connect(dbFile)
            c = conn.cursor()
            insertQuery = "INSERT INTO accounts (id, email, firstName, lastName, password, token) VALUES (?, ?, ?, ?, ?, ?)"
            insertValues = (user_id, email, firstName, lastName, password, token)
            c.execute(insertQuery, insertValues)
            conn.commit()
            conn.close()
            
            print(f'returning userId: {user_id}, token: {token}')
            return {"id": user_id,
                    "token": token
                    }, 200
        except Exception as e:
            return {"message": "An error occurred in registration", "error": str(e)}, 400

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    @api.response(200, 'Login successful')
    @api.response(401, 'Unauthorized')
    @api.response(403, 'Logined')
    
    def post(self):
        try:
            data = request.json
            id = data['id']
            email = data['email']
            password = data['password']
            userDetails = getUserDetails(id)
            id = userDetails[0]
            print(userDetails)

            if userDetails and email == userDetails[1] and password == userDetails[4]:
                new_token = secrets.token_hex(16)

                conn = sqlite3.connect(dbFile)
                c = conn.cursor()
                c.execute("UPDATE accounts SET token = ? WHERE id = ?", (new_token, id))
                conn.commit()
                conn.close()

                return {"id": id,
                        "token": new_token}, 200
            else:
                return {"message": "Unauthorized"}, 401

        except Exception as e:
            return {"message": "An error occurred in login", "error": str(e)}, 500
        

@api.route('/userDetails')
class userDetails(Resource):
    # @api.expect(logout_model)
    @api.response(200, 'Get details successful')
    @api.response(401, 'Get details fail')
    def get(self):
        try:
            data = request.headers
            userId = data['id']
            userToken = data['Authorization']
            print(f'userId: {userId}')
            if userId:
                print(userId, type(userId))
                userDetails = getUserDetails(userId)
                if len(userDetails) > 0:
                    return {
                        'id': userDetails[0],
                        'email': userDetails[1],
                        'firstName': userDetails[2],
                        'lastName': userDetails[3],
                        'skills': userDetails[5]
                    }, 200
                else:
                    print("User Details not found")
            else:
                print('No user id provided: User id = ', userId)
        except Exception as e:
            return {"message": "An error occurred in logout", "error": str(e)}, 500

@api.route('/logout')
class Logout(Resource):
    # @api.expect(logout_model)
    @api.response(200, 'Logout successful')
    @api.response(401, 'Logout fail')
    def post(self):
        try:
            data = request.json
            print("***" * 5)
            print(data)
            user_id = data['id']
            userDetails = getUserDetails(user_id)
            if userDetails and user_id == userDetails[0]:
                conn = sqlite3.connect(dbFile)
                c = conn.cursor()
                c.execute("UPDATE accounts SET token = NULL WHERE id = ?", (user_id,))
                conn.commit()
                conn.close()

                return {"message": "Logout successful"}, 200
            else:
                return {"message": "Invaild user id"}, 400
        except Exception as e:
            return {"message": "An error occurred in logout", "error": str(e)}, 500

@api.route('/Edit_detail')
class Edit_skills(Resource):
    @api.expect(edit_detail_model)
    @api.response(200, 'Edit successful')
    @api.response(401, 'Edit failed')
    
    def patch(self):
        try:
            data = request.json
            user_id = data['id']
            new_firstName = data.get('firstName')
            new_lastName = data.get('lastName')
            new_skills = data.get('skills')

            userDetails = getUserDetails(user_id)

            if userDetails and user_id == userDetails[0]:
                update_fields = {}
                if new_firstName:
                    update_fields['firstName'] = new_firstName
                if new_lastName:
                    update_fields['lastName'] = new_lastName
                if new_skills is not None:
                    update_fields['skills'] = json.dumps(new_skills)

                if update_fields:
                    update_query = "UPDATE accounts SET " + ", ".join(f"{key} = ?" for key in update_fields.keys()) + " WHERE id = ?"
                    update_values = list(update_fields.values()) + [user_id]

                    conn = sqlite3.connect(dbFile)
                    c = conn.cursor()
                    c.execute(update_query, update_values)
                    conn.commit()
                    conn.close()

                    return {"message": "Edit successful"}, 200
                else:
                    return {"message": "No updates provided"}, 400
            else:
                return {"message": "Unauthorized"}, 401

        except Exception as e:
            return {"message": "An error occurred during detail edit", "error": str(e)}, 500
if __name__ == '__main__':
    createDatabase(dbFile)
    app.run(debug=True)