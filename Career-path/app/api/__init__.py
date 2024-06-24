# app/api/__init__.py
from flask_restx import Api

api = Api(version='1.0', title='Sample API', description='A sample API')

ns = api.namespace('careers', description='Career operations')
