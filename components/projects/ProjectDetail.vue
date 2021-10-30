<template>
  <div
    class="project my-8 relative md:flex md:items-center md:px-20"
    :class="DetailClasses"
  >
    <!-- Show image only mobile -->
    <img class="img-mobile md:hidden" :src="project.image" alt="Project Name" />

    <!-- Show mobile and desktop -->
    <div class="content__detail p-5 md:py-8 md:pr-8 md:pl-0 md:flex-grow">
      <div>
        <h4 class="text-primary">Featured Project</h4>
        <h2 class="mb-6">{{ project.name }}</h2>
        <p class="mb-6 md:bg-primary p-5">
          {{ project.description }}
        </p>
        <ul class="tools">
          <li
            v-for="(tool, index) in project.technologies"
            :key="index"
            class="mr-3"
          >
            {{ tool }}
          </li>
        </ul>

        <div class="inline-flex mt-4 bg-primary py-1 px-2 rounded-sm">
          <a target="_blank" :href="project.githubUrl">
            <SocialGithub class="w-6 h-6 cursor-pointer text-white" />
          </a>
          <a :href="project.demo" target="_blank">
            <ExternalLink class="w-6 h-6 ml-4 cursor-pointer text-white" />
          </a>
        </div>
      </div>
    </div>
    <!-- Show only desktop -->
    <div class="hidden md:block md:-ml-32 md:flex-grow d__img_wrapper">
      <img
        class="w-full object-cover"
        :src="project.image"
        alt="Project Name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  components: {
    SocialGithub: () => import('@/assets/icons/github.svg?inline'),
    ExternalLink: () => import('@/assets/icons/external-link.svg?inline'),
  },
  props: {
    project: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    DetailClasses() {
      return this.$colorMode.preference
    },
  },
}
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .project {
    &::after {
      content: '';
      background-color: rgba(0, 0, 0, 0.7);
      @apply absolute top-0 left-0 w-full h-full;
    }
  }
}
@media (min-width: 768px) {
  .d__img_wrapper {
    @apply relative rounded-xl overflow-hidden;
    &::after {
      content: '';
      background-color: rgba(0, 0, 0, 0.4);
      @apply absolute top-0 left-0 w-full h-full;
    }
  }
}
.img-mobile {
  @apply w-full h-full absolute object-cover;
}
.content__detail {
  text-shadow: 0.5px 0.5px white;
  @apply relative z-10 flex justify-center items-center;

  .tools {
    @apply flex flex-wrap;
  }
}
</style>
