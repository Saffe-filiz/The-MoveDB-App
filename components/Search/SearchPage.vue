<template>
    <div class="Search-Page">
        <loading v-show="isLoading"></loading>
        <Error v-show="error"></Error>
        <div class="Search-Main-Container" v-if="result">
            <div class="Result-Movie-list">
                <SearchResult :movies="searchresult.results"></SearchResult>
            </div>
        </div>
        </div>
</template>

<script>
    import loading from '../loading.vue';
    import SearchResult from './SearchResult.vue';
    import Error from './Error.vue';
    import {mapState} from 'vuex';

    export default {
        name: 'SearchPage',

        props: ['name'],

        data () {
            return {
                result: false,
                isLoading: true,
            }
        },
        
        created () {
            this.$store.dispatch('searchs', this.name).then(() => {
                    this.isLoading = false;
                    this.result = true;
                })
          
        },

        components: {
            loading,
            SearchResult,
            Error,
        },

        computed: {

            ...mapState([
                'searchresult',
                ]),

            error () {
                return this.searchresult.results == 0
                }
            },
    }

</script>

<style>

.Search-Page {
    position: absolute;
    width: 1300px;
    height: 700px;
    margin: auto;

}


.Result-Movie-list {
    position: relative;
    width: 1100px;
    height: 200px;
    margin: auto;
}


</style>