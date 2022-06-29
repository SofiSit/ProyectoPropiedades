const userVerification = (req, res) => {
  //console.log(req.user, 'usuario')
  return res.status(200).send({ user: req.user });
};

module.exports = { userVerification };
