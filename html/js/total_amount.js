var data1 = [];
var data2 = [];
var data3 = [];
var x1 = 200;
var y1 = 375;
var font = 14;
if (document.body.clientWidth <= 700){
	x1 = 0;
 	y1 = 360;
	font = 8;
}
/*$(function(){
	//获得当前日期，作为图标横坐标
	var now = new Date(); //当前日期 
	var nowDay = now.getDate(); //当前日 
	
	$.getJSON("trans1.json",function(data){
		
		for (var j = 1; j <= nowDay; j++) {
			data3.push(j);
			data1.push(data[0].data1[j]);
			data2.push(data[0].data2[j]);
		}
	});
	alert("欢迎您");
	myChart.setOption({        //加载数据图表
		xAxis: {
			data:data3
		},
		series: [{
			// 根据名字对应到相应的系列
			name: '总金额',
			data:data1
		}]
	});
	
	myChart1.setOption({        //加载数据图表
		xAxis: {
			data:data3
		},
		series: [{
			// 根据名字对应到相应的系列
			name: '总笔数',
			data:data2
		}]
	});

	
});
*/



option = {
    title: {
        text: '交易金额趋势图',
        subtext: '单位：元'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['总金额'],
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
        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} 元'
        }
    },
    series: [
        {
            name:'总金额',
            type:'line',
            data:[2878,2545,2632,3011,4155,3813,4256,4168,4211,3504,3247,3697,2971,3148,3017,2988,3004,3597,3847,3788,3974,4219,4387,4552,4599,4741,4691,4889,4958,4997,5011],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
};
option1 = {
    title: {
        text: '交易笔数趋势图',
        subtext: '单位：笔'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['总笔数'],
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
        data:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}笔'
        }
    },
    series: [
        {
            name:'总笔数',
            type:'line',
            data:[878,545,632,411,655,813,456,468,411,504,547,697,471,648,517,888,754,697,847,788,974,819,687,552,599,741,691,889,958,997,711],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
};