<template>
    <div class="max-w-4xl mx-auto mt-10">

        <!-- ADD BUTTON -->
        <div class="flex justify-between items-center mb-4">

            <!-- FILTERS -->
            <div class="flex gap-3">

                <!-- Search -->
                <input 
                    v-model="search"
                    type="text"
                    placeholder="Search coffee..."
                    class="input input-bordered w-40"
                />

                <!-- Ingredient Filter -->
                <input 
                    v-model="ingredientFilter"
                    type="text"
                    placeholder="Ingredient..."
                    class="input input-bordered w-40"
                />

                <!-- Reset -->
                <button 
                    @click="resetFilters"
                    class="btn btn-outline">
                    Reset
                </button>

            </div>

            <!-- Add Button -->
            <router-link 
                v-if="isLoggedIn"
                to="/crud" 
                class="btn btn-primary text-white">
                Add Coffee
            </router-link>

        </div>

        <!-- TABLE -->
        <div class="shadow-xl rounded-2xl overflow-hidden border border-base-300">

            <div class="relative overflow-x-auto">

                <table class="table w-full">

                    <!-- HEADER -->
                    <thead class="bg-base-200 text-base-content">
                        <tr>
                            <th>Product name</th>
                            <th>Image</th>
                            <th>Ingredients</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>

                    <!-- BODY -->
                    <tbody>

                        <!-- LOADING -->
                        <tr v-if="loading">
                            <td colspan="4" class="text-center py-20">
                                <span class="loading loading-spinner loading-lg text-primary"></span>
                                <p class="mt-2 font-bold">Loading...</p>
                            </td>
                        </tr>

                        <!-- DATA -->
                        <tr v-else 
                            v-for="coffee in filteredCoffees" 
                            :key="coffee.id"
                            class="hover:bg-base-100 transition">

                            <!-- TITLE -->
                            <td class="font-bold">
                                {{ coffee.title }}
                            </td>

                            <!-- IMAGE -->
                            <td>
                                <img 
                                    :src="coffee.image"
                                    class="w-14 h-14 rounded-xl object-cover" 
                                />
                            </td>

                            <!-- INGREDIENTS -->
                            <td>
                                <div class="flex flex-wrap gap-1">
                                    <span 
                                        v-for="ing in coffee.ingredients"
                                        :key="ing"
                                        class="badge badge-ghost badge-sm">
                                        {{ ing }}
                                    </span>
                                </div>
                            </td>

                            <!-- ACTIONS -->
                            <td>
                                <div class="flex justify-center gap-2">

                                    <!-- SHOW -->
                                    <router-link
                                        :to="`/products/${coffee.id}`"
                                        class="btn btn-primary btn-sm text-white">
                                        Show
                                    </router-link>

                                    <!-- EDIT -->
                                    <router-link
                                        v-if="isLoggedIn"
                                        :to="`/crud?id=${coffee.id}`"
                                        class="btn btn-secondary btn-sm text-white">
                                        Edit
                                    </router-link>

                                    <!-- DELETE -->
                                    <button
                                        v-if="isLoggedIn"
                                        @click="handleDelete(coffee.id)"
                                        class="btn btn-accent btn-sm text-white">
                                        Delete
                                    </button>

                                </div>
                            </td>

                        </tr>

                        <!-- EMPTY STATE -->
                        <tr v-if="!loading && filteredCoffees.length === 0">
                            <td colspan="4" class="text-center py-10 text-gray-500">
                                No results found 
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
    data() {
        return {
            coffees: [],
            loading: true,

            //  filters
            search: "",
            ingredientFilter: ""
        };
    },

    computed: {
        isLoggedIn() {
            const auth = useAuthStore();
            return auth.isLoggedIn;
        },

        // filter logic
        filteredCoffees() {
            return this.coffees.filter(coffee => {

                const matchTitle = coffee.title
                    .toLowerCase()
                    .includes(this.search.toLowerCase());

                const matchIngredient = coffee.ingredients.some(ing =>
                    ing.toLowerCase().includes(this.ingredientFilter.toLowerCase())
                );

                return matchTitle && matchIngredient;
            });
        }
    },

    methods: {
        async fetchData() {
            try {
                const res = await fetch("http://localhost:3000/coffees");
                this.coffees = await res.json();
            } catch (err) {
                console.log(err);
            } finally {
                this.loading = false;
            }
        },

        async handleDelete(id) {
            if (!confirm("Are you sure?")) return;

            try {
                await fetch(`http://localhost:3000/coffees/${id}`, {
                    method: "DELETE"
                });

                this.coffees = this.coffees.filter(c => c.id !== id);

            } catch (err) {
                console.log(err);
            }
        },

        //  reset filters
        resetFilters() {
            this.search = "";
            this.ingredientFilter = "";
        }
    },

    mounted() {
        this.fetchData();
    }
};
</script>