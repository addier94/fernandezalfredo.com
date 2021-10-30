<template>
  <section class="mx-6 xl:mx-auto xl:max-w-screen-xl">
    <h1 class="title text-center mt-6">{{ $t('projects.title') }}</h1>
    <!-- <section class="grid col-gap-5 grid-cols-1 pt-8 md:grid-cols-2">
      <ProjectsProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />
    </section> -->
    <section>
      <ProjectsProjectDetail
        v-for="(project, index) in projects2"
        :key="index"
        :project="project"
      />
    </section>
    <p class="text-center">
      {{ $t('projects.showMore') }}
      <TheLink url="https://github.com/addier94">
        {{ $t('projects.githubProfile') }}
      </TheLink>
    </p>
  </section>
</template>

<script>
// import { PROJECTS } from '@/constants/projects'
import { PROJECT2 } from '@/constants/projects2'
import ProjectsProjectDetail from '@/components/projects/ProjectDetail'
// import ProjectsProjectCard from '@/components/projects/ProjectCard'
import TheLink from '@/components/global/TheLink'

export default {
  components: { TheLink, ProjectsProjectDetail },
  computed: {
    // projects() {
    //   return PROJECTS
    // },
    projects2() {
      return PROJECT2
    },
  },
  head() {
    return {
      title: `Mis Proyectos | ${process.env.APP_TITLE}`,
      meta: [
        // TODO: improve descriptions
        {
          hid: 'description',
          name: 'description',
          content: process.env.APP_DESC,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Mis Proyectos | ${process.env.APP_TITLE}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: process.env.APP_DESC,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Mis Proyectos | ${process.env.APP_TITLE}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: process.env.APP_DESC,
        },
      ],
    }
  },
}
</script>
