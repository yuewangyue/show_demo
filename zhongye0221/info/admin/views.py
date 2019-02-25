import flask
from flask import jsonify,url_for
from flask import render_template
from flask import request
from flask import session,redirect,make_response
from flask import send_from_directory,Markup
import pymysql
import json
import os
import time
import random

from . import admin_blu



# 数据库连接--------------------
def conn_sql(sql):
    # 打开数据库连接
    db = pymysql.connect(host='localhost', port=3306, user='root', password='mysql', db="zhongye", charset='utf8')
    # 创建游标
    cursor = db.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()

    return result

# 将后台文件传到浏览器----------------------------
@admin_blu.route("/download/<filename>", methods=['GET'])
def download_file(filename):

    print(filename)
    # 需要知道2个参数, 第1个参数是本地目录的path, 第2个参数是文件名(带扩展名)
    directory = os.getcwd()  # 假设在当前目录
    response = make_response(send_from_directory(directory, filename, as_attachment=True))
    response.headers["Content-Disposition"] = "attachment; filename={}".format(filename.encode().decode('latin-1'))
    return response

# 城市信息显示--------------------------------------------------------------------------------
@admin_blu.route('/show_city', methods=['GET', 'POST'])
def show_city():
    data = request.get_json()
    print(data)
    # 城市名字
    namecn = data['pro_name']
    print("城市名字:%s" % namecn)
    try:
        if namecn != '无':
            # 打开数据库连接
            db = pymysql.connect(host='localhost', port=3306, user='root', password='mysql', db="zhongye", charset='utf8')
            # 创建游标
            cursor = db.cursor()
            # sql查询  获取id
            sql = "select provincecode from province_info where namecn = '%s'" % (namecn)
            cursor.execute(sql)
            pro_id = cursor.fetchone()
            # print(pro_id)
            provincecode = int(pro_id[0])
            # print(provincecode)
            sql = "select namecn from city_info where provincecode = '%d'" % (provincecode)
            cursor.execute(sql)
            city_name = cursor.fetchall()
            # print(city_name)
            db.close()

            city_name_num = len(city_name)
            # print(city_name_num)
            list_name = []
            for city in city_name:
                # print(city)
                list_name.append(city[0])
            print(list_name)

            return jsonify({"list_name": list_name})
        else:
            pass
    except ValueError:
        print("error")



# 进入网站
@admin_blu.route('/', methods=['POST','GET'])
def index():
    print('首页')
    return render_template('show_data/index.html')

# ----------------------------------------------------------------------

