<template>
    <div class="max-w-xl mx-auto mt-10 p-6 bg-base-200 rounded-2xl shadow">

        <h2 class="text-xl font-bold mb-4">
            {{ isEdit ? "Edit Coffee" : "Add Coffee" }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">

            <input v-model="form.title"
                type="text"
                placeholder="Title"
                class="input input-bordered w-full"
                required />

            <textarea v-model="form.description"
                placeholder="Description"
                class="textarea textarea-bordered w-full"></textarea>

            <input v-model="form.image"
                type="text"
                placeholder="Image URL"
                class="input input-bordered w-full"
                required />

            <input v-model="ingredientsInput"
                type="text"
                placeholder="Ingredients (comma separated)"
                class="input input-bordered w-full" />

            <button class="btn btn-primary w-full">
                {{ isEdit ? "Update" : "Add" }}
            </button>

        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: "",
                description: "",
                image: "",
                ingredients: []
            },
            ingredientsInput: "",
            isEdit: false,
            editId: null
        };
    },

    methods: {

        async handleSubmit() {

            this.form.ingredients = this.ingredientsInput
                .split(",")
                .map(i => i.trim())
                .filter(i => i);

            try {

                if (!this.isEdit) {
                    // ADD
                    await fetch("http://localhost:3000/coffees", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(this.form)
                    });

                } else {
                    // EDIT
                    await fetch(`http://localhost:3000/coffees/${this.editId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(this.form)
                    });
                }

                this.resetForm();

                // 🔥 رجوع للجدول
                this.$router.push("/products");

            } catch (err) {
                console.log(err);
            }
        },

        async loadCoffee(id) {
            const res = await fetch(`http://localhost:3000/coffees/${id}`);
            const data = await res.json();

            this.form = data;
            this.ingredientsInput = data.ingredients.join(", ");
            this.isEdit = true;
            this.editId = id;
        },

        resetForm() {
            this.form = {
                title: "",
                description: "",
                image: "",
                ingredients: []
            };
            this.ingredientsInput = "";
            this.isEdit = false;
            this.editId = null;
        }
    },

    mounted() {
        const id = this.$route.query.id;
        if (id) {
            this.loadCoffee(id);
        }
    }
};
</script>