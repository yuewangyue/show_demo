import flask
from flask import jsonify,url_for
from flask import render_template
from flask import request
from flask import session,redirect,make_response
from flask import send_from_directory
import pymysql
import json
import os
import time
import random

from info.download import write_excel
from info.models import Province
from . import show_blu


# 将后台文件传到浏览器----------------------------
@show_blu.route("/download/<filename>", methods=['GET'])
def download_file(filename):

    print(filename)
    # 需要知道2个参数, 第1个参数是本地目录的path, 第2个参数是文件名(带扩展名)
    directory = os.getcwd()  # 假设在当前目录
    response = make_response(send_from_directory(directory, filename, as_attachment=True))
    response.headers["Content-Disposition"] = "attachment; filename={}".format(filename.encode().decode('latin-1'))
    return response

@show_blu.route('/big_data')
def big_data():
    # 查询所有省份信息
    pro_data = Province.query.all()
    print(pro_data[0])
    return render_template('show_data/big_data.html', data=[pro_data])

# 大资料页面，所有数据
@show_blu.route('/big_data_all',methods=['GET','POST'])
def big_data_all():
    print("big_data_all")
    page_size = request.args.get('pageSize','10')
    print("每页个数：%s" % page_size)
    page_number = request.args.get('pageNumber','1')
    print("当前页数：%s" % page_number)
    list = [
        {"col_task_id": 1,"data_source": 33,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 2,"data_source": 55,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 1,"data_source": 33,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 2,"data_source": 55,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 1,"data_source": 33,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 2,"data_source": 55,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 1,"data_source": 33,"province": 44, "city": 55, "ruku_time": 33},
        {"col_task_id": 2,"data_source": 55,"province": 44, "city": 55, "ruku_time": 33},
    ]
    row = {"total": 100,
           "rows": list
           }
    return json.dumps(row)

# 大资料页面，查询数据
@show_blu.route('/big_data_result',methods=['GET','POST'])
def big_data_result():
    print('big_data_result页面')
    page_size = request.args.get('pagesize','10')
    print("big_data_result每页个数：%s" % page_size)
    page_number = request.args.get('pagenumber','1')
    print("big_data_result当前页数：%s" % page_number)

    # 查询条件
    data_q = request.get_json()
    if data_q is not None:
        is_download = data_q['daochu']
        if int(is_download) == 0:
            #　查询
            print("data_q:%s" % data_q)
            col_task_id = data_q['col_task_id']

    else:
        # 从url中获取条件信息
        col_task_id = request.args.get('col_task_id', '')
        qingbao_id = request.args.get('qingbao_id', '')
        data_source = request.args.get('data_source', '')
        col_type = request.args.get('col_type', '')
        province = request.args.get('province', '')
        city = request.args.get('city', '')
        deal_status = request.args.get('deal_status', '')
        deal_huanjie = request.args.get('deal_huanjie', '')
        recive_time = request.args.get('recive_time', '')
        time_flag = request.args.get('time_flag', '')

        # print(col_task_id, qingbao_id, data_source, province, deal_status, recive_time, time_flag)
    print(col_task_id)
    list = [
        {"col_task_id": 1, "data_source": 33, "province": 44, "city": 55, "ruku_time": 33, "status":3},
        {"col_task_id": 2, "data_source": 55, "province": 44, "city": 55, "ruku_time": 33, "status":5},
        {"col_task_id": 1, "data_source": 33, "province": 44, "city": 55, "ruku_time": 33, "status":3},
        {"col_task_id": 2, "data_source": 55, "province": 44, "city": 55, "ruku_time": 33, "status":5},
        {"col_task_id": 1, "data_source": 33, "province": 44, "city": 55, "ruku_time": 33, "status":3},
        {"col_task_id": 2, "data_source": 55, "province": 44, "city": 55, "ruku_time": 33, "status":5},
        {"col_task_id": 1, "data_source": 33, "province": 44, "city": 55, "ruku_time": 33, "status":3},
        {"col_task_id": 2, "data_source": 55, "province": 44, "city": 55, "ruku_time": 33, "status":5}
    ]
    row = {"total": 100,
           "rows": list
           }
    return json.dumps(row)

