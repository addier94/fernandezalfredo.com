<template>
  <div>
    <div class="mb-2">
      <div class="flex justify-between items-center">
        <h5 class="font-bold text-3xl leading-5 text-primary">
          Featured Project
        </h5>
        <div class="flex">
          <a target="_blank" href="https://github.com/">
            <SocialGithub class="w-8 h-8 mx-3 cursor-pointer" />
          </a>
          <a href="https://fernandezalfredo.com/" target="_blank">
            <ExternalLink class="w-8 h-8 cursor-pointer" />
          </a>
        </div>
      </div>
      <h6>Project like instagram</h6>
    </div>
    <img
      class="rounded-md"
      src="https://images.unsplash.com/photo-1633114127451-558041183c3b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
      alt="last project"
    />
  </div>
</template>

<script>
export default {
  components: {
    SocialGithub: () => import('@/assets/icons/github.svg?inline'),
    ExternalLink: () => import('@/assets/icons/external-link.svg?inline'),
  },
}
</script>
