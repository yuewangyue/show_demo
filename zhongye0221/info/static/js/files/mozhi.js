/**
 * Created by python on 18-10-18.
 */


// 查询事件
function mozhi_chaxun() {
    // alert('chaxun');

    $('#div_tall').css('display','none');
    $('#div_tresult').css('display','block');

    var data_id = $('.mozhi_ziliaoID').val();
    var data_source = $('.mozhi_srouce').val();
    var province = $('.mozhi_province').val();
    var city = $('.mozhi_city').val();
    var sw_pro = $('.mozhi_pro').val();
    var status = $('.mozhi_status').val();
    var save_time = $('.ui-datepicker-time').val();
    var time_flag = $('.time_flag').val();

    if (data_source == '设备众包') {
        data_source = 1
    }
    else if(data_source == '众包app') {
        data_source = 2
    }
    else if(data_source == '自采高精') {
        data_source = 3
    }
    else if(data_source == '众包视频') {
        data_source = 4
    }
    else if(data_source == '四维融合') {
        data_source = 10
    }
    else if(data_source == '墨汁') {
        data_source = 11
    }


    var params = {
        "data_id": data_id,
        "data_source":data_source,
        "province":province,
        "city":city,
        "sw_pro":sw_pro,
        "status":status,
        "save_time":save_time,
        "time_flag":time_flag,
        "daochu":0
    };
    $.ajax( {
        type: "post",
        url: '/mozhi_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            // alert(data);
            $('#table_result').bootstrapTable({
                url: '/mozhi_result',
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

                    data_id : $('.mozhi_ziliaoID').val(),
                    data_source : $('.mozhi_srouce').val(),
                    province : $('.mozhi_province').val(),
                    city : $('.mozhi_city').val(),
                    sw_pro : $('.mozhi_pro').val(),
                    deal_status :$('.mozhi_status').val(),
                    ruku_time : $('.ui-datepicker-time').val(),
                    time_flag : $('.time_flag').val()
                };
                return temp;
            },

                columns: [
                    { field: 'data_id', title: '资料ID',
                    formatter: function(value, row, index) {
                        return row.data_id;
                    },},
                    { field: 'data_name', title: '资料名称',
                    formatter: function(value, row, index) {
                        return row.data_name;
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
                    { field: 'sw_province', title: 'SW省份',
                    formatter: function(value, row, index) {
                        return row.sw_province;
                    },},
                    { field: 'col_time', title: '采集时间',
                    formatter: function(value, row, index) {
                        return row.col_time;
                    },},
                    { field: 'ruku_time', title: '入库时间',
                    formatter: function(value, row, index) {
                        return row.ruku_time;
                    },},
                    { field: 'send_time', title: '下发时间',
                    formatter: function(value, row, index) {
                        return row.send_time;
                    },},
                    { field: 'status', title: '状态',
                    formatter: function(value, row, index) {
                        return row.status;
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

        },
        error: function (xhr, type) {
            alert("错误");
        }
    });
}



// 导出
function mozhi_download() {
    var th_list =  Array('id','资料ID','资料名称','资料源','省份','城市','SW省份','采集时间','入库时间','下发时间','状态','资料里程','轨迹点数');
    var data_id = $('.mozhi_ziliaoID').val();
    var data_source = $('.mozhi_srouce').val();
    var province = $('.mozhi_province').val();
    var city = $('.mozhi_city').val();
    var sw_pro = $('.mozhi_pro').val();
    var status = $('.mozhi_status').val();
    var save_time = $('.ui-datepicker-time').val();
    var time_flag = $('.time_flag').val();

    var params ={

        "daochu":1,
        "table_th":th_list,
        "data_id": data_id,
        "data_source":data_source,
        "province":province,
        "city":city,
        "sw_pro":sw_pro,
        "status":status,
        "save_time":save_time,
        "time_flag":time_flag,
    };
    $.ajax({
        type: "post",
        url: '/mozhi_download',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            alert(msg['ok']);
        }, error: function () {

        }
    })

}


// 省市级联
function pi_province() {

    // 省
    var pro_data = $('.mozhi_province').val();
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
            $('#city2').nextAll().remove();
            $('#city2').after(s);
        },
        error: function (xhr, type) {
           // alert("错误");

        }
    });
}

// 带有复选框的
// function mozhi_chaxun() {
//     alert('选中');
//     // 选中
//     var arrs = new Array();
//     $("table tr[class='selected']").each(function () {
//         if ($(this)) {
//             arrs.push($(this).attr("data-index"));
//         }
//     });
//     alert(arrs);
//     alert(arrs.length);
//
// }