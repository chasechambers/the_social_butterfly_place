const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteSingleUser,
  updateUser,
  removeFriend,
  addFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .put(updateUser);

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
