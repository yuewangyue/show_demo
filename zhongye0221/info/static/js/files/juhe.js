/**
 * Created by python on 18-9-3.
 */

// 查询事件
function juhe_chaxun() {
    $('#div_all').css('display','none');
    $('#div_result').css('display','block');

    var col_use = $('.ju_col_use').val();
    var data_source = $('.ju_data_source').val();

    var params = {
        "col_use":col_use,
        "data_source":data_source,
        "daochu":0
    };

    $.ajax({
        type: "post",
        url: '/juhe_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            $('#table_result').bootstrapTable({
                url: '/juhe_result',
                method:'get',
                dataType:"json",
                contentType:'application/x-www-form-urlencoded',

                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                pageSize: 5,
                pageNumber: 1,
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageList: [5, 10, 15, 20],        //可供选择的每页的行数（*）
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

                        col_use : $('.col_use').val(),
                        data_source : $('.data_source').val(),

                    };
                return temp;
                },

                columns: [
                    {field: 'xuhao', title: '序号',
                    checkbox:true,
                    formatter:stateFormatter
                    },
                    { field: 'data_source', title: '资料源',
                    formatter: function(value, row, index) {
                        return row.data_source;
                    },},
                    { field: 'col_type', title: '采集类型',
                    formatter: function(value, row, index) {
                        return row.col_type;
                    },},
                    { field: 'col_use', title: '采集用途',
                    formatter: function(value, row, index) {
                        return row.col_use;
                    },},
                    { field: 'province', title: '省份',
                    formatter: function(value, row, index) {
                        return row.province;
                    },},
                    { field: 'city', title: '城市',
                    formatter: function(value, row, index) {
                        return row.city;
                    },},
                    { field: 'task_type', title: '任务类型',
                    formatter: function(value, row, index) {
                        return row.task_type;
                    },},
                    { field: 'is_juhe', title: '是否聚合',
                    formatter: function(value, row, index) {
                        return row.is_juhe;
                    },},
                    { field: 'juhe_cycle', title: '是否聚合',
                    formatter: function(value, row, index) {
                        return row.juhe_cycle;
                    },},
                    { field: 'create_per', title: '创建人员',
                    formatter: function(value, row, index) {
                        return row.create_per;
                    },},
                    { field: 'create_time', title: '创建时间',
                    formatter: function(value, row, index) {
                        return row.create_time;
                    },},
                    { field: 'change_per', title: '变更人员',
                    formatter: function(value, row, index) {
                        return row.change_per;
                    },},
                    { field: 'change_time', title: '变更时间',
                    formatter: function(value, row, index) {
                        return row.change_time;
                    },}

                    ],
                nClickRow: function(row, $element) {
                    //$element是当前tr的jquery对象
                    $element.css("background-color", "green");
                },//单击row事件
                locale: "zh-CN", //中文支持
                detailView: false, //是否显示详情折叠
                detailFormatter: function(index, row, element) {
                    var html = '';
                    $.each(row, function(key, val){
                        html += "<p>" + key + ":" + val +  "</p>"
                    });
                    return html;
                },

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

// 设备  新增
function add_done() {

    var data_sorce = $('#data_sorce').val();
    var col_type = $('#col_type').val();
    var col_use = $('#col_use').val();
    var juhe_province = $('#juhe_province').val();
    var juhe_city = $('#juhe_city').val();
    var task_type = $('#task_type').val();
    var is_qiefen = $('#is_qiefen').val();
    var is_juhe = $('#is_juhe').val();
    var create_person = $('#create_person').val();
    var change_person = $('#change_person').val();
    var params = {
        "data_sorce":data_sorce,
        "col_type":col_type,
        "col_use":col_use,
        "juhe_province":juhe_province,
        "juhe_city":juhe_city,
        "task_type":task_type,
        "is_qiefen":is_qiefen,
        "is_juhe":is_juhe,
        "create_person":create_person,
        "change_person":change_person
    };
    $.ajax({
        type: "post",
        url: '/juhe_insert',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success :function () {
            var data = data;

            // 提交后刷新页面
            location.reload();
        },
        error :function () {

        }
    })

}

// 设备  变更
function juhe_biangeng() {

    // 判断勾选的id
    var arrs = new Array();
    $("table tr[class='selected']").each(function () {
        if ($(this)) {
            arrs.push($(this).attr("data-index"));
        }
    });
    // alert(arrs);
    var arr_len = arrs.length;
    if (arr_len >1) {
        alert('只能选择一个');
        $('.modal fade').css('display','none');

    }
    else if(arr_len == 0){
        alert('请选择一个');
        return
    }
    else {
        for (var i=0;i<arr_len;i++){
            var arr_index = arrs[i];
            // alert(arr_index);
            var th_data_source = $('tr[class="selected"]').children('td').eq(1).text();
            var th_col_type = $('tr[class="selected"]').children('td').eq(2).text();
            var th_col_use = $('tr[class="selected"]').children('td').eq(3).text();
            var th_province = $('tr[class="selected"]').children('td').eq(4).text();
            var th_city = $('tr[class="selected"]').children('td').eq(5).text();
            var th_task_type = $('tr[class="selected"]').children('td').eq(6).text();
            var th_juhe = $('tr[class="selected"]').children('td').eq(7).text();
            var th_juhe_cycle = $('tr[class="selected"]').children('td').eq(8).text();
            var th_create_person = $('tr[class="selected"]').children('td').eq(9).text();
            var th_change_person = $('tr[class="selected"]').children('td').eq(12).text();

            // 将原数据渲染到页面上
            $('.data_source').text(th_data_source);
            $('.col_type').text(th_col_type);
            $('.col_use').text(th_col_use);
            $('.juhe_province').text(th_province);
            $('.juhe_city').text(th_province);
            $('.task_type').text(th_task_type);
            $('.is_juhe').text(th_juhe);
            $('#juhe_cycle').val(th_juhe_cycle);
            $('#create_person').val(th_create_person);
            $('#change_person').val(th_change_person);

        }
    }
}

// 设备   提交(暂时不用)
function juhe_shebei_tijiao() {
    alert(3);
    var data_source = $('.val10').val();
    var col_type = $('.val11').val();
    var col_use = $('.val12').val();
    var is_qiefen = $('.val13').val();
    var data_type = $('.val14').val();
    var task_type = $('.val15').val();
    var shuoming = $('.val16').val();
    var create_person = $('.val17').val();
    var create_time = $('.val18').val();
    var biangeng_per = $('.val19').val();
    var biangeng_time = $('.val110').val();
    var biangeng_time = $('.val111').val();


    var params = {
        "data_source":data_source,
        "col_type":col_type,
        "col_use":col_use,
        "is_qiefen":is_qiefen,
        "data_type":data_type,
        "task_type":task_type,
        "shuoming":shuoming,
        "create_person":create_person,
        "create_time":create_time,
        "biangeng_per":biangeng_per,
        "biangeng_time":biangeng_time,

    };
    $.ajax({
        type: "post",
        url: '/juhe_shebei_tijiao',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

            location.replace(location.href);
        },
        error: function (xhr, type) {
            alert("错误");
        }
    });


}

