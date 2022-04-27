'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.Task.belongsTo(models.Status, {
				foreignKey: 'statusId', 
				as: 'statuses',
			});
		}
	}
	Task.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		statusId: {
			type: DataTypes.INTEGER,
		},
	}, {
		sequelize,
		modelName: 'Task',
		tableName: 'tasks',
		createdAt: false,
		updatedAt: false,
		indexes: [{
			unique: false,
			fields: [ 'name' ],
		}],
	});

	return Task;
};
