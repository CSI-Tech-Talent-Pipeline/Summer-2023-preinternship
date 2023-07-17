# Using the 'as' Option for Associations

When we set up associations, sometimes we'll have the need for the `as` option, let's consider a scenario where a `User` has multiple associated `Address` records - one for billing and one for shipping.

```javascript
// models/user.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Address, { as: "billingAddress" });
      User.hasOne(models.Address, { as: "shippingAddress" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      // other user attributes...
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

// models/address.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, {
        as: "billingAddress",
        foreignKey: "billingUserId",
      });
      Address.belongsTo(models.User, {
        as: "shippingAddress",
        foreignKey: "shippingUserId",
      });
    }
  }
  Address.init(
    {
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      // remember to include the foreign keys!
      billingUserId: DataTypes.INTEGER,
      shippingUserId: DataTypes.INTEGER,
      // other address attributes...
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
```

Points to Note:

- The `as` option provides an alias for the association. This is helpful when associating with the same model more than once.
- Here, we define two one-to-one relationships between `User` and `Address` - one for the billing address and one for the shipping address.
- The `foreignKey` option is used to specify the foreign key in the association.
