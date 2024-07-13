from flask import Flask, request, send_file
from flask_restx import Resource, Api, fields, inputs, reqparse
import json, os
from pathlib import Path
import sqlite3
import uuid
import secrets

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
               (id TEXT,
                email TEXT PRIMARY KEY,
                firstName TEXT,
                lastName TEXT,
                password TEXT,
                skills ,
                Token TEXT)''')
      conn.commit()
   except sqlite3.Error as e:
      api.abort(503)
   finally:
      if conn:
         conn.close()

def getUserDetails(id):
    try:
        conn = sqlite3.connect(dbFile)
        c = conn.cursor()
        c.execute("SELECT * FROM accounts WHERE id = ?", (id,))
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
    "confirmPassword": fields.String,
})

login_model = api.model('Login', {
    "id": fields.String(required=True, description='Username'),
    "password": fields.String(required=True, description='Password')
})

logout_model = api.model('Logout',  {
    "id": fields.String(required=True, description='Username'),
})

edit_skills_model = api.model('Edit_skills',  {
    'id': fields.String(required=True, description='Username'),
    'skills': fields.List(fields.String, required=True, description='List of skills to add or remove'),
    'action': fields.String(required=True, description='Action to perform: add or remove')
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
            
            #unique user ID
            user_id = str(uuid.uuid4())
            token = secrets.token_hex(16)

            conn = sqlite3.connect(dbFile)
            c = conn.cursor()
            insertQuery = "INSERT INTO accounts (user_id, email, firstName, lastName, password, token) VALUES (?, ?, ?, ?, ?, ?)"
            insertValues = (user_id, email, firstName, lastName, password, token)
            c.execute(insertQuery, insertValues)
            conn.commit()
            conn.close()
            
            return {"message": "Registration successful", "id": user_id}, 200
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
            password = data['password']
            userDetails = getUserDetails(id)

            if userDetails and id == userDetails[0] and password == userDetails[4]:
                if userDetails[7] is not None:  
                    return {"message": "User already logged in"}, 403
                
                new_token = secrets.token_hex(16)

                conn = sqlite3.connect(dbFile)
                c = conn.cursor()
                c.execute("UPDATE accounts SET token = ? WHERE id = ?", (new_token, id))
                conn.commit()
                conn.close()

                return {"message": "Login successful"}, 200
            else:
                return {"message": "Unauthorized"}, 401

        except Exception as e:
            return {"message": "An error occurred in login", "error": str(e)}, 500
        

@api.route('/logout')
class Logout(Resource):
    @api.expect(logout_model)
    @api.response(200, 'Logout successful')
    @api.response(401, 'Logout fail')
    def post(self):
        try:
            data = request.json
            user_id = data('id')
            userDetails = getUserDetails(user_id)

            if userDetails and user_id == userDetails[0]:
                conn = sqlite3.connect(dbFile)
                c = conn.cursor()
                c.execute("UPDATE accounts SET token = NULL WHERE id = ?", (user_id,))
                conn.commit()
                conn.close()

                return {"message": "Logout successful"}, 200
            else:
                return {"message": "Invaild user id"}, 200
        except Exception as e:
            return {"message": "An error occurred in logout", "error": str(e)}, 500

@api.route('/Edit_skills')
class Edit_skills(Resource):
    @api.expect(edit_skills_model)
    @api.response(200, 'Edit successful')
    @api.response(401, 'Edit failed')
    
    def put(self):
        try:
            data = request.json
            user_id = data['id']
            skills = data['skills']
            action = data['action']
            userDetails = getUserDetails(user_id)

            if userDetails and user_id == userDetails[0]:
                # Get current skills from user details (assuming skills are stored as JSON string)
                current_skills = json.loads(userDetails[6]) if userDetails[6] else []

                if action == 'add':
                    # Add new skills
                    current_skills.extend(skill for skill in skills if skill not in current_skills)
                elif action == 'remove':
                    # Remove specified skills
                    current_skills = [skill for skill in current_skills if skill not in skills]
                else:
                    return {"message": "Invalid action specified"}, 400

                # Update skills in the database
                conn = sqlite3.connect(dbFile)
                c = conn.cursor()
                c.execute("UPDATE accounts SET skills = ? WHERE id = ?", (json.dumps(current_skills), user_id))
                conn.commit()
                conn.close()

                return {"message": "Edit successful", "skills": current_skills}, 200
            else:
                return {"message": "Unauthorized"}, 401

        except Exception as e:
            return {"message": "An error occurred during skill edit", "error": str(e)}, 500
if __name__ == '__main__':
    createDatabase(dbFile)
    app.run(debug=True)