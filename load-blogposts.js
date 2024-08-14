import { db } from "./firebase-config.js";
import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

function loadBlogPosts() {
  const blogPostsRef = collection(db, "blog");

  onSnapshot(blogPostsRef, (querySnapshot) => {
    let blogPostsHTML = "";

    querySnapshot.forEach((doc) => {
      const blog = doc.data();
      blogPostsHTML += `
        <div class="blogPostCard">
          <h5>${blog.time} min. lesetid</h5>
          <div class="blogPostContent">
            <h3>${blog.title}</h3>
            <p>${blog.summary}</p>
          </div>
         <div class="horizontalDisplay">
              <a href="blogPostShowcase.html?id=${doc.id}" class="readMoreButton">Les mer</a>
              <h5>${blog.time} min. lesetid</h5>
          </div>
        </div>
      `;
    });

    document.getElementById("blog-posts-container").innerHTML = blogPostsHTML; // Endret fra "bloggInnlegg" til "blog-posts-container"
  });
}

loadBlogPosts();
