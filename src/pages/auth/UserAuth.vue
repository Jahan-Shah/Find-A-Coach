<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      mode: "login",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      // send http request

      try {
        await this.$store.dispatch(this.checkMode(), actionPayload);
        const redirectUrl = `/${this.$route.query.redirect || "/"}`;
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    checkMode() {
      return this.mode === "login" ? "login" : "signup";
    },
    switchAuth() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    submitButtonCaption() {
      return this.checkMode();
    },
    switchModeCaption() {
      return this.mode === "login" ? "Signup instead" : "Login instead";
    },
  },
};
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog title="Authenticating..." :show="isLoading" fixed>
      <BaseSpinner />
    </base-dialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be atleast 6 characters
          long).
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton @click="switchAuth" type="button" mode="flat">
          {{ switchModeCaption }}
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
