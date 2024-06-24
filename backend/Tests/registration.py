import requests

# Define the base URL of your Flask app
base_url = 'http://localhost:5000'  # Update with your actual URL

# Sample registration data
registration_data = {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123",
    "confirmPassword": "password123"
}

login_data = {
    "email": "user@example.com",
    "password": "password123"
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
print(response.json())
