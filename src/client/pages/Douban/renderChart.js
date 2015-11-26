import fetch from 'isomorphic-fetch';

let option = {
    title : {
        text: '豆瓣电影',
        subtext: '电影评分'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['评分']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLabel : {
              interval : 0,  //类目全显
              rotate : -30   //顺时针旋转45度
            },
            data : []                  // must
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'评分',
            type:'line',
            data:[],                  // must
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};

export default function (domId, query) {
    if (option.xAxis[0].data.length === 0 & option.series[0].data.length === 0) {
        fetch('/api/douban/movie?' + query)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                json.subjects.forEach(function (v, i) {
                    option.xAxis[0].data.push(v.title);
                    option.series[0].data.push(v.rate);
                });

                // console.log(option);

                echarts.init(document.getElementById(domId)).setOption(option);
            });
    } else {
        echarts.init(document.getElementById(domId)).setOption(option);
    }
}                