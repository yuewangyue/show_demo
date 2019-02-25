/**
 * Created by python on 18-9-3.
 */

// 查询事件
function liucheng_chaxun() {
    $('#div_all').css('display','none');
    $('#div_result').css('display','block');

    var col_use = $('.liu_col_use').val();
    var data_source = $('.liu_data_source').val();

    var params = {
        "col_use":col_use,
        "data_source":data_source,
        "daochu":0
    };
    $.ajax({
        type: "post",
        url: '/liucheng_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

            $('#table_result').bootstrapTable({
                url: '/liucheng_result',
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
            $('#table_result').bootstrapTable('load', data);
        },
        error: function () {
            alert("错误");
        }
    });
}


// 设备  新增
function add_done() {
    var data_source = $("#data_source").val();
    var col_type = $("#col_type").val();
    var is_qiefen = $("#is_qiefen").val();
    var col_use = $("#col_use").val();
    var data_type = $("#data_type").val();
    var task_type = $("#task_type").val();
    var instruction = $("#instruction").val();
    var create_person = $("#create_person").val();
    var change_person = $("#change_person").val();

    var params = {
        "data_source":data_source,
        "col_type":col_type,
        "is_qiefen":is_qiefen,
        "col_use":col_use,
        "data_type":data_type,
        "task_type":task_type,
        "instruction":instruction,
        "create_person":create_person,
        "change_person":change_person
    };

    $.ajax({
        type: "post",
        url: '/liucheng_insert',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;

            // 提交后刷新页面
            location.reload();
        },
        error: function () {

        }
    })


}

// 变更
function liucheng_biangeng() {
    // alert('选中');
    // 选中
    var arrs = new Array();
    $("table tr[class='selected']").each(function () {
        if ($(this)) {
            arrs.push($(this).attr("data-index"));
        }
    });
    // alert(arrs);
    for(var i=0;i<arrs.length;i++){
        // 获取选中行序号
        var arr_index = arrs[i];
        // alert(arr_index);
        var th_data_source = $('tr[class="selected"]').children('td').eq(1).text();
        var th_col_type = $('tr[class="selected"]').children('td').eq(2).text();
        var th_is_qiefen = $('tr[class="selected"]').children('td').eq(3).text();
        var th_col_use = $('tr[class="selected"]').children('td').eq(4).text();
        var th_data_type = $('tr[class="selected"]').children('td').eq(5).text();
        var th_task_type = $('tr[class="selected"]').children('td').eq(6).text();
        var th_instruction = $('tr[class="selected"]').children('td').eq(4).text();
        var th_create_person = $('tr[class="selected"]').children('td').eq(5).text();
        var th_change_person = $('tr[class="selected"]').children('td').eq(6).text();
        // 将原数据渲染到页面上
        $('#data_source1').text(th_data_source);
        $('.col_type').text(th_col_type);
        $('.is_qiefen').text(th_is_qiefen);
        $('.col_use').text(th_col_use);
        $('.data_type').text(th_data_type);
        $('.task_type').text(th_task_type);
        $('#instruction').val(th_instruction);
        $('#create_person').val(th_create_person);
        $('#change_person').val(th_change_person);
    }
}

// 设备  导出
function liucheng_download() {
    var col_use = $('.liu_col_use').val();
    var data_source = $('.liu_data_source').val();
    var th_list =  Array('id','资料源','采集类型','采集用途','是否切分','资料类型','任务类型','说明','创建人员','创建时间','变更人员','变更时间');
    // alert(th_list);
    var params ={
        "col_use":col_use,
        "data_source":data_source,
        "table_th":th_list
    };
    $.ajax({
        type: "post",
        url: '/liucheng_download',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {


        }, error: function () {

        }
    })


}

