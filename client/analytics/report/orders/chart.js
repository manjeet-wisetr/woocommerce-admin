/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import ReportChart from 'analytics/components/report-chart';
import ReportSummary from 'analytics/components/report-summary';

const CHARTS_FILTER = 'woocommerce-charts-list';

class OrdersReportChart extends Component {
	getCharts() {
		return applyFilters( CHARTS_FILTER, [
			{
				key: 'orders_count',
				label: __( 'Orders Count', 'wc-admin' ),
				type: 'number',
			},
			{
				key: 'net_revenue',
				label: __( 'Net Revenue', 'wc-admin' ),
				type: 'currency',
			},
			{
				key: 'avg_order_value',
				label: __( 'Average Order Value', 'wc-admin' ),
				type: 'currency',
			},
			{
				key: 'avg_items_per_order',
				label: __( 'Average Items Per Order', 'wc-admin' ),
				type: 'average',
			},
		] );
	}

	getSelectedChart() {
		const { query } = this.props;
		const charts = this.getCharts();
		const chart = find( charts, { key: query.chart } );
		if ( chart ) {
			return chart;
		}

		return charts[ 0 ];
	}

	render() {
		const { path, query } = this.props;
		return (
			<Fragment>
				<ReportSummary
					charts={ this.getCharts() }
					endpoint="orders"
					query={ query }
					selectedChart={ this.getSelectedChart() }
				/>
				<ReportChart
					charts={ this.getCharts() }
					endpoint="orders"
					path={ path }
					query={ query }
					selectedChart={ this.getSelectedChart() }
				/>
			</Fragment>
		);
	}
}

OrdersReportChart.propTypes = {
	path: PropTypes.string.isRequired,
	query: PropTypes.object.isRequired,
};

export default OrdersReportChart;
