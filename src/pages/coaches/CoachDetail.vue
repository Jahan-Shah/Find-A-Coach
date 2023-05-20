<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
      isButtonClicked: false,
    };
  },
  methods: {
    onChildLoaded() {
      this.isButtonClicked = true;
    },
    onChildUnmounted() {
      this.isButtonClicked = false;
    },
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return { name: "contact-coach" };
    },
  },
  created() {
    const storedCoach = localStorage.getItem("selectedCoach");
    if (storedCoach) {
      this.selectedCoach = JSON.parse(storedCoach);
    } else {
      this.selectedCoach = this.$store.getters["coaches/coaches"].find(
        (coach) => coach.id === this.id
      );
      localStorage.setItem("selectedCoach", JSON.stringify(this.selectedCoach));
    }
  },
};
</script>

<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <p>{{ description }}</p>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
        <h3>Fee: ${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton v-if="!isButtonClicked" link :to="contactLink">
            Contact
          </BaseButton>
        </header>
        <RouterView
          @child-unmounted="onChildUnmounted"
          @child-loaded="onChildLoaded"
        ></RouterView>
      </BaseCard>
    </section>
  </div>
</template>
