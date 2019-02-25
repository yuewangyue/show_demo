/**
 * Created by python on 18-8-31.
 */


// 查询事件
function da_chaxun() {
    $('#div_tall').css('display','none');
    $('#div_tresult').css('display','block');

    var col_task_id = $('.da_col_task_id').val();
    var data_source = $('.da_data_source').val();
    var province = $('.da_province').val();
    var city = $('.da_city').val();
    var ruku_time = $('#time > #ui-datepicker-time').val();
    var time_flag = $('.time_flag').val();

    var params ={
        "col_task_id":col_task_id,
        "data_source":data_source,
        "province":province,
        "city":city,
        "ruku_time":ruku_time,
        "time_flag":time_flag,
        "daochu":0
    };
    $.ajax({
        type: "post",
        url: '/big_data_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            // alert(data);
            $('#table_result').bootstrapTable({
                url: '/big_data_result',
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

                    col_task_id : $('.da_col_task_id').val(),
                    data_source : $('.da_data_source').val(),
                    province : $('.da_province').val(),
                    city : $('.da_city').val(),
                    ruku_time : $('.ui-datepicker-time').val(),
                    time_flag : $('.time_flag').val()
                };
                return temp;
            },

                columns: [
                    { field: 'col_task_id', title: '采集任务ID',
                    formatter: function(value, row, index) {
                        return row.col_task_id;
                    },},
                    { field: 'data_source', title: '资料源',
                    formatter: function(value, row, index) {
                        return row.data_source;
                    },},
                    { field: 'province', title: '省份',
                    formatter: function(value, row, index) {
                        return row.province;
                    },},
                    { field: 'city', title: '城市',
                    formatter: function(value, row, index) {
                        return row.city;
                    },},
                    { field: 'ruku_time', title: '入库时间',
                    formatter: function(value, row, index) {
                        return row.ruku_time;
                    },},
                    { field: 'status', title: '状态',
                    formatter: function(value, row, index) {
                        return row.status;
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

            //alert('ok');

        }, error: function () {

        }
    })

}


// 导出
function da_daochu() {
    // alert(1);

    var col_task_id = $('.da_col_task_id').val();
    var qingbao_id = $('.da_qingbao_id').val();
    var data_source = $('.da_data_source').val();
    var col_type = $('.da_col_type').val();
    var province = $('.da_province').val();
    var city = $('.da_city').val();
    var deal_status = $('.da_deal_status').val();
    var deal_huanjie = $('.da_deal_huanjie').val();
    var recive_time = $('#time > #ui-datepicker-time').val();
    var th_list =  Array('id','采集任务ID','情报ID','资料名称','资料源','采集类型','作业用途','省份','城市','采集时间','接收时间','处理环节','状态','开始时间','结束时间','采集里程','轨迹点数');
    // alert(th_list);
    var params ={
        "col_task_id":col_task_id,
        "qingbao_id":qingbao_id,
        "data_source":data_source,
        "col_type":col_type,
        "province":province,
        "city":city,
        "deal_status":deal_status,
        "deal_huanjie":deal_huanjie,
        "recive_time":recive_time,
        "daochu":1,
        "table_th":th_list,
        "html_name":'大资料'
    };
    $.ajax({
        type: "post",
        url: '/big_data_download',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            alert('ok');

        }, error: function () {

        }
    })

}

// 省市级联
function da_province() {


        // 省
        var pro_data = $('.da_province').val();
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
                $('#city_da').nextAll().remove();
                $('#city_da').after(s);

            },
            error: function (xhr, type) {
               // alert("错误");

            }
        });

}


function exit() {
    alert("退出");
     window.location.href = '/';

}