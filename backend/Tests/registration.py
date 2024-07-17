import requests

# Define the base URL of your Flask app
base_url = 'http://localhost:5000'  # Update with your actual URL

# Sample registration data



# edit_skills_data_add = {
#     "id": "user123",
#     "skills": "Python,Flask", # the database can only accept string, so make sure if you have an array, convert it into string separated by comma(",").
#     "action": "add"
# }

# edit_skills_data_remove = {
#     "id": "user123",
#     "skills": ["Flask"],
#     "action": "remove"
# }

print('\n')
# Register
registration_data = {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123",
    "confirmPassword": "password123",
}
response = requests.post(f"{base_url}/register", json=registration_data)
print(f"***REGISTER RESPONSE***:{'200 - SUCCESS' if response.status_code == 200 else 'FAIL - SOMETHING WENT WRONG!'}")
print("Response JSON(Register):")
print(response.json()) # for debugging
assert response.status_code == 200
print('\n')
data = response.json()
userId = data['id'] # The id returned from registration api is the id that should be used for login.

# Login
login_data = {
    "email": "user@example.com",
    "password": "password123",
    "id": userId
}
response = requests.post(f"{base_url}/login", json=login_data)
print(f"***LOGIN RESPONSE***:{'200 - SUCCESS' if response.status_code == 200 else 'FAIL - SOMETHING WENT WRONG!'}")
print("Response JSON(Login):")
print(response.json()) # for debugging
assert response.status_code == 200
print('\n')


#Edit_skills_add
Edit_detail_data = {
    'id': userId,
    "firstName": "Jack",
    "lastName": "Black",
    'skills': "Python,Flask",
}
# Skills: []  -> skills: [Python, Flask]
response1 = requests.patch(f"{base_url}/Edit_detail", json=Edit_detail_data)
print(f"***REGISTER RESPONSE***:{'200 - SUCCESS' if response1.status_code == 200 else 'FAIL - SOMETHING WENT WRONG!'}")
print("Response JSON(Edit_detail):")
print(response1.json())
assert response1.status_code == 200
print('\n')

#Edit_skills_remove
Edit_detail_2_data = {
    'id': userId,
    "firstName": "John",
    "lastName": "Doe",
    'skills': "Python",
}

# skills:[Python, Flask] -> skills: [Python]

response2 = requests.patch(f"{base_url}/Edit_detail", json=Edit_detail_2_data)
print(f"***REGISTER RESPONSE***:{'200 - SUCCESS' if response2.status_code == 200 else 'FAIL - SOMETHING WENT WRONG!'}")
print("Response JSON(Edit_detail):")
print(response2.json())
assert response2.status_code == 200
print('\n')

# Logout
logoutData = {
    "id": userId # Note: your logout api only requires userId.
}
response = requests.post(f"{base_url}/logout", json=logoutData)
print(f"***LOGOUT RESPONSE***:{'200 - SUCCESS' if response.status_code == 200 else 'FAIL - SOMETHING WENT WRONG!'}")
print("Response JSON (Logout):")
print(response.json()) # for debugging
assert response.status_code == 200
print('\n')

# if response.status_code == 200:
#     token = login_response.get('token')

#     print(f"Token: {token}")

#     # Edit Skills - Add
#     response = requests.put(f"{base_url}/Edit_skills", json=edit_skills_data_add)
#     print(f"Response status code (Edit Skills Add): {response.status_code}")
#     print("Response JSON (Edit Skills Add):")
#     print(response.json())

#     # Edit Skills - Remove
#     response = requests.put(f"{base_url}/Edit_skills", json=edit_skills_data_remove)
#     print(f"Response status code (Edit Skills Remove): {response.status_code}")
#     print("Response JSON (Edit Skills Remove):")
#     print(response.json())


# else:
#     print("Login failed, cannot proceed with Edit Skills and Logout tests.")


print("All test case passed.")