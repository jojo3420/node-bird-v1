const express = require('express');

const router = express.Router();


// Main page
router.get('/', (req, res, next) => {
   res.render('main', {
     title: '트위터 clone',
     twits: [],
     user: null,
     loginError: req.flash('loginError')
   });
});

// 회원 가입 페이지
router.get('/join', (req, res, next) => {
  res.render('join', {
    title: '회원 가입 - 트위터',
    user: null,
    joinError: req.flash('joinError'),
  });
});


// 내 정보
router.get('/profile', (req, res, next) => {
  res.render('profile', {
    title: '내 정보 - 트위터',
    user: null,
  });
});



module.exports = router;
