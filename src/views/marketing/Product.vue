<template>
  <div class="background-pattern">
    <Header></Header>
    <Hero></Hero>
    <Features></Features>
    <Newsletter></Newsletter>
    <FAQ></FAQ>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/marketing/Header.vue";
import Hero from "@/components/marketing/Hero.vue";
import Features from "@/components/marketing/Features.vue";
import Newsletter from "@/components/marketing/Newsletter.vue";
import FAQ from "@/components/marketing/FAQ.vue";
import Footer from "@/components/marketing/Footer.vue";
export default {
  components: {
    Header,
    Hero,
    Features,
    Newsletter,
    FAQ,
    Footer,
  },
};
</script>
