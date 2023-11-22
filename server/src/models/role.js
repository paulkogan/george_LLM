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
    underscored: true
  });


  return Role;
};


export default RoleModel;