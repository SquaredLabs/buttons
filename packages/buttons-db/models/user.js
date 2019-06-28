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

  User.findByPkForSession = function (id) {
    return User.findByPk(id, {
      // Omit the image since it's too large to fit into a session
      attributes: ['id', 'netid', 'name', 'administrator', 'LocationId']
    })
  }

  User.findOrCreateByNetidForSession = function (netid) {
    return User.findOrCreate(
      { where: { netid } },
      )
  }

  return User
}
