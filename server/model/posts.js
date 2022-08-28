import { DataTypes } from "sequelize";

const Posts = (sequelize) => {
  const Schema = {
    title: {
      type: DataTypes.STRING, //=VARCHAR(255)
      allowNull: false, // NOT NULL in SQL (standartine reiksme - true)
    },
    content: {
      type: DataTypes.TEXT, //=TEXT
    },
    content_full: {
      type: DataTypes.TEXT, //=TEXT
    },
    image: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    category: {
      type: DataTypes.STRING, //=VARCHAR(255)
    },
    comment_count: {
      type: DataTypes.INTEGER, //=INT
    },
  };
  return sequelize.define("posts", Schema);
};

export default Posts;
