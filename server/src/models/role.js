'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';

const RoleModel = (sequelize, DataTypes) => {
  class Role extends Model {}

  Role.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    character_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    movie_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    actor_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: "roles",
  });


	Role.addNew = async (new_role) => {

		return await Role.create(new_role)
		//return message
	}

  return Role;
};


export default RoleModel;