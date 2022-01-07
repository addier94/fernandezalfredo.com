<template>
  <div>
    <div class="mb-2">
      <div class="flex justify-between items-center">
        <h5 class="font-bold text-3xl leading-5 text-primary">
          Featured Project
        </h5>
        <div class="flex">
          <a target="_blank" href="https://github.com/addier94/facebolivia">
            <SocialGithub class="w-8 h-8 mx-3 cursor-pointer" />
          </a>
          <a href="https://facebolivia.herokuapp.com/" target="_blank">
            <ExternalLink class="w-8 h-8 cursor-pointer" />
          </a>
        </div>
      </div>
      <h6>Instagram Clone</h6>
    </div>
    <img
      class="rounded-md"
      src="https://res.cloudinary.com/dbsszsws9/image/upload/v1641421518/apps_screenshop/reddecitas_a7ieqw.png"
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
