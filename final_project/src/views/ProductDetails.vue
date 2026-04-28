<template>
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-2xl shadow">

        <div v-if="loading" class="text-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-else>

            <!-- IMAGE -->
            <div class="flex justify-center mb-6">
                <img 
                    :src="coffee.image"
                    :alt="coffee.title"
                    class="w-64 h-64 object-cover rounded-2xl shadow-md"
                />
            </div>

            <!-- TITLE -->
            <h2 class="text-2xl font-bold text-center mb-4">
                {{ coffee.title }}
            </h2>

            <!-- DESCRIPTION -->
            <p class="text-center text-base-content mb-6">
                {{ coffee.description }}
            </p>

            <!-- INGREDIENTS -->
            <div class="flex flex-wrap justify-center gap-2 mb-6">
                <span 
                    v-for="ing in coffee.ingredients"
                    :key="ing"
                    class="badge badge-primary">
                    {{ ing }}
                </span>
            </div>

            <!-- BACK BUTTON -->
            <div class="flex justify-center">
                <router-link 
                    to="/products"
                    class="btn btn-primary text-white">
                    ← Back to Products
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            coffee: {},
            loading: true
        }
    },

    async mounted() {
        try {
            const id = this.$route.params.id;

            const res = await fetch(`http://localhost:3000/coffees/${id}`);
            const data = await res.json();

            this.coffee = data;

        } catch (err) {
            console.log(err);
        } finally {
            this.loading = false;
        }
    }
}
</script>