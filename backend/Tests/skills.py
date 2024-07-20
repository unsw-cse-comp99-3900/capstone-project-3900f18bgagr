import requests
import pytest

PORT = 5000
URL = f"http://localhost:{PORT}"


# Authentication
class TestClass:
    userPayload = {
        'email': 'user1234@gmail.com',
        'firstName': 'userFirst',
        'lastName': 'userLast',
        'password': 'Password123',
        'confirmPassword': 'Password123'
    }
    def test_signup_success(self):
        # SUCCESS
        response = requests.post(f"{URL}/register", json=self.userPayload)
        assert response.status_code == 200
        data = response.json()
        assert 'id' in data
        assert 'token' in data

        # FAIL - Email already exists
        response = requests.post(f"{URL}/register", json=self.userPayload)
        assert response.status_code == 409
        data = response.json()
        assert data["Error"] == "Email already exists"

        # FAIL - Password don't match
        # FAIL - Add more fails from endPoints

    def test_login_success(self):
        assert 1 == 2
    #     # SUCCESS

    #     # FAIL
