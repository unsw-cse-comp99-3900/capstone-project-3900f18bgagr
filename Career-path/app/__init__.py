# app/api/career_api.py
from flask_restx import Resource
from . import ns

@ns.route('/')
class CareerList(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        return {'message': 'Create a new career'}, 201
