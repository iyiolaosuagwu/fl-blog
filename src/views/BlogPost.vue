<template>
  <LoaderComponent v-if="isFetchingSinglePost" />
  <div v-else>
    <main class="individual">
      <small class="individual__date"
        >By Ryan Jackson · {{ this.calculateTime(post.date) }} month ago
      </small>
      <h1 class="individual__title">{{ post.title.rendered }}</h1>
      <section
        class="contenct_rendered"
        v-html="post.content.rendered"
      ></section>
    </main>

    <div class="more__article">
      <h2 class="more__article--title">More Articles</h2>
      <div class="posts-grid">
        <BlogCard
          v-for="post in otherPosts.splice(0, 3)"
          :image="post.jetpack_featured_media_url"
          :title="post.title.rendered"
          :description="post.excerpt.rendered"
          :date="post.date"
          :key="post.id"
          :slug="post.slug"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BlogCard from "../components/BlogCard.vue";
import LoaderComponent from "../components/LoaderComponent.vue";

export default {
  name: "BlogPost",
  computed: {
    post() {
      return this.$store.getters["getSinglePost"];
    },
    isFetchingPosts() {
      return this.$store.getters["getIsFetchingPosts"];
    },
    isFetchingSinglePost() {
      return this.$store.getters["getIsFetchingSinglePost"];
    },
    otherPosts() {
      return this.$store.getters["otherPosts"];
    },
  },
  created() {
    this.$store.dispatch("fetchPost", this.$route.params.slug);
    if (this.otherPosts.length > 0) return;
    this.$store.dispatch("fetchPosts");
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
    LoaderComponent,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss";
.individual {
  @include container;
  padding: 10px;
  margin-top: 4rem;
  column-gap: 10px;
  width: 60%;
  overflow: hidden;

  &__date {
    font-size: 12px;
  }

  &__title {
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
  }
}

.more__article {
  @include container;
  margin-top: 5rem;
  &--title {
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
  }

  .posts-grid {
    padding-top: 2rem;
  }
}
</style>
