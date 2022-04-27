'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('statuses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
		});
		await queryInterface.addIndex('statuses', [ 'name' ]);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('statuses');
	}
};