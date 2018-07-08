class UsersService {  
    static getUser(id) {
      return fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then(res => res.json())
        .then(user => new User(user))
    }
  }

  class PostsService {
    static getPosts(user) {
      return fetch('https://jsonplaceholder.typicode.com/posts/?userId=' + user.id)
        .then(res => res.json())
        .then(posts => posts.map(post => new Post(post.body, user)));
    }

    static getStaticPosts(){
      let postsArr = [];
     return fetch('http://127.0.0.1:3000')
        .then((data) => {
          data.json()
            .then((res) => {
              res.posts.forEach(element => {
                feed.createPost(element.message, element.fullName)
                postsArr.push(element);
      
              });
              localStorage.setItem("postsArr", JSON.stringify(postsArr));
            });
        }).catch(() => {
          let arr = JSON.parse(localStorage.getItem("postsArr"));
          arr.forEach(element => {
            feed.createPost(element.message, element.fullName)
      
          });
      
        });
        
    }
  
  }
class User {
  constructor(userObj) {
    this.name = userObj.name;
    this.id = userObj.id;

  }

}

class Feed {

  constructor(feedEl, postEl,userId) {

    this.feedEl = feedEl;
    this.postEl = postEl;
    this.fetchUser(userId);
    this.fetchStaticPosts();
    this.postButton = feedEl.querySelector("#postBtn");
    this.textArea = feedEl.querySelector('textarea');
    this.postButton.addEventListener('click', () => this.createPost());
  }
  fetchUser(userId){
    UsersService.getUser(userId)
      .then(user => this.onUser(user));
  }
  fetchPosts() {
    PostsService
      .getPosts(this.user)
      .then(posts => this.onPosts(posts));
  }

  fetchStaticPosts(){
    PostsService.getStaticPosts().then(posts => this.onPosts(posts));
  }
  onUser(user) {
    this.user = user;
    this.fetchPosts();
    this.render();
  }
  onPosts(posts) {
    posts.forEach(post => this.feedEl.appendChild(post.el));
  }
  
  
  createPost(msg, name) {

    if (this.textArea.value == '') {
      this.user = new User(name);
      this.postBody = msg;
    }
    else {
      this.postBody = this.textArea.value;
      this.user = new User('Nitzan Moyal');
      this.textArea.value = '';
    };
    let timeStamp = this.getTimeStamp();

    let post = new Post(this.postBody, this.user, timeStamp);

    this.postEl.prepend(post.el);

  }


  getTimeStamp() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let currentTime = `${h}:${m}`;

    return currentTime;

  }
}

class Post {
  constructor(postBody, author, timeStamp) {

    this.el = document.createElement('article');
    this.el.setAttribute("id", "newPost");
    this.el.innerHTML = `

       <div class="news-feed-post">
            <div class="post-header">
                <img class="new-post-user-image" src="https://scontent.fhfa2-1.fna.fbcdn.net/v/t1.0-1/p100x100/26220071_10155946724188168_3830575323221372254_n.jpg?_nc_cat=0&oh=4cc84b5d5115a715e49e3c075c77fd0b&oe=5B7A65BC">
                <div class="user-name">
                    <span>${author.name}</span>
                    <i class="fas fa-ellipsis-h"></i>
                </div>

                <div class="time-stamp">${timeStamp}</div>
            </div>

            <div class="post-content">
                
                <span> ${postBody}
                </span>
                <img class="post-image" src="https://scontent.fhfa2-1.fna.fbcdn.net/v/t1.0-9/34670860_10156336678553168_6160009513748398080_n.jpg?_nc_cat=0&oh=5cd3911cc3c12de312da5a5f08ec6494&oe=5BB638EF"
                    alt="">

                    <button>remove post</button>

            </div>


        </div>
  `;

    this.removeButton = this.el.querySelector('button');

    this.removeButton.addEventListener('click', () => this.remove());
  }

  remove() {
    this.el.parentNode.removeChild(this.el);
  }


}


let feed = new Feed(document.querySelector('.posts'), document.querySelector(`#posts-feed`),7);

