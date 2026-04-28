<template>
    <div class="min-h-screen bg-base-100">

        <!-- HERO SECTION -->
        <div class="w-full h-[350px] md:h-[450px] overflow-hidden">

            <img 
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
                alt="Coffee"
                class="w-full h-full object-cover"
            />

        </div>

        <!-- CONTENT -->
        <div class="max-w-5xl mx-auto px-4 py-10 text-center space-y-4">

            <h1 class="text-4xl font-bold text-primary">
                Welcome to Abo7assan Coffee Shop ☕
            </h1>

            <p class="text-base-content max-w-2xl mx-auto">
                Discover the best coffee drinks, explore ingredients, and manage your menu easily.
                This project allows you to add, edit, and explore different types of coffee in a clean and modern interface.
            </p>

            <div class="flex gap-3 justify-center">
                <router-link to="/products" class="btn btn-primary text-white">
                    View Products
                </router-link>

                <router-link to="/crud" class="btn btn-secondary text-white">
                    Add Coffee
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
export default {}
</script>