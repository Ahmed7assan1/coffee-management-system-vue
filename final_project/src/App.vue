<template>
    <div>
        <div>
            <Navbar/>
            <div class="pt-20">
                <router-view />
            </div>
        </div>
        <!-- <div>
                    <button class="btn btn-primary m-20">
            Coffee Theme
        </button>

        <button class="btn btn-secoundry m-20">
            Coffee Theme
        </button>
        </div> -->
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
    components:{
        Navbar
    }
};
</script>

<style>

</style>