import xlwt
from xlwt import Workbook

def set_style(name,height,bold=False):
    style = xlwt.XFStyle() # 初始化样式
    al = xlwt.Alignment()
    al.horz = 0x02
    al.vert = 0x01
    style.alignment = al
    font = xlwt.Font() # 为样式创建字体
    font.name = name # Times New Roman
    font.bold = bold
    font.color_index = 4
    font.height = height
    style.font = font

    return style

# table_thsort,table_tth:都表示数据中的key ，保留一个即可
def write_excel(table_thsort,table_tth,table_tbody,table_name):
    f = xlwt.Workbook()  # 创建工作簿

    # 创建第一个sheet
    sheet1 = f.add_sheet(u'sheete',cell_overwrite_ok=True)

    table_tbody = table_tbody
    table_th = list(table_tbody[0].keys())
    # 数据行数
    len_tbody = len(table_tbody)
    print(len_tbody,table_tbody)
    # 生成第一行 表头
    b = 0
    for i in table_tth:
        sheet1.write(0, b, i, set_style('宋体', 220, True))
        b += 1
    # table_th = ['采集任务ID', '情报ID', '资料名称', '资料源', '采集类型', '作业用途', '省份', '城市', '采集时间', '接收时间', '处理环节', '状态', '开始时间',
    #             '结束时间', '采集里程', '轨迹点数']

    # 有效
    a = 1
    for m in table_tbody:
        val_index = 0
        while val_index < len(table_thsort):
            data = m[table_thsort[val_index]]
            sheet1.write(a, val_index, data, set_style('宋体', 220, True))
            val_index += 1
        a += 1
    f.save(table_name)
    return f