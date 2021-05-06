<template>
  <section class="md:flex">
    <article class="mb-20 w-full max-w-3xl mx-auto">
      <h1 class="text-4xl">{{ doc.title }}</h1>
      <p class="opacity-50">
        <span>🗓 {{ $d(new Date(doc.date), 'short') }}</span>
        -
        <span>⏱ {{ doc.timeToRead }} {{ $tc('posts.minute', 2) }}</span>
      </p>
      <p class="mt-1">
        ¿Un error 😱 ? Edita con una
        <TheLink :url="urlPullRequest">Pull Request</TheLink>
      </p>
      <div class="mt-4 flex">
        <UiTag
          v-for="(tag, index) in doc.tags"
          :key="index"
          :tag="tag"
          class="mr-4"
        />
      </div>
      <div class="divider" />
      <nuxt-content :document="doc" />
      <BlogFooterBlog :article-name="doc.slug" />
    </article>
  </section>
</template>

<script>
import BlogFooterBlog from '@/components/blog/FooterBlog'
import UiTag from '@/components/ui/Tag'
import TheLink from '@/components/global/TheLink'

export default {
  components: { BlogFooterBlog, UiTag, TheLink },
  async asyncData({ $content, params }) {
    const doc = await $content(`blog/${params.slug}`).fetch()
    return { doc }
  },

  computed: {
    urlPullRequest() {
      return `https://github.com/addier94/fernandezalfredo.com/blob/main/content/blog/${this.doc.slug}.md`
    },
  },
  head() {
    return {
      title: `${this.doc.title} | Alfredo Fernandez 👨🏼‍💻`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.doc.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.doc.title} | Alfredo Fernandez 👨🏼‍💻`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.doc.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.doc.title} | Alfredo Fernandez 👨🏼‍💻`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.doc.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://res.cloudinary.com/de5xzoviz/image/upload/q_68/${this.doc.image}`,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image',
          content: `https://res.cloudinary.com/de5xzoviz/image/upload/q_68/${this.doc.image}`,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.doc.title,
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.divider {
  @apply border-4 border-primary w-16 rounded mt-4 mb-8;
}
</style>
