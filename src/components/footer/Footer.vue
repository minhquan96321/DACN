<script setup>
import { ref } from "vue";
const navigation = ref(["Home", "Blog", "Categories", "About us", "Contact"]);
const categorisation = ref([
  "Business",
  " Culture",
  "Sport",
  "Food",
  " Politics",
  " Celebrity",
  "tartups",
  "Travel",
]);
</script>

<template>
  <footer class="footer">
    <div class="footer-conter">
      <div class="container">
        <div class="about-zenblog">
          <h3 class="about-zenblog-heading">About ZenBlog</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ab,
            perspiciatis beatae autem deleniti voluptate nulla a dolores,
            exercitationem eveniet libero laudantium recusandae officiis qui
            aliquid blanditiis omnis quae. Explicabo?
          </p>

          <p>
            <a href="" class="footer-link-more"> Learn More </a>
          </p>
        </div>
        <div class="about-path">
          <div class="about-path-navigation">
            <h3 class="about-zenblog-heading">Navigation</h3>
            <ul class="navigation-navbar">
              <li v-for="(list, index) in navigation" :key="index">
                <a href="">
                  <i class="fa-sharp fa-thin fa-angle-right bi-icon"></i><span>{{ list }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="about-path-categories">
            <h3 class="about-zenblog-heading">Categories</h3>
            <ul class="navigation-navbar">
              <li v-for="(list, index) in categorisation" :key="index">
                <a href="">
                  <i class="fa-sharp fa-thin fa-angle-right bi-icon"></i><span>{{ list }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="recent-posts">
          <h3 class="about-zenblog-heading">Recent Posts</h3>
          <ul class="footer-links">
            <li>
              <a href="" class="recent-post">
                <img src="https://i.pinimg.com/originals/d9/b8/3a/d9b83aa1a08be3e46ebb47254db8cf75.jpg" alt="lỗi"
                  class="img-recent" />
                <div>
                  <div class="recent-meta">
                    <span class="date">Culture</span>
                    <span class="mx-1">•</span>
                    <span>MAR 19th '24</span>
                  </div>
                  <span class="recent-titile">5 Great Startup Tips for Female Founders</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-legal">
      <div class="container">
        <div class="company-legal">
          <span class="sty-company">
            © Copyright ZenBlog. All Rights Reserved
          </span>
          <br />
          <br />
          <span class="location">Designed by BootstrapMade</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style setup>
.footer {
  background: rgba(0, 0, 0, 0.9);
}

.footer-conter {
  padding: 60px 0;
  background: #191919;
}

.container {
  max-width: 1320px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
}

.recent-posts,
.about-path,
.about-zenblog {
  padding: 0 24px;
}

.about-zenblog-heading {
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #ffffff;
}

.about-zenblog p {
  color: #ffffff;
  line-height: 1.5;
  font-size: 15px;
  margin-bottom: 12px;
}

.about-zenblog p a {
  text-decoration: none;
  color: #ffffff;
  position: relative;
}

.footer-link-more::before {
  position: absolute;
  content: "";
  background: #ffffff;
  height: 0.5px;
  width: 70px;
  top: 20px;
}

.footer-links,
.navigation-navbar {
  list-style: none;
}

.navigation-navbar li {
  margin-bottom: 20px;
}

.navigation-navbar a {
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
}

.bi-icon {
  padding-right: 6px;
}

.about-path {
  display: flex;
  justify-content: space-between;
}

.recent-post {
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
}

.img-recent {
  flex: 0 0 50px;
  width: 50px;
  margin-right: 15px;
  border-radius: 3px;
}

.recent-meta {
  font-size: 10px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 5px;
}

.recent-titile {
  font-size: 15px;
}

.footer-legal {
  background: #000000;
  padding: 40px 0;
}

.container-legal {
  display: flex;
  justify-content: space-between;
}

.sty-company {
  color: #ffffff;
  font-size: 16px;
}

.location {
  color: #ffffff;
  font-size: 11px;
  margin-top: 20px;
}


@media (min-width: 1400px) {

  .about-path,
  .about-zenblog,
  .recent-posts {
    width: 33.33333%;
  }

  .about-path-categories,
  .about-path-navigation {
    width: 50%;
  }

  .social-network,
  .company-legal {
    width: 50%;
  }
}

@media (max-width: 767px) {
  .container {
    display: flex;
    flex-wrap: wrap
  }

  .about-zenblog {
    margin-bottom: 30px
  }

  .about-path {
    width: 100%;
  }

  .about-path-categories,
  .about-path-navigation {
    width: 50%;
  }

  .footer-legal {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px 0;
  }
}
</style>
