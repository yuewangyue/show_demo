/**
 * Created by python on 18-12-16.
 */


// 流程 高精---------------------------------------

// 高精 查询事件

function liucheng_gaojing_chaxun() {

    $('#gaojing_div_all').css('display','none');
    $('#gaojing_div_result').css('display','block');

    var col_use = $('.gaojing_col_use').val();
    var data_source = $('.gaojing_data_source').val();

    // alert(col_use);
    var params = {
        "col_use":col_use,
        "data_source":data_source,
        "daochu":0
    };
    $.ajax({
        type: "post",
        url: '/liucheng_gaojing_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            $('#gaojing_table_result').bootstrapTable({
                url: '/liucheng_gaojing_result',
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

                        col_use : $('.gaojing_col_use').val(),
                        data_source : $('.gaojing_data_source').val(),

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
                { field: 'is_qf', title: '是否切分',
                formatter: function(value, row, index) {
                    return row.is_qf;
                },},
                { field: 'data_type', title: '资料类型',
                formatter: function(value, row, index) {
                    return row.data_type;
                },},
                { field: 'task_type', title: '任务类型',
                formatter: function(value, row, index) {
                    return row.task_type;
                },},
                { field: 'instruction', title: '说明',
                formatter: function(value, row, index) {
                    return row.instruction;
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
            $('#gaojing_table_result').bootstrapTable('load', data);
        },
        error: function () {
            alert("错误");
        }
    });
}
// function liucheng_gaojing_chaxun() {
//
//
//     $('#gaojing_div_all').css('display','none');
//     $('#gaojing_div_result').css('display','block');
//
//     var col_use = $('.gaojing_col_use').val();
//     var data_source = $('.gaojing_data_source').val();
//     // alert(col_use);
//
//     var params = {
//         "col_use":col_use,
//         "data_source":data_source,
//         "daochu":0
//     };
//
//     $.ajax({
//         type: "post",
//         url: '/liucheng_gaojing_result',
//         data: JSON.stringify(params),
//         contentType: 'application/json',
//         dataType: 'json',
//         success: function (data) {
//             var data = data;
//             $('#gaojing_table_result').bootstrapTable({
//                 url: '/liucheng_gaojing_result',
//                 method:'get',
//                 dataType:"json",
//                 contentType:'application/x-www-form-urlencoded',
//
//                 striped: true,                      //是否显示行间隔色
//                 cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
//                 pagination: true,                   //是否显示分页（*）
//                 pageSize: 5,
//                 pageNumber: 1,
//                 sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
//                 pageList: [5, 10, 15, 20],        //可供选择的每页的行数（*）
//                 queryParamsType: '',               // 传给服务器pageSize ,pageNumber
//                 search: false,                      //是否显示表格搜索
//                 strictSearch: false,
//                 showColumns: false,                  //是否显示所有的列（选择显示的列）
//                 showRefresh: false,                  //是否显示刷新按钮
//                 clickToSelect: true,                //是否启用点击选中行
//                 //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
//                 uniqueId: "no",                     //每一行的唯一标识，一般为主键列
//                 showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
//                 cardView: false,                    //是否显示详细视图
//                 async:true,
//                 columns: [
//                     {field: 'xuhao', title: '序号',
//                     checkbox:true,
//                     formatter:stateFormatter
//                     },
//                     { field: 'data_source', title: '资料源',
//                     formatter: function(value, row, index) {
//                         return row.data_source;
//                     },},
//                     { field: 'col_type', title: '采集类型',
//                     formatter: function(value, row, index) {
//                         return row.col_type;
//                     },},
//                     { field: 'col_use', title: '采集用途',
//                     formatter: function(value, row, index) {
//                         return row.col_use;
//                     },},
//                     { field: 'is_qf', title: '是否切分',
//                     formatter: function(value, row, index) {
//                         return row.is_qf;
//                     },},
//                     { field: 'data_type', title: '资料类型',
//                     formatter: function(value, row, index) {
//                         return row.data_type;
//                     },},
//                     { field: 'task_type', title: '任务类型',
//                     formatter: function(value, row, index) {
//                         return row.task_type;
//                     },},
//                     { field: 'instruction', title: '说明',
//                     formatter: function(value, row, index) {
//                         return row.instruction;
//                     },},
//                     { field: 'create_per', title: '创建人员',
//                     formatter: function(value, row, index) {
//                         return row.create_per;
//                     },},
//                     { field: 'create_time', title: '创建时间',
//                     formatter: function(value, row, index) {
//                         return row.create_time;
//                     },},
//                     { field: 'change_per', title: '变更人员',
//                     formatter: function(value, row, index) {
//                         return row.change_per;
//                     },},
//                     { field: 'change_time', title: '变更时间',
//                     formatter: function(value, row, index) {
//                         return row.change_time;
//                     },}
//
//                     ],
//                     onClickRow: function(row, $element) {
//                                     //$element是当前tr的jquery对象
//                                     $element.css("background-color", "green");
//                                 },//单击row事件
//                     locale: "zh-CN", //中文支持
//                     detailView: false, //是否显示详情折叠
//                     detailFormatter: function(index, row, element) {
//                         var html = '';
//                         $.each(row, function(key, val){
//                             html += "<p>" + key + ":" + val +  "</p>"
//                         });
//                         return html;
//                     },
//                     onLoadSuccess: function() { //加载成功时执行
//                         $("#theTable th").css("text-align", "center"); //设置表头内容居中
//                     },
//                     onLoadError: function() { //加载失败时执行
//                         alert("加载数据失败");
//                     }
//                 });
//
//             $('#gaojing_table_result').bootstrapTable('load', data);
//             // $('#shebei_table_all').bootstrapTable('load', data);
//         },
//         error: function () {
//             alert("错误1");
//         }
//     });
// }

// 高精   提交(暂时没用到)
function liucheng_gaojing_tijiao() {
    alert(3);
    var data_source = $('.val0').val();
    var col_type = $('.val1').val();
    var col_use = $('.val2').val();
    var is_qiefen = $('.val3').val();
    var data_type = $('.val4').val();
    var task_type = $('.val5').val();
    var shuoming = $('.val6').val();
    var create_person = $('.val7').val();
    var create_time = $('.val8').val();
    var biangeng_per = $('.val9').val();
    var biangeng_time = $('.val10').val();


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
        url: '/liucheng_gaojing_tijiao',
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


// 高精  去編輯
function liucheng_gaojing_bianji() {

    // 勾选的id
    var arrs = new Array();
    $("input[type='checkbox']:checked").each(function () {
        if ($(this).attr("checked")){
            alert("变更");
            arrs.push($(this).val());
            // alert(arrs);

            var params = {
                "id_list":arrs,
            };

            $.ajax({
                type: "post",
                url: '/liucheng_gaojing_biangeng',
                data: JSON.stringify(params),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {

                    window.location.href = '/liucheng_biangeng_bianji';
                },
                error: function (xhr, type) {
                    alert("错误");
                }
            });
        }
    });
    if (arrs.length==0){
        alert("新增");

        window.location.href = '/liucheng_xinzeng_bianji';
    };
}


//  高精 新增
function liucheng_gaojing_xinzeng() {
    // 判断勾选的id
    var arrs = new Array();
    $("input[type='checkbox']:checked").each(function () {
        if ($(this).attr("checked")){
            arrs.push($(this).val());
        }
    });
    // alert(arrs.length);
    if (arrs.length==0) {
        alert("新增");
        window.location.href = '/liucheng_gaojing_xinzeng_bianji';
    }else {
        alert("不可以勾选!");
        return;
    }

}

// 高精  变更
function liucheng_gaojing_biangeng() {

    // 判断勾选的id
    var arrs = new Array();
    $("input[type='checkbox']:checked").each(function () {
        if ($(this).attr("checked")) {

            arrs.push($(this).val());
            alert(arrs);
        }
        alert(arrs.length);
    });
    // 判断 勾选了几个
     if (arrs.length==1) {
        alert("变更");
        var params = {
        "id_list":arrs,
        };

        $.ajax({
            type: "post",
            url: '/liucheng_gaojing_biangeng',
            data: JSON.stringify(params),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {

                window.location.href = '/liucheng_gaojing_biangeng_bianji';
            },
            error: function (xhr, type) {
                alert("错误");
            }
        });
        }
        else if(arrs.length==0) {
            alert("请勾选一个!");
            return;
        }
        else {
            alert("只能勾选一个!");
            return;
        }
}

