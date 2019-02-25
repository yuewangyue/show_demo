from flask_script import Manager
from flask_migrate import Migrate,MigrateCommand
from info import app, db
from flask_cors import CORS



manager = Manager(app)
Migrate(app,db)
manager.add_command('db', MigrateCommand)



if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    manager.run()
    CORS(app)



# 启动命令
# python manage.py runserver -p 5001
