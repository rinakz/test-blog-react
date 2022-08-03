const router = require('express').Router();
const { Post, User } = require('../db/models');
const upload = require('../middlewares/multer')

router.post('/', upload.single('image'), async (req, res) => {
  const { text } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const newPost = await Post.create({
        text,
        image: req.file?.path.replace('client/build', ''),
        user_id: userId,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id',upload.single('image'), async (req, res) => {
  const { text } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const newPost = await Post.update({
        text,
        image: req.file?.path.replace('client/build', ''),
        user_id: userId,
      }, {where: {id: req.params.id} });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [{ all: true }],
  });
  res.json(posts);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