// 设备  导出
function juhe_download() {
    var col_use = $('.juhe_shebei_col_use').val();
    var data_source = $('.juhe_shebei_ziliaoyuan').val();
    var th_list =  Array('id','资料源','采集类型','采集用途','省份','城市','任务类型','是否聚合','聚合周期','创建人员','创建时间','变更人员','变更时间');
    // alert(th_list);
    var params ={
        "col_use":col_use,
        "data_source":data_source,
        "daochu":1,
        "table_th":th_list
    };
    $.ajax({
        type: "post",
        url: '/juhe_download',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var msg = data;
            alert(msg['ok']);

        }, error: function () {

        }
    })


}

// 众包 删除
function juhe_shebei_shanchu() {

             // 勾选的id
            var arrs = new Array();
            $("input[type='checkbox']:checked").each(function () {
                if ($(this).attr("checked")){
                    arrs.push($(this).val());
                }
            });
            if (arrs.length==0){
                // alert("请勾选");
            };
            // alert(arrs);

            var params = {
                "id":arrs,
            };

            $.ajax({
                type: "post",
                url: '/juhe_shebei_shanchu',
                data: JSON.stringify(params),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {
                    alert("刪除成功");
                },
                error: function (xhr, type) {
                    alert("错误");
                }
            });

}




// 省市级联
function juhe_province() {
    alert(1);
    // 省
    var pro_data = $('.juhe_province').val();
    var params = {
        "pro_name":pro_data
    };
    alert(pro_data);

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
            $('#city').nextAll().remove();
            $('#city').after(s);
        },
        error: function (xhr, type) {
           // alert("错误");

        }
    });
}
