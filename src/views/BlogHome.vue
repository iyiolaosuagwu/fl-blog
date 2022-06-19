<template>
  <LoaderComponent v-if="isFetchingPosts" />
  <div v-else>
    <div class="hero">
      <div class="hero-left">
        <img :src="mainPost.jetpack_featured_media_url" />
      </div>
      <div class="hero-right">
        <div class="content">
          <h6><span class="font-bold">Front-end</span> . 1 Hour Ago</h6>
          <h2 v-html="mainPost.title.rendered"></h2>
          <p v-html="mainPost.excerpt.rendered"></p>
        </div>
        <div class="post-footer">
          <span>{{ this.calculateTime(mainPost.date) }} Min Read</span>
          <router-link :to="mainPost.slug" class="link"
            >Read Full <img alt="" src="@/assets/images/arrow.svg"
          /></router-link>
        </div>
      </div>
    </div>

    <div class="posts-grid">
      <BlogCard
        v-for="post in otherPosts"
        :image="post.jetpack_featured_media_url"
        :title="post.title.rendered"
        :description="post.excerpt.rendered"
        :date="post.date"
        :key="post.id"
        :slug="post.slug"
      />
    </div>
    <PaymentFlutterwaveVue />
  </div>
</template>

<script>
import moment from "moment";
import BlogCard from "../components/BlogCard.vue";
import PaymentFlutterwaveVue from "../components/PaymentFlutterwave.vue";
import LoaderComponent from "../components/LoaderComponent.vue";

export default {
  computed: {
    isFetchingPosts() {
      return this.$store.getters["getIsFetchingPosts"];
    },
    mainPost() {
      return this.$store.getters["mainPost"];
    },
    otherPosts() {
      return this.$store.getters["otherPosts"];
    },
  },
  created() {
    if (this.otherPosts.length > 0) return;
    this.$store.dispatch("fetchPosts");
    console.log(this.$store.state.isFetchingPosts, "!!!!llll");
  },
  methods: {
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
  components: {
    BlogCard,
    PaymentFlutterwaveVue,
    LoaderComponent,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss";
.hero {
  @include container;
  display: flex;
  padding: 10px;
  border: 1px solid #f5f5f5;
  margin-top: 4rem;
  column-gap: 10px;

  &-left {
    max-width: 500px;
    width: 100%;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    h6 {
      font-size: 12px;
    }
    h2 {
      font-size: 22px;
      font-weight: 900;
    }

    p {
      font-size: 14px;
      line-height: 21px;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .post-footer {
    margin-top: 2rem;
  }

  @include break(large) {
    align-items: center;
  }

  @include break(medium) {
    flex-direction: column;
  }
}
</style>
