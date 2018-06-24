
alert("dd");

// fetch('http://127.0.0.1:3000')
// .then((data) => {
//   data.json()
//     .then((res) => {
//       res.posts.forEach(element => {
//         createPost(element.message);
//       });
//     });
// });

    
class User {
    constructor(name, lastname){
      this.name = name;
      this.lastname = lastname;
    }
    
    get fullname() {
      return `${this.name} ${this.lastname}`;
    }
  }
  
  class Feed {

    constructor(feedEl,postEl){

      this.feedEl = feedEl;
this.postEl= postEl;
      this.user = new User('Nitzan', 'Moyal');
      this.postButton = feedEl.querySelector("#postBtn");
      this.textArea = feedEl.querySelector('textarea');
      this.postButton.addEventListener('click', () => this.createPost());
    }
    
    createPost() {
    
      let postBody = this.textArea.value;
      this.textArea.value = '';
      let timeStamp = this.getTimeStamp();
      let d = new Date();

      let post = new Post(postBody, this.user,timeStamp);
     
      this.postEl.prepend(post.el);
      
    }

     getTimeStamp(){
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let currentTime= `${h}:${m}`;

    return currentTime;

    }
  }
  
  class Post {
    constructor(postBody, author,timeStamp) {

      this.el = document.createElement('article');
this.el.setAttribute("id","newPost");

      this.el.innerHTML = `

       <div class="news-feed-post">
            <div class="post-header">
                <img class="new-post-user-image" src="https://scontent.fhfa2-1.fna.fbcdn.net/v/t1.0-1/p100x100/26220071_10155946724188168_3830575323221372254_n.jpg?_nc_cat=0&oh=4cc84b5d5115a715e49e3c075c77fd0b&oe=5B7A65BC">
                <div class="user-name">
                    <span>${author.fullname}</span>
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

  new Feed(document.querySelector('.posts'),document.querySelector(`#posts-feed`));