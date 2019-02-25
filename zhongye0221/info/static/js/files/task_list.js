/**
 * Created by python on 18-10-10.
 */

function search() {

    var project_name = $('.project_name').val();
    var sear_id = $('.input').val();
    alert(project_name);
    params = {
        "sear_id": sear_id,
        "project_name":project_name
    };


    $.ajax({
        type: "post",
        url: '/task_list',
        data: JSON.stringify(params),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

            var msg = data['msg'];
            var data = data['data'];
            var len_data = data.length;

            var s = '';
            for (var i=0;i<len_data;i++){

                s += data[i]['a'] + "   " +  data[i]['b'] + "   " + data[i]['c'] + "\n";
            }
            var replace = "<textarea class='text_val' style='width: 100%; height: 300px;'>" + s +"</textarea>";

            $(".text_area").html(replace);
            alert(msg);
        },
        error: function () {
            alert("错误")
        }
    })
}

