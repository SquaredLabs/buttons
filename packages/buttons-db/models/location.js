module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: DataTypes.TEXT
  }, {
    timestamps: false
  })

  Location.associate = models => {
    Location.hasMany(models.User)
  }

  return Location
}
