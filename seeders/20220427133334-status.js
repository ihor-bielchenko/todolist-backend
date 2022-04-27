'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('statuses', [{
			name: 'Новый',
		}], {});
		await queryInterface.bulkInsert('statuses', [{
			name: 'Выполнено',
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
