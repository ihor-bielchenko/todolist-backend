'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tasks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			text: {
				type: Sequelize.TEXT
			},
			statusId: {
				type: Sequelize.INTEGER
			},
		});
		await queryInterface.addIndex('tasks', [ 'name' ]);
		await queryInterface.addIndex('tasks', [ 'email' ]);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('tasks');
	}
};