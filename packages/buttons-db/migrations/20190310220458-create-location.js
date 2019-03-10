exports.up = (queryInterface, DataTypes) =>
  queryInterface.createTable('Locations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: DataTypes.TEXT
  })

exports.down = (queryInterface, DataTypes) =>
  queryInterface.dropTable('Locations')
