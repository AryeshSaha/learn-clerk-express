const Users = require("../model/User");

const handleUserCreated = async (data) => {
  console.log(data);
  if (!data) throw new Error("Missing user data");
  const {
    created_at,
    email_addresses,
    first_name,
    last_name,
    fullname,
    id,
    image_url,
    password_enabled,
    updated_at,
    external_accounts,
  } = data;
  try {
    const user = await Users.create({
      clerkId: id,
      firstName: first_name,
      lastName: last_name,
      fullName: fullname,
      emailAddress: email_addresses[0].email_address,
      imageUrl: image_url,
      passwordEnabled: password_enabled,
      provider: external_accounts[0]?.provider || null,
      createdAt: created_at,
      updatedAt: updated_at,
      verified: email_addresses[0].verified,
    });
    console.log("user: ", user);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
};

const handleUserUpdated = async (data) => {
  console.log(data);
};

const handleUserDeleted = async (data) => {
  console.log(data);
};

module.exports = {
  handleUserCreated,
  handleUserUpdated,
  handleUserDeleted,
};
