/**
 * Created by python on 18-12-5.
 */
// 查询
function user_chaxun() {
    // alert('chaxun');
    $('#div_tall').css('display','none');
    $('#div_tresult').css('display','block');

    var user_role = $('.user_role').val();
    // alert(user_role);

    var params = {
        "user_role":user_role
    };

    $.ajax({
        type: "post",
        url: '/user_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            // alert(data);
            $('#table_result').bootstrapTable({
                url: '/user_result',
                method:'get',
                dataType:"json",
                contentType:'application/x-www-form-urlencoded',

                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                pageSize: 5,
                pageNumber: 1,
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                // pageList: [5, 10, 15, 20],        //可供选择的每页的行数（*）
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

                    user_role : $('.user_role').val(),

                };
                return temp;
            },

                columns: [
                    {field: 'xuhao', title: '序号',
                    checkbox:true,
                    formatter:stateFormatter
                    },
                    { field: 'user_name', title: '用户名',
                    formatter: function(value, row, index) {
                        return row.user_name;
                    },},
                    { field: 'qq_num', title: 'QQ号',
                    formatter: function(value, row, index) {
                        return row.qq_num;
                    },},
                    { field: 'mail_num', title: '邮箱',
                    formatter: function(value, row, index) {
                        return row.mail_num;
                    },}
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
        error: function () {

        }

    })
}
// 新建
function add_done() {
    var user_name = $("#user-name").val();
    var qq_num = $("#qq-num").val();
    var mail_num = $("#mail_num-num").val();
    // alert("user_name:" + user_name);
    var params = {
        "user_name":user_name,
        "qq_num":qq_num,
        "mail_num":mail_num
    };
    $.ajax({
        type: "post",
        url: '/user_add',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            // alert(data['msg']);

            // 提交后刷新页面
            location.reload();
        },
        error: function () {

        }
    })

}
// 变更
function user_change() {
    alert('选中');
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
        var th_name = $('tr[class="selected"]').children('td').eq(1).text();
        var th_qq = $('tr[class="selected"]').children('td').eq(2).text();
        var th_mail = $('tr[class="selected"]').children('td').eq(3).text();
        // 将原数据渲染到页面上
        $('#user-name').val(th_name);
        $('#qq-num').val(th_qq);
        $('#mail-num').val(th_mail);


    }
}

// 删除
function user_del() {
    var arrs = new Array();
    $("table tr[class='selected']").each(function () {
        if ($(this)) {
            arrs.push($(this).attr("data-index"));
        }
    });
    alert(arrs);
    var params = {
        "index_list":arrs
    };
    $.ajax({
        type: "post",
        url: '/user_del',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

        },
        error: function () {

        }
    })

}