#  大资料 导出
@show_blu.route('/big_data_download', methods=['GET', 'POST'])
def big_data_download():
    # 从前端获取的数据
    data_q = request.get_json()
    print("daziliao_daochu：%s" % data_q)
    daochu = data_q['daochu']
    # 导出 ---------------------------
    if int(daochu) == 1:
        print("导出")
        # 进行导出操作
        # 　表头数据
        table_th = data_q['table_th']
        print(table_th)
        # 查询数据库结果
        sql = "select * from liucheng"
        data_sql = conn_sql(sql)
        # print(data_sql)
        # 表中数据
        table_body = [

            {"col_task_id": 210000111, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
             "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
             "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
            {"col_task_id": 3, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
             "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
             "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
            {"col_task_id": 4, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
             "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
             "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
            {"col_task_id": 5, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
             "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
             "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
            {"col_task_id": 6, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
             "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
             "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        ]
        table_th = ['采集任务ID', '情报ID', '资料名称', '资料源', '采集类型', '作业用途', '省份', '城市',
                    '采集时间', '接收时间', '处理环节', '状态', '开始时间', '结束时间', '采集里程', '轨迹点数']
        table_thsort = ["col_task_id", "qb_id", "data_name", "data_source", "col_type", "work_use", "province", "city",
                        "col_time", "rec_time", "deal_hj", "status", "start_time", "end_time", "col_lc", "trail_point"]
        write_excel(table_thsort, table_th, table_body, '大资料.xls')

        return jsonify({"ok": "导出成功！"})
    else:
        pass

    return jsonify({"msg": "查询成功"})
# ----------------------------------------------------------------------
# 小资料页面
@show_blu.route('/little_data')
def little_data():
    # 查询所有省份信息
    pro_data = Province.query.all()
    user_name = 'huiyong'
    return render_template('show_data/little_data.html', data=pro_data, username = user_name)

# 小资料 所有数据
@show_blu.route('/little_data_all')
def little_data_all():
    # 数据库查询出所有数据
    print("little_data_all")
    page_size = request.args.get('pageSize', '10')
    print("每页个数：%s" % page_size)
    page_number = request.args.get('pageNumber', '1')
    print("当前页数：%s" % page_number)
    list = [
        {"col_task_id": 1, "qb_id": 33, "data_name": 43333333334, "data_source": 5333333333335, "col_type": 22,
         "work_use": 33,
         "province": 44, "city": 55, "col_time": 33333333333333333333, "rec_time": 4333333333333333333334,
         "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 2, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 3, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 4, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 30, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 30, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},

    ]

    row = {"total": 100,
           "rows": list
           }
    return json.dumps(row)

# 小资料页面，查询数据
@show_blu.route('/little_data_result',methods=['GET','POST'])
def little_data_result():
    print('little_data_result页面')
    page_size = request.args.get('pagesize','10')
    print("big_data_result每页个数：%s" % page_size)
    page_number = request.args.get('pagenumber','1')
    print("big_data_result当前页数：%s" % page_number)
    # 从url中获取条件信息
    col_task_id = request.args.get('col_task_id', '')
    qingbao_id = request.args.get('qingbao_id', '')
    data_source = request.args.get('data_source', '')
    col_type = request.args.get('col_type', '')
    province = request.args.get('province', '')
    city = request.args.get('city', '')
    deal_status = request.args.get('deal_status', '')
    deal_huanjie = request.args.get('deal_huanjie', '')
    recive_time = request.args.get('recive_time', '')
    time_flag = request.args.get('time_flag', '')
    # 如果从url中获取不到条件信息，利用ajax传的参数获取
    if time_flag is '':
        # 查询条件
        data_q = request.get_json()
        print("data_q:%s" % data_q)

    else:
        print(col_task_id, qingbao_id, data_source, province, deal_status, recive_time, time_flag)


    list = [
        {"col_task_id": 110, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         },
        {"col_task_id": 120, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         },
        # {"col_task_id": 130, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 140, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 150, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 160, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 170, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 180, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 190, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 200, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 210, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        # {"col_task_id": 220, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
        #  "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
        #  "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
    ]
    row = {"total": 100,
           "rows": list
           }
    return json.dumps(row)

 # 小资料  导出
@show_blu.route('/little_data_download', methods=['GET', 'POST'])
def little_data_download():
    # 从前端获取的数据
    data_q = request.get_json()
    # 表头数据
    table_th = data_q['table_th']
    print(table_th)

    # 查询数据库
    sql = "select * from liucheng"
    data_sql = conn_sql(sql)
    # 表中数据
    # table_body = data_sql

    table_body = [

        {"data_id":220,"col_task_id": 2, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "sw_province": 424,"col_time": 33, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"data_id":222,"col_task_id": 3, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "sw_province": 424, "col_time": 33, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"data_id":223,"col_task_id": 4, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "sw_province": 424, "col_time": 33, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"data_id":224,"col_task_id": 30, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "sw_province": 424, "col_time": 33, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"data_id":225,"col_task_id": 30, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "sw_province": 424, "col_time": 33, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
    ]
    table_th = ['资料ID','采集任务ID', '情报ID', '资料名称', '资料源', '采集类型', '作业用途', '省份', '城市','sw省份',
                '采集时间', '处理环节', '状态', '开始时间', '结束时间', '资料里程', '轨迹点数']
    table_thsort = ["data_id","col_task_id", "qb_id", "data_name", "data_source", "col_type", "work_use", "province", "city","sw_province",
                    "col_time", "deal_hj", "status", "start_time", "end_time", "col_lc", "trail_point"]

    write_excel(table_thsort,table_th,table_body, '小资料.xls')
    return jsonify({"ok": "导出成功！"})


# ----------------------------------------------------------------------
# 批量更新
@show_blu.route('/piliang_update')
def piliang_update():
    # 查询所有省份信息
    pro_data = Province.query.all()
    return render_template('show_data/piliang_update.html', data=pro_data)

# 批量更新 所有数据
@show_blu.route('/piliang_all')
def piliang_all():
    # 数据库查询出所有数据
    print("piliang_all")
    page_size = request.args.get('pageSize', '10')
    print("每页个数：%s" % page_size)
    page_number = request.args.get('pageNumber', '1')
    print("当前页数：%s" % page_number)
    list = [
        {"data_id": 1, "qb_id": 33, "data_name": 43333333334, "data_source": 5333333333335, "col_type": 22,
         "work_use": 33,
         "province": 44, "city": 55, "col_time": 33333333333333333333, "rec_time": 4333333333333333333334,
         "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 2, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 3, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 4, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 30, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 30, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},

    ]

    row = {"total": 100,
           "rows": list
           }
    return json.dumps(row)

# 批量更新，查询数据
@show_blu.route('/piliang_result',methods=['GET','POST'])
def piliang_result():
    print('piliang_result页面')
    page_size = request.args.get('pagesize','10')
    print("big_data_result每页个数：%s" % page_size)
    page_number = request.args.get('pagenumber','1')
    print("big_data_result当前页数：%s" % page_number)
    # 从url中获取条件信息
    col_task_id = request.args.get('col_task_id', '')
    qingbao_id = request.args.get('qingbao_id', '')
    data_source = request.args.get('data_source', '')
    col_type = request.args.get('col_type', '')
    province = request.args.get('province', '')
    city = request.args.get('city', '')
    deal_status = request.args.get('deal_status', '')
    deal_huanjie = request.args.get('deal_huanjie', '')
    recive_time = request.args.get('recive_time', '')
    time_flag = request.args.get('time_flag', '')
    # 如果从url中获取不到条件信息，利用ajax传的参数获取
    if time_flag is '':
        # 查询条件
        data_q = request.get_json()
        print("data_q:%s" % data_q)

    else:
        print(col_task_id, qingbao_id, data_source, province, deal_status, recive_time, time_flag)


    list = [
        {"col_task_id": 111111111111110, "qb_id": 311111111113, "data_name": 441111111111, "data_source": 51112222225, "col_type": 22, "work_use": 33,
         "province": 44, "city": 5522222222222, "ruku_time": 112222222111133, "rec_time": 2222244, "deal_hj": 3, "status": 2,
         "start_time": 32222222222222222223, "end_time": 33333333333333333333333, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 120, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 130, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 140, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 150, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 160, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 170, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 180, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 190, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 200, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 210, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
        {"col_task_id": 220, "qb_id": 33, "data_name": 44, "data_source": 55, "col_type": 22, "work_use": 33,
         "province": 44, "city": 55, "col_time": 33, "rec_time": 44, "deal_hj": 55, "status": 22,
         "start_time": 33, "end_time": 33, "col_lc": 2, "trail_point": 4},
    ]
    row = {"total": 100,
           "rows": list
           }
    return json.dumps(row)

#  批量更新  导出
@show_blu.route('/piliang_download',methods=['GET','POST'])
def piliang_download():
    # 从前端获取的数据
    data_q = request.get_json()
    print("piliang_daochu：%s" % data_q)
    daochu = data_q['daochu']
    if int(daochu) == 1:
        # 　表头数据
        table_th = data_q['table_th']

        # 查询数据库
        sql = "select * from liucheng"
        data_sql = conn_sql(sql)
        # 表中数据
        # table_body = data_sql
        table_body = [

            {"data_id": 2222222222, "data_name": 44, "data_source": 55, "province": 44, "city": 55, "sw_province": 33, "col_time": 44,
             "save_time": 33, "send_time": 33, "status": 2,"data_lc": 2, "trail_point": 4},
            {"data_id": 3, "data_name": 44, "data_source": 55,"province": 44, "city": 55, "sw_province": 33, "col_time": 44,
             "save_time": 33, "send_time": 33, "status": 2, "data_lc": 2, "trail_point": 4},
        ]
        table_th = ['资料ID', '资料名称', '资料源', '省份', '城市', 'SW省份','采集时间', '入库时间', '下发时间', '状态', '资料里程', '轨迹点数']
        table_thsort = ["data_id", "data_name", "data_source", "province", "city","sw_province",
                        "col_time", "save_time", "send_time", "status", "data_lc", "trail_point"]

        write_excel(table_thsort,table_th,table_body, '批量更新.xls')
        return jsonify({"ok": "导出成功！"})
    else:
        return jsonify({"msg": "导出失败!"})

