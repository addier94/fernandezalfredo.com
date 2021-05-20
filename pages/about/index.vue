<template>
  <!-- TODO: improve this text -->
  <section class="mx-6 xl:mx-auto xl:max-w-screen-xl mt-16">
    <p>
      ¡Hola ✋! soy <b>Alfredo Fernandez</b>, Voy a resumir mi historia de como
      llegue a ser desarrollador de Software
    </p>
    <br />
    <p>
      Un año antes de graduarme me compraron mi primer computadora desde ahí
      pasaba tiempo jugando, explorando cosas que tenia por supuesto arruinando
      también era super novato, me acuerdo que cada vez llevaba al técnico para
      sacar su virus o formatear no tenia acceso a internet ni libros porque
      vivíamos en provincia, de ahí me inscribí a instituto para aprender
      técnico en computadora y mecanografia ⌨️ solo seguíamos un programa que se
      llamaba MECAWIN nos enseñaba a escribir, pero yo quería llevármelo a mi
      computadora en USB pero no me dejaban, era obvió que querían que siga
      pagando 🤑 la mensualidad, entonces termine el instituto el colegio
      tambien después me fui a la ciudad 🏙️ Santa Cruz hice mi servicio
      militar(cuartel), de que cumplí eso mi papá pagó 💰 toda la carrera osea
      los 5 años en
      <TheLink url="https://unifranz.edu.bo/">UNIFRANZ</TheLink> para estudiar
      auditoria, 💸 en ese entonces cuando preguntamos sobre informática, 🖥️
      decía que tenían ingeniería de sistemas y que podía cambiarme si no me
      gustase auditoria, entonces probé auditorio conforme pasaban los años me
      ponía infeliz con lo que hacia no me gustaba la carrera quería algo
      relacionado con computadoras, decidí cambiarme de carrera, fui a la
      asesora 👩‍🦰 que nos atendió y ella me dijo esa carrera se va a abrir para
      el siguientes semestre entonces volví el siguiente semestre e así estuve
      semestre tras semestre esperando que se abra y nunca se abrió por último
      esa carrera fue al pedo tiempo ⏲️ perdido dinero al agua me puse a
      trabajar de técnico de computadoras quería aprender más sobre computadoras
      me inscribí a la universidad 🏫
      <TheLink url="https://www.utepsa.edu/v2/">UTEPSA</TheLink>
      para estudiar ingeniería de sistemas con mi propio recurso 💰 porque no
      quería hacerle gastar más a mi familia y así es como me encuentro en este
      maravilloso mundo de la programación que me hace feliz 😆
    </p>

    <section class="mt-6">
      <h2 class="secondary-title pb-3">Experiencia laboral 👨🏼‍💻</h2>
      <Timeline
        message-when-no-items="No hay datos"
        :timeline-items="timelineItems"
        :date-locale="$i18n.locale"
        order="desc"
        class="timeline"
      />
    </section>

    <section class="mt-6 mb-6">
      <h2 class="secondary-title pb-3">
        Skills Tecnológicos & Herramientas 🔧
      </h2>
      <AboutTechSkills />
    </section>
  </section>
</template>

<script>
import AboutTechSkills from '@/components/about/TechSkills'
import TheLink from '@/components/global/TheLink'
export default {
  name: 'About',
  components: { AboutTechSkills, TheLink },
  computed: {
    timelineItems() {
      return [
        {
          from: new Date(2021, 2),
          title: 'Freelancer',
          description: `<b class="font-bold">Desarrollador frontend</b> Hasta la fecha actual me he enfocado haciendo proyectos como freelancer con Nuxt, tailwind y strapi`,
        },
        {
          from: new Date(2020, 1),
          title: 'vue nuxt node laravel',
          description: `<b class="font-bold">Desarrollo Full Stack</b> desarrollando 3 
          aplicaciones en el lado del cliente y servidor con VueJS, Nuxt Node, HTML, SASS, LARAVEL Los cuales puedes encontrar en la pagina de Proyectos`,
        },
      ]
    },
  },
  head() {
    return {
      title: `Sobre mi | ${process.env.APP_TITLE}`,
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
          content: `Sobre mi | ${process.env.APP_TITLE}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: process.env.APP_DESC,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Sobre mi | ${process.env.APP_TITLE}`,
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

<style lang="scss" scoped>
.timeline {
  color: var(--color);
}
</style>