# 首页
@admin_blu.route('/shouye', methods=['POST','GET'])
def shouye():

    # 判断是否登录,是否为管理员
    user_name = session.get("name",'')
    is_admin = session.get("is_admin",'is_admin')
    if not is_admin:
        return jsonify({"error":"首页为管理员页面，请选择其他页面！"})
    # 单个数据
    data = {"n1":22222,"n2":33333,"week_diff":44444,"day_diff":55555,"check_length":66666,"n6":66666}

    # 饼图数据

    pie_data1 = [{"name":"众包App","value":100},{"name":"设备众包","value":140},{"name":"自主高精","value":300},{"name":"精细化","value":273},{"name":"新增","value":199}]
    pie_data = {"data":pie_data1,"name":['众包App','设备众包','精细化','新增','自主高精']}
    # 地图数据
    choose_prj = request.get_json()
    print(choose_prj)
    # 默认页面显示设备众包数据
    if choose_prj is None:
        print("空")
        map_data1 = [{'name': u'\u6cb3\u5317\u7701', 'value': 6016.699000000003}, {'name': u'\u5c71\u897f\u7701', 'value': 6874.914999999988}, {'name': u'\u8fbd\u5b81\u7701', 'value': 70.28799999999998}, {'name': u'\u5409\u6797\u7701', 'value': 423.59300000000013}, {'name': u'\u4e0a\u6d77\u5e02', 'value': 16.549}, {'name': u'\u6d59\u6c5f\u7701', 'value': 1759.774000000001}, {'name': u'\u5b89\u5fbd\u7701', 'value': 2101.4769999999985}, {'name': u'\u6c5f\u897f\u7701', 'value': 5958.196000000004}, {'name': u'\u5c71\u4e1c\u7701', 'value': 10329.34400000001}, {'name': u'\u6cb3\u5357\u7701', 'value': 8445.565000000002}, {'name': u'\u6e56\u5317\u7701', 'value': 1096.7640000000008}, {'name': u'\u6e56\u5357\u7701', 'value': 4893.486999999997}, {'name': u'\u5e7f\u4e1c\u7701', 'value': 1407.8100000000024}, {'name': u'\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a', 'value': 2074.755000000001}, {'name': u'\u91cd\u5e86\u5e02', 'value': 1561.7229999999986}, {'name': u'\u56db\u5ddd\u7701', 'value': 3630.7420000000006}, {'name': u'\u8d35\u5dde\u7701', 'value': 2580.7670000000026}, {'name': u'\u9655\u897f\u7701', 'value': 9282.877000000004}, {'name': u'\u9752\u6d77\u7701', 'value': 777.344}]
        map_data = {"data": map_data1}
        return render_template('show_data/shouye.html', data=data, min_value= 0, max_value=20000, map_data = json.dumps(map_data), pie_data =json.dumps(pie_data))
    elif choose_prj['choose_prj'] == '设备众包':
        print("设备众包")
        map_data = [{'name': u'\u6cb3\u5317\u7701', 'value': 6016.699000000003}, {'name': u'\u5c71\u897f\u7701', 'value': 6874.914999999988}, {'name': u'\u8fbd\u5b81\u7701', 'value': 70.28799999999998}, {'name': u'\u5409\u6797\u7701', 'value': 423.59300000000013}, {'name': u'\u4e0a\u6d77\u5e02', 'value': 16.549}, {'name': u'\u6d59\u6c5f\u7701', 'value': 1759.774000000001}, {'name': u'\u5b89\u5fbd\u7701', 'value': 2101.4769999999985}, {'name': u'\u6c5f\u897f\u7701', 'value': 5958.196000000004}, {'name': u'\u5c71\u4e1c\u7701', 'value': 10329.34400000001}, {'name': u'\u6cb3\u5357\u7701', 'value': 8445.565000000002}, {'name': u'\u6e56\u5317\u7701', 'value': 1096.7640000000008}, {'name': u'\u6e56\u5357\u7701', 'value': 4893.486999999997}, {'name': u'\u5e7f\u4e1c\u7701', 'value': 1407.8100000000024}, {'name': u'\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a', 'value': 2074.755000000001}, {'name': u'\u91cd\u5e86\u5e02', 'value': 1561.7229999999986}, {'name': u'\u56db\u5ddd\u7701', 'value': 3630.7420000000006}, {'name': u'\u8d35\u5dde\u7701', 'value': 2580.7670000000026}, {'name': u'\u9655\u897f\u7701', 'value': 9282.877000000004}, {'name': u'\u9752\u6d77\u7701', 'value': 777.344}]
        # map_data2 = {"data":map_data}
        # map_data = json.dumps(map_data2)
        # return map_data
        return jsonify({"data": map_data,"min_value":0,"max_value":29000})
    elif choose_prj['choose_prj'] == 'B':
        print("B")
        map_data = [{"name": '北京市', "value": 2},
                    {"name": '天津市', "value": random.randint(1, 500)},
                    {"name": '上海市', "value": random.randint(1, 500)},
                    {'name': '重庆市', "value": random.randint(1, 500)},
                    {"name": '河北省', "value": random.randint(1, 500)},
                    {"name": '河南省', "value": random.randint(1, 500)},
                    {"name": '云南省', "value": random.randint(1, 500)},
                    {"name": '辽宁省', "value": random.randint(1, 500)},
                    {"name": '黑龙江省', "value": random.randint(1, 500)},
                    {"name": '湖南省', "value": random.randint(1, 500)},
                    {'name': '安徽省', "value": random.randint(1, 500)},
                    {"name": '山东省', "value": random.randint(1, 500)},
                    {"name": '新疆维吾尔自治区', "value": random.randint(1, 500)},
                    {"name": '江苏省', "value": random.randint(1, 500)},
                    {"name": '浙江省', "value": random.randint(1, 500)},
                    {"name": '江西省', "value": random.randint(1, 500)},
                    {"name": '湖北省', "value": random.randint(1, 500)},
                    {'name': '广西壮族自治区', "value": random.randint(1, 500)},
                    {"name": '甘肃省', "value": random.randint(1, 500)},
                    {"name": '山西省', "value": random.randint(1, 500)},
                    {"name": '内蒙古自治区', "value": random.randint(1, 500)},
                    {"name": '陕西省', "value": random.randint(1, 500)},
                    {"name": '吉林省', "value": random.randint(1, 500)},
                    {"name": '福建省', "value": random.randint(1, 500)},
                    {'name': '贵州省', "value": random.randint(1, 500)},
                    {"name": '广东省', "value": random.randint(1, 500)},
                    {"name": '青海省', "value": random.randint(1, 500)},
                    {"name": '西藏自治区', "value": random.randint(1, 500)},
                    {"name": '四川省', "value": random.randint(1, 500)},
                    {"name": '宁夏回族自治区', "value": random.randint(1, 500)},
                    {'name': '海南省', "value": random.randint(1, 500)},
                    {"name": '台湾省', "value": random.randint(1, 500)},
                    {"name": '香港特别行政区', "value": random.randint(1, 500)},
                    {"name": '澳门特别行政区', "value": random.randint(1, 500)},
                    ]
        return jsonify({"data": map_data})
    elif choose_prj['choose_prj'] == '墨汁':
        print("墨汁")
        map_data = [{"name": '北京市', "value": 3},
                    {"name": '天津市', "value": random.randint(1, 500)},
                    {"name": '上海市', "value": random.randint(1, 500)},
                    {'name': '重庆市', "value": random.randint(1, 500)},
                    {"name": '河北省', "value": random.randint(1, 500)},
                    {"name": '河南省', "value": random.randint(1, 500)},
                    {"name": '云南省', "value": random.randint(1, 500)},
                    {"name": '辽宁省', "value": random.randint(1, 500)},
                    {"name": '黑龙江省', "value": random.randint(1, 500)},
                    {"name": '湖南省', "value": random.randint(1, 500)},
                    {'name': '安徽省', "value": random.randint(1, 500)},
                    {"name": '山东省', "value": random.randint(1, 500)},
                    {"name": '新疆维吾尔自治区', "value": random.randint(1, 500)},
                    {"name": '江苏省', "value": random.randint(1, 500)},
                    {"name": '浙江省', "value": random.randint(1, 500)},
                    {"name": '江西省', "value": random.randint(1, 500)},
                    {"name": '湖北省', "value": random.randint(1, 500)},
                    {'name': '广西壮族自治区', "value": random.randint(1, 500)},
                    {"name": '甘肃省', "value": random.randint(1, 500)},
                    {"name": '山西省', "value": random.randint(1, 500)},
                    {"name": '内蒙古自治区', "value": random.randint(1, 500)},
                    {"name": '陕西省', "value": random.randint(1, 500)},
                    {"name": '吉林省', "value": random.randint(1, 500)},
                    {"name": '福建省', "value": random.randint(1, 500)},
                    {'name': '贵州省', "value": random.randint(1, 500)},
                    {"name": '广东省', "value": random.randint(1, 500)},
                    {"name": '青海省', "value": random.randint(1, 500)},
                    {"name": '西藏自治区', "value": random.randint(1, 500)},
                    {"name": '四川省', "value": random.randint(1, 500)},
                    {"name": '宁夏回族自治区', "value": random.randint(1, 500)},
                    {'name': '海南省', "value": random.randint(1, 500)},
                    {"name": '台湾省', "value": random.randint(1, 500)},
                    {"name": '香港特别行政区', "value": random.randint(1, 500)},
                    {"name": '澳门特别行政区', "value": random.randint(1, 500)},
                    ]
        return jsonify({"data": map_data,"min_value":0,"max_value":690})

