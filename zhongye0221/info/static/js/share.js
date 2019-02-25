/**
 * Created with PyCharm.
 * User: Administrator
 * Date: 14-9-11
 * Time: 上午11:18
 * To change this template use File | Settings | File Templates.
 */
/* 共用 js 模块 *

/* 时间插件 使用 */


      
(function($){
    $.setStartTime = function(){
        $('.startDate').datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: "+d",
            onClose : function(dateText, $input) {
                $( ".endDate" ).datepicker( "show" );
            },
			onSelect:function(dateText, $input) {
                $( ".endDate" ).datepicker( "option","minDate",dateText );
            },
            timepicker:true

        });
    };
    $.setEndTime = function(){
        $(".endDate").datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: "+d",
			defaultDate : new Date(),
            onClose : function(dateText, inst) {
                if (dateText < $("input[name=startDate]").val()){
                  $( "#endDate" ).datepicker( "show" );
				    alert("结束日期不能小于开始日期！");
					//$("#endDate").val(newdate)
                }
            }
        });
    };
    $.date = function(){
        $('.date').datepicker(
            $.extend({showMonthAfterYear:true}, $.datepicker.regional['zh-CN'],
                {'showAnim':'','dateFormat':'yy-mm-dd','changeMonth':'true','changeYear':'true',
                    'showButtonPanel':'true'}
            ));
    };
    $.datepickerjQ = function(){
       $(".ui-datepicker-time").on("click",function(){
           $(".ui-datepicker-css").css("display","block")
        });
        $(".ui-kydtype li").on("click",function(){
            $(".ui-kydtype li").removeClass("on").filter($(this)).addClass("on");
 //           getAppCondtion();
        });

        $(".ui-close-date").on("click",function(){
            $(".ui-datepicker-css").css("display","none");
			 $("#ui-datepicker-div").css("display","none");
			//inst.dpDiv.css({"display":"none"})
        });
		 $(".startDate").on("click",function(){
            $(".endDate").attr("disabled",false);
        });
	
    }
	
})(jQuery);

$(function(){
        $.setStartTime();
        $.setEndTime();
        $.datepickerjQ();
		
        var nowDate = new Date();
        var month = ("0" + (nowDate.getMonth() + 1)).slice(-2);
        var day = ("0" + nowDate.getDate()).slice(-2);
        var timeStr = nowDate.getFullYear() + '-' + month + '-' + day;
        var endDateStr = nowDate.getFullYear() + '-'+ month + '-' + day;
		$(".ui-datepicker-time").attr("value",endDateStr +"~"+ timeStr);
		$(".startDate").attr("value",timeStr);
		$(".endDate").attr("value",endDateStr)
    });




    function datePickers(){
		//自定义菜单
        var startDate = $(".startDate").val();
        var endDate = $(".endDate").val();
        var dateList = startDate +'~'+ endDate;
        $(".ui-datepicker-time").val(dateList);
        $(".ui-datepicker-css").css("display","none");
//        getAppCondtion()
    }





