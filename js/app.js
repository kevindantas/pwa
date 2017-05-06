// Initialize Firebase
var config = {
  apiKey: "AIzaSyBS5dEUkZ3qWErZwYDW_ee7hTNjJiXOmTc",
  authDomain: "senai-firebase.firebaseapp.com",
  databaseURL: "https://senai-firebase.firebaseio.com",
  projectId: "senai-firebase",
  storageBucket: "senai-firebase.appspot.com",
  messagingSenderId: "689924745508"
};
var app = firebase.initializeApp(config);

function q(selector, parent) {
  parent = parent || document;
  console.log(parent, selector)
  var elems = parent.querySelectorAll(selector);
  if(elems.length > 1) return elems;
  return parent.querySelector(selector);
}

var firebaseAuth = firebase.auth();

firebaseAuth.onAuthStateChanged((user) => {
console.log(user);
  q('.user-info img').src = user.photoURL;
});


var isNewChild = false;


var transitionContent = q('#transition-content'),
    loading = q('.loading'),
    content = document.getElementById('content'),
    postsElement = q('.posts');




/**
 * Show search bar
 */
q('.search-btn').addEventListener('click', function (e) {
  e.preventDefault();
  var element = this;
  element.parentNode.querySelector('.search-bar').classList.add('-active');

  var input = element.parentNode.querySelector('.search-bar input');

  input.value = '';
  input.focus();

});

/**
 * Hide search bar
 */
q('.toolbar .back-btn').addEventListener('click', function (e) {
  var element = this;
  element.parentNode.parentNode.classList.remove('-active');
  e.preventDefault();
});




/**************************************
 * * * * *  Firebase Events * * * * * *
 **************************************/
var database = app.database();

var postsRef = database.ref().child('posts');



/**
 * Called only once, check if there's posts on database
 */
postsRef.once('value').then(function (snapshot) {
  let posts = snapshot.val(),
      count = 0;
  
  for (let id in posts) count++;

  if(count == 0)
    postsElement.innerHTML = '<h3 class="empty-placeholder">Nenhum post criado</h3>'
});


/**
 * Listener for each child existing in the database
 */
postsRef.on('child_added', function (snapshot) {
  var post = snapshot.val();
  loading.classList.add('hide');
  addCard(post);
});



/**
 * create a new card with the post information
 *
 * @param {object} post Post information
 */
function addCard(post) {
  var emptyPlaceholder = q('.empty-placeholder');

  if(emptyPlaceholder) emptyPlaceholder.remove();


  let cardWrapper = document.createElement('div');
  cardWrapper.setAttribute('class', 'card post-item');
  if(isNewChild) cardWrapper.classList.add('-highlight');
  cardWrapper.innerHTML = '' +
    '<h1 class="title">'+post.title+'</h1>'+
    '<div class="card-options">' +
    '<span class="time">'+moment(post.createdAt).fromNow()+'</span>' +
    '<span class="comments"></span>' +
    '</div>';

  postsElement.insertBefore(cardWrapper, postsElement.firstChild);
}



document.querySelector('.post-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var element = this;

  var descriptionField = element.querySelector('input');

  var post = {
    title: descriptionField.value,
    createdAt: new Date().toISOString(),
    comments: []
  };

  isNewChild = true;
  new Toast('Post criado com sucesso!', 3000);
  return postsRef.push().set(post);
});