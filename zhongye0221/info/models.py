

from . import db


class Data(db.Model):
    """用户"""
    __tablename__ = "piliang"

    data_id = db.Column(db.Integer, primary_key=True)  # 用户编号
    data_name = db.Column(db.String(20), nullable=False)  # 用户昵称
    data_source = db.Column(db.String(32), nullable=False)
    province = db.Column(db.String(32), nullable=False)  # 加密的密码
    city = db.Column(db.String(32), nullable=False)
    sw_pro = db.Column(db.String(32), nullable=False)
    col_time = db.Column(db.String(32), nullable=False)
    save_time = db.Column(db.String(32), nullable=False)
    send_time = db.Column(db.String(32), nullable=False)
    status = db.Column(db.String(32), nullable=False)
    data_mil = db.Column(db.String(32), nullable=False)
    trail_num = db.Column(db.String(32), nullable=False)



class Province(db.Model):
    """省份"""
    __tablename__ = "province_info"

    provincecode = db.Column(db.Integer,primary_key=True)
    namecn = db.Column(db.String(20),nullable=False)
    countrycode = db.Column(db.String(20),nullable=False)
    sort = db.Column(db.Integer,nullable=False)



class City(db.Model):
    """城市"""
    __tablename__ = "city_info"

    citycode = db.Column(db.Integer,primary_key=True)
    provincecode = db.Column(db.Integer,nullable=False)
    namecn = db.Column(db.String(20),nullable=False)