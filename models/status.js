'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Status extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Task.hasMany(models.Task);
		}
	}
	Status.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'Status',
		tableName: 'statuses',
		createdAt: false,
		updatedAt: false,
		indexes: [{
			unique: false,
			fields: [ 'name' ],
		}],
	});

	return Status;
};