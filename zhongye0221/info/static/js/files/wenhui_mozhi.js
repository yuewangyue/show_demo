function mozhi_search() {
    $('#div_tall').css('display','none');
    $('#div_result').css('display','block');
    var task_num_type = $('#task_num_type').val();
    var type = 0;
    if (task_num_type == 'group_id'){
        type = 0
    }
    //if (task_num_type == '任务编号'){
    //    type = 1
    //}
    var task_num = $('#mozhi_input').val();
    var params = {
        "task_num" :task_num,
        "type":type
    };

    $('#table_result').bootstrapTable({
        url: '/wenhui_mozhi_result',
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
        uniqueId: "no",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        async:true,
        queryParams : function (params) {
            var temp = {
                pagenumber : params.pageNumber,
                pagesize : params.pageSize,
                task_num :$('#mozhi_input').val(),
                type:0
            };
            return temp;
        },
        columns: [
           { field: 'group_id', title: 'group_id',
           formatter: function(value, row, index) {
                return row.col_task_id;
           },},
           { field: 'task_num', title: '任务编号',
           formatter: function(value, row, index) {
                return row.qb_id;
           },},
           { field: 'mtl_id', title: '资料id',
           formatter: function(value, row, index) {
                return row.data_name;
           },},
           ],
        onLoadSuccess: function() { //加载成功时执行
             $("#theTable th").css("text-align", "center"); //设置表头内容居中
             },
        onLoadError: function() { //加载失败时执行
              alert("加载数据失败");
             }
    })

    $.ajax({
        type: "post",
        url: '/wenhui_mozhi_result',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            var data = data;
            alert(data['total']);

        $('#table_result').bootstrapTable({
            url: '/wenhui_mozhi_result',
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
            uniqueId: "no",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            async:true,
            queryParams : function (params) {
                var temp = {
                    pagenumber : params.pageNumber,
                    pagesize : params.pageSize,
                    task_num :$('#mozhi_input').val(),
                    type:0
                };
                return temp;
            },
            columns: [
               { field: 'group_id', title: 'group_id',
               formatter: function(value, row, index) {
                    return row.group_id;
               },},
               { field: 'task_num', title: '任务编号',
               formatter: function(value, row, index) {
                    return row.qb_id;
               },},
               { field: 'mtl_id', title: '资料id',
               formatter: function(value, row, index) {
                    return row.data_name;
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
