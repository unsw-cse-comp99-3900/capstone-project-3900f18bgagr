from flask_restx import fields, Model
from app.api import ns

career_model = ns.model('Career', {
    'id': fields.String(required=True, description='The career identifier'),
    'name': fields.String(required=True, description='The name of the career'),
    'description': fields.String(required=False, description='A brief description of the career')
})
