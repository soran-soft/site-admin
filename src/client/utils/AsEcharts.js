export default class RenderChart {
    constructor() {
        
    }

    initChart(domId) {
        this.mychart = echarts.init(document.getElementById(domId));

        this.mychart.showLoading({          // loading
            effect: 'bubble', // 'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'
            textStyle: {
                color: '#666',
                fontSize: 24
            }
        });         
        this.mychart.setTheme('macarons');  // theme: macarons, infographic
    }

    // 渲染图表
    setOption() {
        this.mychart.setOption(this.option).hideLoading();  
    }

    getOption(title, legend, xAxis, series, toolSwitch) {
        let isToolbox, isCalculable, isBoundaryGap;

        if (!toolSwitch) {
            isToolbox = true;
            isCalculable = true;
        } else {
            isToolbox = (typeof toolSwitch.toolbox !== 'undefined' ? toolSwitch.toolbox : true);
            isCalculable = (typeof toolSwitch.calculable !== 'undefined' ? toolSwitch.calculable : true);
            isBoundaryGap = (typeof toolSwitch.boundaryGap !== 'undefined' ? toolSwitch.boundaryGap : true);
        }

        this.option = {
            title: title,                                                      // title: { text, subtext }
            tooltip: {
                trigger: 'axis'
            },
            legend: {                   
                data: legend.data                                              // legend: { data }
            },                                                     
            toolbox: {
                show: isToolbox,                                               // toolbox switch
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: isCalculable,                                          // calculable switch
            xAxis: xAxis.map((v) => {
                return {
                    type: 'category',
                    boundaryGap: isBoundaryGap,                                // boundaryGap switch
                    axisLabel: v.axisLabel ? v.axisLabel : {},                 // v.axisLabel: { interval: 0,  rotate: -30 } 
                    data: v.data                                               // v.data
                };
            }),
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: series.map((v) => {
                return {
                    name: v.name,                                             // series.name
                    type: v.type,                                             // series.type
                    data: v.data,                                             // series.data
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
                };
            })
        };
    }
}
