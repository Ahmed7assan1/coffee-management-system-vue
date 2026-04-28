<template>
  <main class="grid min-h-screen place-items-center bg-base-100 px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">

      <p class="text-base font-semibold text-primary">
        404
      </p>

      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-base-content sm:text-7xl">
        Page not found
      </h1>

      <p class="mt-6 text-lg font-medium text-base-content/70 sm:text-xl">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <div class="mt-10 flex items-center justify-center gap-x-6">

        <router-link
          to="/"
          class="btn btn-primary"
        >
          Go back home
        </router-link>

        <a
          href="#"
          class="text-sm font-semibold text-base-content hover:opacity-70"
        >
          Contact support <span aria-hidden="true">→</span>
        </a>

      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped></style>