'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Commande}) {
      // define association here
      this.hasMany(Commande,{foreignKey:'userId',as:'commande',onDelete:'cascade'})
    }
  };
  User.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    nom:{ 
    type: DataTypes.STRING,
    allowNull:false
    },
    prenom:{
     type:DataTypes.STRING,
     allowNull:false
     },
    email: {
    type: DataTypes.STRING,
    allowNull:false
    },
    password:{
     type: DataTypes.STRING,
     allowNull:false
     },
    telephone: {
    type: DataTypes.INTEGER,
    allowNull:false
    },
    addresse:{
    type: DataTypes.STRING, 
    allowNull:false
     },
     role:{
       type:DataTypes.STRING,
       allowNull:true,
       defaultValue:'client'
     },
     pays:{
       type:DataTypes.STRING,
       allowNull:false
     }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};