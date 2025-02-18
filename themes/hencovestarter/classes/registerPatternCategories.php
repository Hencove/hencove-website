<?php
// ? silence is golden
// ? code is poetry

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}



class RegisterPatternCategories
{

	/**
	 * Holds the instance.
	 */
	private static $instance;


	/**
	 * Init Main Instance.
	 *
	 * Insures that only one instance exists in memory at any one
	 * time. Also prevents needing to define globals all over the place.
	 */
	public static function instance()
	{

		// manage state to keep only one instace in memory
		if (!isset(self::$instance) && !(self::$instance instanceof RegisterPatternCategories)) {

			self::$instance = new RegisterPatternCategories();
			self::$instance->includes();
		}

		// return new instance
		return self::$instance;
	}



	private function includes()
	{

		add_action('init', function () {

			register_block_pattern_category(
				'page',
				array(
					'label'       => __('Page', 'hencovestarter'),
					'description' => __('Create a full page with multiple patterns that are grouped together.', 'hencovestarter'),
				)
			);
			register_block_pattern_category(
				'pricing',
				array(
					'label'       => __('Pricing', 'hencovestarter'),
					'description' => __('Compare features for your digital products or service plans.', 'hencovestarter'),
				)
			);
		});
	}
}

RegisterPatternCategories::instance();
