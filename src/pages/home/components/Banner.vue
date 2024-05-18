<script setup></script>

<template>
  <section class="hero-slider">
    <div class="row">
      <div class="col-12" style="display: flex; width: 100%">
        <div class="swiper-slide">
          <div class="swiper-wrapper" style="">
            <a href="" class="img-bg" style="
                background-image: url(https://image.lag.vn/upload/news/22/04/05/black-clover-329-1_BIHB.jpg);
              ">
              <div class="img-bg-inner">
                <h2>
                  Yếu đuối không phải là một nhục nhã nhưng không khắc phục nó
                  mới thật sự là ô nhục
                </h2>
                <p>
                  Nếu cậu không thích số phận, đừng chấp nhận nó. Thay vào đó
                  hãy dũng cẩm thay đổi nó theo ý của mình...
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>

<style scoped>
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
}

.swiper-slide {
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  position: relative;
  transition-property: transform;
}

.img-bg {
  height: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background-position: center center;
  display: flex;
  align-items: flex-end;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
}

.img-bg .img-bg-inner {
  z-index: 2;
  max-width: 700px;
  position: relative;
  padding-left: 100px;
  padding-right: 100px;
  margin-bottom: 50px;
}

.img-bg .img-bg-inner h2 {
  font-size: 32px;
  font-weight: 500;
  list-style: 1.2;
  margin: 0 0 8px;
}

.img-bg .img-bg-inner p {
  margin: 0 0 16px;
}

.img-bg .img-bg-inner h2,
.img-bg .img-bg-inner p {
  color: #ffffff;
  font-family: "EB Garamond", serif;
}

@media (max-width: 768px) {
  .img-bg {
    display: none
  }
}
</style>