# 获取环形图数据
@admin_blu.route('/get_pie_data', methods=['POST','GET'])
def get_pie_data():
    # pie_name:从前端获取的数据，包括实采资料，大数据资料，数据资料
    pie_name = request.get_json()
    print(pie_name)

    if pie_name['pie_name'] == '实采资料':
        print("实采资料")
        '''
        通过代码，获取实采资料对应的数据，赋值给pie_data1，按下面的格式返回，下面的pie_data1为假数据
        '''
        pie_data1 = [{"name": "众包App", "value": 10}, {"name": "设备众包", "value": 140}, {"name": "自主高精", "value": 30},
                     {"name": "精细化", "value": 73}, {"name": "新增", "value": 99}]
        pie_data = {"data": pie_data1,"name":['众包App','设备众包','精细化','新增','自主高精']}
        return json.dumps(pie_data)
    elif pie_name['pie_name'] == '大数据资料':
        print("大数据资料")
        '''同上'''
        pie_data1 = [{"name": "墨汁", "value": 100000}, {"name": "交线", "value": 10}]
        pie_data = {"data": pie_data1,"name":['墨汁','交线']}
        return json.dumps(pie_data)
    elif pie_name['pie_name'] == '数据资料':
        print("数据资料")
        '''同上'''
        pie_data1 = [{"name": "四维", "value": 210}]
        pie_data = {"data": pie_data1,"name":['四维']}
        return json.dumps(pie_data)



