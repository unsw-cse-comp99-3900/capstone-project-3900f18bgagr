import requests

# Define the base URL of your Flask app
base_url = 'http://localhost:5000'  # Update with your actual URL

# Sample registration data
registration_data = {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123",
    "confirmPassword": "password123",
}

login_data = {
    "email": "user@example.com",
    "password": "password123"
}

edit_skills_data_add = {
    "id": "user123",
    "skills": ["Python", "Flask"],
    "action": "add"
}

edit_skills_data_remove = {
    "id": "user123",
    "skills": ["Flask"],
    "action": "remove"
}

logout_data = {
    "id": "user123"
}


# Register
response = requests.post(f"{base_url}/register", json=registration_data)
print(f"Response status code: {response.status_code}")
print("Response JSON(Register):")
print(response.json())

# Login
response = requests.post(f"{base_url}/login", json=login_data)
print(f"Response status code: {response.status_code}")
print("Response JSON(Login):")
login_response = response.json()
print(response.json())

if response.status_code == 200:
    token = login_response.get('token')

    print(f"Token: {token}")

    # Edit Skills - Add
    response = requests.put(f"{base_url}/Edit_skills", json=edit_skills_data_add)
    print(f"Response status code (Edit Skills Add): {response.status_code}")
    print("Response JSON (Edit Skills Add):")
    print(response.json())

    # Edit Skills - Remove
    response = requests.put(f"{base_url}/Edit_skills", json=edit_skills_data_remove)
    print(f"Response status code (Edit Skills Remove): {response.status_code}")
    print("Response JSON (Edit Skills Remove):")
    print(response.json())

    # Logout
    response = requests.post(f"{base_url}/logout", json=logout_data)
    print(f"Response status code (Logout): {response.status_code}")
    print("Response JSON (Logout):")
    print(response.json())
else:
    print("Login failed, cannot proceed with Edit Skills and Logout tests.")