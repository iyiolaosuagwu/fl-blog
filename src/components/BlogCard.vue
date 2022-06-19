<script>
import moment from "moment";
export default {
  props: {
    image: String,
    title: String,
    description: String,
    date: String,
    slug: String,
  },
  methods: {
    dateMe(date) {
      return moment(date).startOf("hour").fromNow();
    },
    calculateTime(createdAt) {
      const today = moment(Date.now());
      const postDate = moment(createdAt);
      const diffInHours = today.diff(postDate, "hours");

      if (diffInHours < 24) {
        return moment(createdAt).format("h");
      } else if (diffInHours > 24 && diffInHours < 36) {
        return moment(createdAt).format("h");
      } else if (diffInHours > 36) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
  },
};
</script>

<template>
  <div class="post-card">
    <div class="post-top">
      <img alt="" :src="image" />
    </div>
    <div class="post-bottom">
      <div>
        <h6><span class="font-bold">Front-end</span> . 1 Hour Ago</h6>
        <h3>
          {{ title.length > 50 ? title.substring(0, 50) + "..." : title }}
        </h3>
        <p>{{ description.substring(3, 140) }}...</p>
      </div>
      <div class="post-footer">
        <!-- <span>{{ date }} Min Read</span> -->
        <span>{{ this.calculateTime(date) }} Min Read</span>
        <router-link :to="`${slug}`" class="link"
          >Read Full <img alt="" src="@/assets/images/arrow.svg"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.post {
  &-card {
    border: 1px solid #f5f5f5;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  &-top {
    text-align: center;
    max-height: 180px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    h6 {
      font-size: 12px;
      margin-top: 10px;
    }

    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-top: 10px;
      line-height: 25px;
      margin-bottom: 1rem;
    }

    p {
      font-size: 14px;
      line-height: 21px;
      margin-bottom: 20px;
    }
  }
}
</style>
