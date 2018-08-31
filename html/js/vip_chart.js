var centerdata1 = ['30%', '50%'];
var centerdata2 = ['70%', '50%'];
var x1 = 0;
var y1 = 0;

if (document.body.clientWidth <= 700){
	centerdata1 = ['52%', '30%'];
	centerdata2 = ['52%', '70%'];
	x1 = 0;
	y1 = 200;

}

option = {
    title : {
        text: '会员统计分布',
        subtext: '（人数）',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
		x:x1,
		y:y1,
        data: ['0-20岁','20-40岁','40-60岁','60岁以上','男','女']
    },
    series : [
        {
            name: '人数',
            type: 'pie',
            radius : '55%',
            center: centerdata1,
            data:[
                {value:170, name:'0-20岁'},
                {value:520, name:'20-40岁'},
                {value:400, name:'40-60岁'},
                {value:55, name:'60岁以上'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },{
            name: '人数',
            type: 'pie',
            radius : '55%',
            center: centerdata2,
            data:[
                {value:335, name:'男'},
                {value:810, name:'女'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
