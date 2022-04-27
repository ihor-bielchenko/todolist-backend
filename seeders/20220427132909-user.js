'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [{
			name: 'admin',
			password: '123',
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
