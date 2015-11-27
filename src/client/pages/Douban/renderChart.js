import fetch from 'isomorphic-fetch';

class ChartOption {
    constructor(title, legend, xAxis, series) {
        this.option = {
            title: title,                                                      // title: { text, subtext }
            tooltip: {
                trigger: 'axis'
            },
            legend: {                   
                data: legend.data                                              // legend: { data }
            },                                                     
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: xAxis.axisLabel ? xAxis.axisLabel : {},         // xAxis.axisLabel: { interval: 0,  rotate: -30 } 
                    data: xAxis.data                                           // xAxis.data
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: series.name,                                        // series.name
                    type: series.type,                                        // series.type
                    data: series.data,                                        // series.data
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

        // 返回渲染图表需要的数据
        return this.option;
    }
}

export default function (domId, query, chartInfo) {
    let { tag, sort, name, type } = chartInfo;

    fetch(`/api/douban/movie?${query}`)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function (json) {
            var title = {
                text: tag + '电影',
                subtext: sort
            },
            legend = {
                data: [name]
            },
            xAxis = {
                axisLabel: {
                    interval: 0,  //类目全显
                    rotate: '-30'   //顺时针旋转
                },
                data: []
            },
            series = {
                name: name,
                type: type,
                data: []
            };

            json.subjects.forEach(function (v, i) {
                xAxis.data.push(v.title);
                series.data.push(v.rate);
            });

            let option = new ChartOption(title, legend, xAxis, series);

            // 渲染图表
            echarts.init(document.getElementById(domId)).setOption(option);
        });
}                