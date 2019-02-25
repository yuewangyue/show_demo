// /**
//  * Created by python on 18-8-31.
//  */

// 查询
function xiao_chaxun() {
    // alert('查询');
    $('#div_tall').css('display','none');

    $('#div_tresult').css('display','block');

    var data_id = $('.xiao_ziliaoID').val();
    var col_task_id = $('.xiao_col_task_id').val();
    var qingbao_id = $('.xiao_qingbao_id').val();
    var data_source = $('.xiao_data_source').val();
    var col_type = $('.xiao_col_type').val();
    var province = $('.xiao_province').val();
    var city = $('.xiao_city').val();
    var deal_status = $('.xiao_deal_status').val();
    var deal_huanjie = $('.xiao_deal_huanjie').val();
    var finish_time = $('.ui-datepicker-time').val();
    var time_flag = $('.time_flag').val();

    if (deal_status == 3) {
        deal_status = "成功"
    }
    else if(deal_status == 5) {
        deal_status = "失败"
    }

    var params = {
        "data_id": data_id,
        "col_task_id":col_task_id,
        "qingbao_id":qingbao_id,
        "data_source":data_source,
        "col_type":col_type,
        "province":province,
        "city":city,
        "deal_status":deal_status,
        "deal_huanjie":deal_huanjie,
        "finish_time":finish_time,
        "time_flag":time_flag,
        "daochu":0
    };
    $.ajax({
        type: "post",
        url: '/little_data_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            $('#table_result').bootstrapTable({
                url: '/little_data_result',
                method:'get',
                dataType:"json",
                contentType:'application/x-www-form-urlencoded',

                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                pageSize: 10,
                pageNumber: 1,
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageList: [10, 15, 20, 50],        //可供选择的每页的行数（*）
                queryParamsType: '',               // 传给服务器pageSize ,pageNumber
                search: false,                      //是否显示表格搜索
                strictSearch: false,
                showColumns: false,                  //是否显示所有的列（选择显示的列）
                showRefresh: false,                  //是否显示刷新按钮
                clickToSelect: true,                //是否启用点击选中行
                //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "no",                     //每一行的唯一标识，一般为主键列
                showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                async:true,
                queryParams : function (params) {
                var temp = {
                    pagenumber : params.pageNumber,
                    pagesize : params.pageSize,

                    data_id : $('.xiao_ziliaoID').val(),
                    col_task_id : $('.xiao_col_task_id').val(),
                    qingbao_id : $('.xiao_qingbao_id').val(),
                    data_source : $('.xiao_data_source').val(),
                    col_type : $('.xiao_col_type').val(),
                    province : $('.xiao_province').val(),
                    city : $('.xiao_city').val(),
                    deal_status :$('.xiao_deal_status').val(),
                    deal_huanjie : $('.xiao_deal_huanjie').val(),
                    recive_time : $('.ui-datepicker-time').val(),
                    time_flag : $('.time_flag').val()
                };
                return temp;
            },

                columns: [
                    { field: 'data_id', title: '资料ID',
                    formatter: function(value, row, index) {
                        return row.data_id;
                    },},
                    { field: 'col_task_id', title: '采集任务ID',
                    formatter: function(value, row, index) {
                        return row.col_task_id;
                    },},
                    { field: 'qb_id', title: '情报ID',
                    formatter: function(value, row, index) {
                        return row.qb_id;
                    },},
                    { field: 'data_name', title: '资料名称',
                    formatter: function(value, row, index) {
                        return row.data_name;
                    },},
                    { field: 'data_source', title: '资料源',
                    formatter: function(value, row, index) {
                        return row.data_source;
                    },},
                    { field: 'col_type', title: '采集类型',
                    formatter: function(value, row, index) {
                        return row.col_type;
                    },},
                    { field: 'work_use', title: '作业用途',
                    formatter: function(value, row, index) {
                        return row.work_use;
                    },},
                    { field: 'province', title: '省份',
                    formatter: function(value, row, index) {
                        return row.province;
                    },},
                    { field: 'city', title: '城市',
                    formatter: function(value, row, index) {
                        return row.city;
                    },},
                    { field: 'sw_province', title: 'SW省份',
                    formatter: function(value, row, index) {
                        return row.sw_province;
                    },},
                    { field: 'col_time', title: '采集时间',
                    formatter: function(value, row, index) {
                        return row.col_time;
                    },},
                    { field: 'deal_hj', title: '处理环节',
                    formatter: function(value, row, index) {
                        return row.deal_hj;
                    },},
                    { field: 'status', title: '状态',
                    formatter: function(value, row, index) {
                        return row.status;
                    },},
                    { field: 'start_time', title: '开始时间',
                    formatter: function(value, row, index) {
                        return row.start_time;
                    },},
                    { field: 'end_time', title: '结束时间',
                    formatter: function(value, row, index) {
                        return row.end_time;
                    },},
                    { field: 'data_lc', title: '资料里程',
                    formatter: function(value, row, index) {
                        return row.data_lc;
                    },},
                    { field: 'trail_point', title: '轨迹点数',
                    formatter: function(value, row, index) {
                        return row.trail_point;
                    },},
                    ],
                onLoadSuccess: function() { //加载成功时执行
                    $("#theTable th").css("text-align", "center"); //设置表头内容居中
                },
                onLoadError: function() { //加载失败时执行
                    alert("加载数据失败");
                }
            });

            $('#table_result').bootstrapTable('load', data);
        }, error: function () {

        }
    })

}


// 导出
function xiao_daochu() {
    var th_list =  Array('id','资料ID','采集任务ID','情报ID','资料名称','资料源','采集类型','作业用途','省份','城市','SW省份','采集时间','处理环节','状态','开始时间','结束时间','资料里程','轨迹点数');
    // alert(th_list);
    var data_id = $('.xiao_ziliaoID').val();
    var col_task_id = $('.xiao_col_task_id').val();
    var qingbao_id = $('.xiao_qingbao_id').val();
    var data_source = $('.xiao_data_source').val();
    var col_type = $('.xiao_col_type').val();
    var province = $('.xiao_province').val();
    var city = $('.xiao_city').val();
    var deal_status = $('.xiao_deal_status').val();
    var deal_huanjie = $('.xiao_deal_huanjie').val();
    var finish_time = $('.ui-datepicker-time').val();
    var time_flag = $('.time_flag').val();

    var params = {
        "data_id": data_id,
        "col_task_id":col_task_id,
        "qingbao_id":qingbao_id,
        "data_source":data_source,
        "col_type":col_type,
        "province":province,
        "city":city,
        "deal_status":deal_status,
        "deal_huanjie":deal_huanjie,
        "finish_time":finish_time,
        "time_flag":time_flag,
        "table_th":th_list,
        "html_name":'小资料',
        "daochu":1
    };

    $.ajax({
        type: "post",
        url: '/little_data_download',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var msg = data;
            alert('ok');

        }, error: function () {

        }
    })

}

// 省市级联
function xiao_province() {

            // 省
            var pro_data = $('.xiao_province').val();
            var params = {
                "pro_name":pro_data,
            };
            // alert(pro_data);

            $.ajax({
                type: "post",
                url: '/show_city',
                data: JSON.stringify(params),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {

                    var city = data;
                    var city_list = city['list_name'];
                    // alert(city_list);
                    var s = '';
                    for(var i = 0;i<city_list.length;i++){
                        s += "<option id='city'>" + city_list[i] + "</option>"
                    }
                    // alert(s);
                    $('#city_xiao').nextAll().remove();

                    $('#city_xiao').after(s);
                },
                error: function (xhr, type) {
                   // alert("错误");
                }
            });
}