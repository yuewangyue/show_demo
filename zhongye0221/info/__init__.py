from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import *

import redis
import os



db = SQLAlchemy()

app = Flask(__name__)


UPLOAD_FOLDER='upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
basedir = os.path.abspath(os.path.dirname(__file__))
ALLOWED_EXTENSIONS = set(['txt','png','jpg','xls','JPG','PNG','xlsx','gif','GIF'])

CORS(app,supports_credentials=True)
app.config.from_object(Config)

db.init_app(app)

from info.admin import admin_blu
app.register_blueprint(admin_blu)

from info.show_data import show_blu
app.register_blueprint(show_blu)


db = SQLAlchemy(app)
# 配置数据库