# --------任务管理  页面展示-------------------------------------------------------------------
# 任务管理
@admin_blu.route('/task_show')
def task_show():
    return render_template('admin/task_list.html')

@admin_blu.route('/task_list', methods=['POST','GET'])
def task_list():
    print("查询")
    shuju = request.get_json()
    sear_id = shuju['sear_id']
    project_name = shuju['project_name']
    print(sear_id,project_name)
    if ',' not in sear_id:

        # 只有一个id，根据ｉｄ查询数据库

        data = [{"a":1,"b":2,"c":3}]

        return jsonify({"msg":"查询成功！","data":data})

    #　如果多个id,将id放入列表,查询数据库
    sear_ids = sear_id.split(',')
    print(sear_ids)

    data = [{"a": 1, "b": 2, "c": 3},
            {"a": 4, "b": 5, "c": 6}]
    return jsonify({"msg":"查询成功！","data":data})
# ---------------------------------------------------------------------------


# 人员管理--------------------------------------------------------------------------------
@admin_blu.route('/user_list')
def user_list():
    # 判断是否登录,是否为管理员
    user_name = session.get("name", None)
    is_admin = session.get("is_admin", 'admin')

    if not is_admin:
        return jsonify({"error": "首页为管理员页面，请选择其他页面！"})

    users = [{"id": 1, "user_name": "xiaoming", "user_role": 3}, {"id": 2, "user_name": "sss", "user_role": 3}]


    return render_template('admin/user.html', data=users)

@admin_blu.route('/user_all',methods=['GET'])
def user_all():
    users = [{"qq_num": 1, "user_name": "xiaoming", "mail_num": 3},
             {"qq_num": 2, "user_name": "sss", "mail_num": 3},
             {"qq_num": 3, "user_name": "xiaoming", "mail_num": 3},
             {"qq_num": 4, "user_name": "sss", "mail_num": 3},
             {"qq_num": 5, "user_name": "xiaoming", "mail_num": 3},
             {"qq_num": 6, "user_name": "sss", "mail_num": 3}
             ]

    row = {"total": 6,
           "rows": users
           }
    return json.dumps(row)

@admin_blu.route('/user_result',methods=['GET','POST'])
def user_result():
    print("user_result")
    page_size = request.args.get('pagesize', '5')
    print("user_result每页个数：%s" % page_size)
    page_number = request.args.get('pagenumber', '1')
    print("user_result当前页数：%s" % page_number)
    # 从url中获取条件信息
    user_role = request.args.get('user_role', '')
    if user_role is '':
        # 查询条件通过ajax
        data_q = request.get_json()
        print("data_q:%s" % data_q)
    else:
        print(user_role)
    users = [{"qq_num": 10, "user_name": "xiaoming", "mail_num": 3},
             {"qq_num": 20, "user_name": "sss", "mail_num": 3},
             {"qq_num": 30, "user_name": "xiaoming", "mail_num": 3},
             {"qq_num": 40, "user_name": "sss", "mail_num": 3},
             {"qq_num": 50, "user_name": "xiaoming", "mail_num": 3},
             {"qq_num": 60, "user_name": "sss", "mail_num": 3}
             ]

    row = {"total": 6,
           "rows": users
           }
    return json.dumps(row)

@admin_blu.route('/user_add',methods=['GET','POST'])
def user_add():
    print("user_add")
    user_info = request.get_json()
    print("user_info:%s" % user_info)
    return jsonify({"msg":"ok"})

@admin_blu.route('/user_del',methods=['GET','POST'])
def user_del():
    index_list = request.get_json()
    print("序号列表：%s" % index_list)
    # 序号为索引，所以从0开始
    list = index_list['index_list']
    return jsonify({"msg":"ok"})
#  ----------------------------------------------------------------



