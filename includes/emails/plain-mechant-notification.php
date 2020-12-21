<?php
/**
 * Merchant notification email (plain text)
 *
 * @package WooCommerce\Admin\Templates\Emails\HTML
 */

defined( 'ABSPATH' ) || exit;

echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n";
echo esc_html( wp_strip_all_tags( $email_heading ) );
echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

echo wp_kses_post( $email_content );

foreach ( $email_actions as $an_action ) {
	/* translators: %1$s: action label, %2$s: action URL */
	echo wp_kses_post( sprintf( __( '\n%1$s: %2$s', 'woocommerce-admin' ), $an_action->label, $an_action->query ) );
}
echo "\n\n----------------------------------------\n\n";

echo wp_kses_post( apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) ) );
