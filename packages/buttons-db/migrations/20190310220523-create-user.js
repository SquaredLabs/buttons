exports.up = (queryInterface, DataTypes) =>
  queryInterface.createTable('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    netid: {
      type: DataTypes.STRING(8),
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    administrator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    LocationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id'
      },
      onDelete: 'set null'
    }
  })

exports.down = (queryInterface, DataTypes) =>
  queryInterface.dropTable('Users')
