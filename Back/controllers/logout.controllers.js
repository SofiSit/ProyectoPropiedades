const logout = (req, res) => res.status(200).send({ logout: true });

module.exports = { logout };