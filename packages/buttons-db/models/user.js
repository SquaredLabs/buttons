module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    }
  }, {
    timestamps: false
  })

  User.associate = models => {
    User.belongsTo(models.Location)
  }

  return User
}
