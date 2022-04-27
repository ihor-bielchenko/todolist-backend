'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
		});
		await queryInterface.addIndex('users', [ 'name' ]);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
	}
};