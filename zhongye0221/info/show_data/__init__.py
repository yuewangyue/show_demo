from flask import Blueprint

show_blu = Blueprint("show_data", __name__)

from . import views