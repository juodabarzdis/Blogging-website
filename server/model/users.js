import { DataTypes } from "sequelize";

const Users = (sequelize) => {
  const Schema = {
    username: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING, //=TEXT
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER, //=INT
      allowNull: false,
      defaultValue: 0,
    },
  };
  return sequelize.define("users", Schema);
};

export default Users;
