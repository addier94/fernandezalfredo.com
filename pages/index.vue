<template>
  <section>
    <section class="pb-10 items-center md:grid md:grid-cols-2 md:gap-4">
      <div>
        <!-- TODO: translate and change this text -->
        <h1 class="text-3xl font-semibold">
          Hola <span class="salute">✋</span>
        </h1>
        <div class="h-2 w-24 bg-primary my-3 rounded" />
        <p>
          Soy Full stack developer aunque ultimamente me apequé mas al front, 🖥️
          Pasé los últimos años trabajando como 'freelancer' , donde perfeccioné
          mi oficio como ingeniero de software.
        </p>
        <br />
        <p>
          Si quieres saber más sobre mí, puedes hacer un tour por esta web o
          seguirme por las redes sociales que dejo aquí bajo 👇👇👇
        </p>
        <div class="mt-6">
          <nuxt-link to="/blog" class="blog-button hover:opacity-75">
            Blog
          </nuxt-link>
          <nuxt-link
            to="/about"
            class="about-button hover:bg-primary hover:text-white"
          >
            Sobre mí
          </nuxt-link>
        </div>
      </div>
      <!-- TODO: translate this text -->
      <div class="image-wrapper">
        <img
          class="image"
          src="https://images.unsplash.com/photo-1618335829737-2228915674e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt="setup desarrollador web valencia"
          loading="lazy"
        />
      </div>
    </section>
    <section class="mt-12 md:grid md:grid-cols-2 md:gap-4">
      <HomeYoutubeVideos :videos="videos" />
      <HomeListPosts :posts="posts" />
    </section>
    <section class="mt-12 text-center">
      Si te gusta mi contenido y quieres apoyarme 💪 puedes invitarme a un ☕️ o
      compartir el contenido
      <div class="flex justify-center mt-4">
        <UiCoffeeWidget />
      </div>
    </section>
  </section>
</template>

<script>
import HomeYoutubeVideos from '@/components/home/YoutubeVideos'
import HomeListPosts from '@/components/home/ListPosts'
import UiCoffeeWidget from '@/components/ui/CoffeeWidget'
export default {
  components: { HomeYoutubeVideos, HomeListPosts, UiCoffeeWidget },
  scrollToTop: true,
  async asyncData({ $content }) {
    const posts = await $content('blog')
      .only(['title', 'slug', 'path', 'image'])
      .sortBy('date', 'desc')
      .limit(3)
      .fetch()

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUl41m8HBifhzM6Dh1V04wqA&maxResults=3&key=${process.env.YOUTUBE_API_KEY}`
    )
    const jsonVideos = await videosResponse.json()
    const videos = jsonVideos.items

    return {
      posts,
      videos,
    }
  },
}
</script>

<style scoped lang="scss">
.blog-button {
  @apply bg-primary px-4 py-2 rounded-md text-xl font-bold text-white mx-2 ml-0;
}

.about-button {
  @apply border border-primary px-4 py-2 rounded-md text-xl font-bold mx-2;
}

.image-wrapper {
  @apply rounded flex justify-center;

  .image {
    @apply rounded w-full h-full;
  }
}

.salute {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}
</style>
