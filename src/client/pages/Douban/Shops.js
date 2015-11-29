import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchShop } from '../../actions/douban';
import { FormText } from '../../components/Form/';
import { Table } from '../../components/Table/';
import shopsChart from './kit/shopsChart';

class Shops extends Component {
    static defaultProps = {
        aboutChart: { // 图表的图例及图表类型
            type: 'line'
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            tables: []
        }
    }

    componentDidMount() {
        let { aboutChart, shops, fetchShop } = this.props;

        let asEcharts,
            chartInfo = {
                ...aboutChart,
                page: 1,
                page_size: 5
            };

        fetchShop(1, 5, function () {
            asEcharts = shopsChart.init('douban-shops');
        }, function (shops) {
            shopsChart.output(asEcharts, chartInfo, shops);
            
            let tables = this.state.tables;
            tables = shops.map(shop => {
                return {
                    title: ['商品名称', '优惠价', '市场价'],
                    data: shop.skus.map(v => {
                        return { 
                            title: v.title, 
                            promote_price: v.promote_price,
                            market_price: v.market_price
                        }
                    })
                }
            });

            this.setState({ tables });
        }.bind(this));
    }

    render() {
        return (
            <section>
                <FormText inputId="shops-input-1" title="page" placeholder="page" inline="auto" asStyle="as-col-4" />
                <FormText inputId="shops-input-2" title="page_size" placeholder="page_size" inline="auto" asStyle="as-col-4" />

                <div id="douban-shops" style={{height: '400px'}}></div>

                {this.state.tables.map((table, i) => <Table key={i} asStyle="df-douban-table" config={table} />)}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        shops: state.douban.shops
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchShop
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
