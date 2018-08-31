var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var x1 = 200;
var y1 = 375;
var font = 14;
if (document.body.clientWidth <= 700){
	x1 = 0;
 	y1 = 360;
	font = 8;
}
	
$(function(){
	//获得当前日期，作为图标横坐标
	var now = new Date(); //当前日期 
	var nowDay = now.getDate(); //当前日 
	//得到当前路径
	/* var pathName = window.location.pathname.substring(1);
	pathName = pathName.substring(0, pathName.lastIndexOf('/'));
    var filePath=pathName +　"/1.xls"; //要读取的xls
	//创建Excel对象，打开表格
   try{
		var oXL = new ActiveXObject("Excel.application"); //创建Excel.Application对象
		var oWB = oXL.Workbooks.open(filePath);
    }catch(err){
        alert(err);
    }

	//操作第一个sheet(从一开始，而非零)
	oWB.worksheets(1).select();
	var oSheet = oWB.ActiveSheet;
	//总列数
	var cols =  oSheet .usedrange.columns.count;
	for (var j = 2; j <= nowDay; j++) {
		data5.push(j);
		data1.push(oSheet.Cells(1, j).value);
		data2.push(oSheet.Cells(2, j).value);
		data3.push(oSheet.Cells(3, j).value);
		data4.push(oSheet.Cells(4, j).value);
	}
	//填充今日总收入
	$("#t_amount").html(oSheet.Cells(4, nowDay).value);
	//操作第二个sheet(从一开始，而非零)
	oWB.worksheets(2).select();
	oSheet = oWB.ActiveSheet;
	//填充会员信息
	$("#new_member").html(oSheet.Cells(1, 2).value);
	$("#member").html(oSheet.Cells(2, 2).value);
	//退出操作excel的实例对象
	oXL.Application.Quit();
	//手动调用垃圾收集器
	CollectGarbage();*/
	$.getJSON("info.json",function(data){
		
		for (var j = 1; j <= nowDay; j++) {
			data5.push(j);
			data1.push(data[0].data1[j]);
			data2.push(data[0].data2[j]);
			data3.push(data[0].data3[j]);
			data4.push(data[0].data4[j]);
		}
		$("#t_amount").html(data[0].data4[nowDay]);
		//填充会员信息
		$("#new_member").html(data[0].data5);
		$("#member").html(data[0].data6);
		
	});
	alert("欢迎您");
	myChart.setOption({        //加载数据图表
		xAxis: {
			data:data5
		},
		series: [{
			// 根据名字对应到相应的系列
			name: '总收入',
			data:data4
		},{
			// 根据名字对应到相应的系列
			name: '银行卡收入',
			data:data1
		},{
			// 根据名字对应到相应的系列
			name: '支付宝收入',
			data:data2
		},{
			// 根据名字对应到相应的系列
			name: '微信收入',
			data:data3
		}]
	});

	
});

option = {
    title: {
        text: '本月收入趋势图',
        subtext: '单位：元'
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data:['总收入','银行卡收入','支付宝收入','微信收入'],
		x:x1,
		y:y1,
		textStyle: {
           fontSize: font // 用 legend.textStyle.fontSize 更改示例大小
        }
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
		axisLabel: {
            formatter: '{value} 日'
        },
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} 元'
        }
    },
    series: [
        {
            name:'总收入',
            type:'line',
            data:data1,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        },
        {
            name:'银行卡收入',
            type:'line',
            data:[],
            markPoint: {
                 data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        },
        {
            name:'支付宝收入',
            type:'line',
            data:[],
            markPoint: {
                 data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        },
        {
            name:'微信收入',
            type:'line',
            data:[],
            markPoint: {
                 data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        }
    ]
};