'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [{
			name: 'admin',
			password: '$2b$10$ai9hbzjtjCFgvcguFXAUI.dRgLJhdLfSmzaC5FfuRmr2ytuxCSRfm',
		}], {});
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
