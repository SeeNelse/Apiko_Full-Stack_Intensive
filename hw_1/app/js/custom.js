function ready() {

  let mainWrapper = document.querySelector('.main .wrapper'),
      commentsWrapper = document.querySelector('.comments'),
      postsWrapper = document.querySelector('.posts'),
      userWrapper = document.querySelector('.user');
  let singlePost = false;

  // проверка ссылки на пост или юзера
  if (window.location.search.includes('?postId=')) {
    startPagePost()
    return;
  } else if (window.location.search.includes('?userId=')) {
    const userId = +window.location.search.replace('?userId=','');
    usersTake(userId);
    return;
  } else {
    allPosts()
  }
  
  console.log(window.location);
  // слежка за кликом "назад"/"вперед"
  addEventListener("popstate",function(e){
    if (window.location.search.includes('?postId=')) {
      startPagePost()
    } else if (window.location.search.includes('?userId=')) {
      const userId = +window.location.search.replace('?userId=','');
      usersTake(userId);
      return;
    } else {
      allPosts();
    }
  },false);

  // вывод одного поста по ссылке ?postId=
  function startPagePost() {
    [...postsWrapper.children].forEach(function(item, i, arr) {
      item.remove();
    });
    const postId = +window.location.search.replace('?postId=','');
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => postBuilder(data))
      .then(username => authorNameTake())
      .catch(error => console.error(error));
    commentsTake(postId);
    singlePost = true;
  }

  // передача списка постов с базы
  function allPosts() {
    userWrapper.style.display = 'none';
    commentsWrapper.style.display = 'none';
    postsWrapper.classList.remove('no-author');
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => postsTake(data))
    .catch(error => console.error(error));
    function postsTake(posts) {
      posts.forEach(post => postBuilder(post));
      authorNameTake();
    }
  }

  // рендер поста
  function postBuilder(post) {
    let postMain = document.querySelector('.posts'),
        postItem = document.createElement("div"),
        postUserName = document.createElement("a"),
        postHead = document.createElement("a"),
        postBody = document.createElement("p");
    
    postItem.className = 'posts__item';
    postUserName.className = 'posts__name';
    postUserName.addEventListener('click', function() {
      history.pushState({}, '', `?userId=${post.userId}`);
      usersTake(post.userId);
    });
    postUserName.setAttribute('data-user-id', `${post.userId}`);
    postHead.className = 'posts__head';
    postHead.addEventListener('click', function() {
      history.pushState({}, '', `?postId=${post.id}`);
      postSingle(post);
    });
    postBody.className = 'posts__body';

    postHead.innerHTML = post.title;
    postBody.innerHTML = post.body;

    postItem.appendChild(postUserName);
    postItem.appendChild(postHead);
    postItem.appendChild(postBody);
    postMain.appendChild(postItem);
  }

  // вывод одного поста с комментариями
  function postSingle(post) {
    console.log(singlePost);
    if (!singlePost) {
      singlePost = true;
      
      [...postsWrapper.children].forEach(function(item, i, arr) {
        item.remove();
      });
      mainWrapper.insertBefore(postsWrapper, commentsWrapper);

      commentsTake(post.id);
      postBuilder(post);
      authorNameTake();
    }
  }

  // передача списка комментариев и их перебор
  function commentsTake(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => response.json())
      .then(data => oneComment(data))
      .catch(error => console.error(error));
    function oneComment(comments) {
      comments.forEach(comment => commetnsRender(comment))
      userWrapper.style.display = 'none';
      postsWrapper.classList.remove('no-author');
    }
  }

  // рендер комментариев
  function commetnsRender(comment) {
    commentsWrapper.style.display = 'block';
    let commentItem = document.createElement('div'),
        commentAuthor = document.createElement('a'),
        commentHead = document.createElement('h4'),
        commentBody = document.createElement('p');

    commentItem.className = 'comments__item';
    commentAuthor.className = 'comments__author';
    commentAuthor.setAttribute('href', `mailto:${comment.email}`);
    commentHead.className = 'comments__head';
    commentBody.className = 'comments__body';

    commentAuthor.innerHTML = comment.email;
    commentHead.innerHTML = comment.name;
    commentBody.innerHTML = comment.body;

    commentItem.appendChild(commentAuthor);
    commentItem.appendChild(commentHead);
    commentItem.appendChild(commentBody);
    commentsWrapper.appendChild(commentItem);
  }

  // получение имя юзера для вывода автора в постах
  function authorNameTake() {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data => thisAuthor(data))
      .catch(error => console.error(error));
    function thisAuthor(authors) {
      return authors.forEach(function(item, i, arr) {
        document.querySelectorAll('.posts__name').forEach(function(post, q, arr) {
          if (item.id === +post.getAttribute('data-user-id')) {
            post.innerHTML = item.username;
          }
        });
      });
    }
  }

  // передача списка юзеров с базы
  function usersTake(userId) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => thisUser(data))
      .catch(error => console.error(error));
    function thisUser(users) {
      users.forEach(function(item, i, arr) {
        if (item.id === userId) {
          userPage(item);
        }
      });
    }
  }

  // рендер страницы юзера
  function userPage(user) {
    userWrapper.style.display = 'flex';
    commentsWrapper.style.display = 'none';
    postsWrapper.classList.add('no-author');
    singlePost = false;
    [...postsWrapper.children].forEach(function(item, i, arr) {
      item.remove();
    });
    [...userWrapper.children].forEach(function(item, i, arr) {
      item.remove();
    });



    let userName = document.createElement('span'),
        userUserName = document.createElement('span'),
        userEmail = document.createElement('a'),
        userWebSite = document.createElement('a');
    
    userName.className = 'user__name';
    userUserName.className = 'user__username';
    userEmail.className = 'user__email';
    userWebSite.className = 'user__site';

    userEmail.setAttribute('href', `mailto:${user.email}`);
    userWebSite.setAttribute('href', `http://${user.website}`);

    userName.innerHTML = user.name;
    userUserName.innerHTML = user.username;
    userEmail.innerHTML = 'E-mail';
    userWebSite.innerHTML = 'Website';

    userWrapper.appendChild(userName);
    userWrapper.appendChild(userUserName);
    userWrapper.appendChild(userEmail);
    userWrapper.appendChild(userWebSite);
    userPosts(user.id);
  }

  function userPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(data => data.forEach(post => postBuilder(post)))
      .catch(error => console.error(error));
  }
}
document.addEventListener("DOMContentLoaded", ready);