<template>
<div style="color: #1e1e1e;">
  <v-toolbar src="https://media-exp1.licdn.com/dms/image/C4D1BAQF_y8vhr_4YlQ/company-background_10000/0/1623231644809?e=2159024400&v=beta&t=uY6WHPJTLvndrQ-JKuyzY5D__25soWj139fjoRKPhMk" elevation="24" color="toolbarColor" class="pt-4" prominent dense text height="100px">
    <v-col cols="1">
      <v-btn @click="darkMode">
        <v-icon class="mr-2">
          mdi-brightness-4
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="5">
      <v-toolbar-title> Movie Search - Altug Erdem</v-toolbar-title>
    </v-col>
    <v-col cols="4">
      <v-autocomplete :search-input.sync="searchInput" :items="items" dense filled label="Movie Name"></v-autocomplete>
    </v-col>
    <v-col cols="2">
      <v-btn color="primary" @click="fetchMovie">Search</v-btn>
      <v-btn class="ml-2 mt-1 md1 ms-0" :disabled="!searchInput" color="error" @click="clear">
        Clear
        <v-icon right>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </v-col>
  </v-toolbar>

  <v-row>
    <v-template>
      <v-col class="container" cols="12">
        <v-card elevation="12" class="cards" v-for="item in movieList" :key="item.imdbID">
          <v-img class="image-height" :src="`${item.Poster}`"> </v-img>
          <v-card-text>
            <v-row class="card-text mt-2 "> <strong> Name : </strong> {{item.Title}}</v-row>
            <v-row class="card-text mt-6 "> <strong>Type : </strong> {{item.Type}}</v-row>
            <v-row class="card-text mt-6 "> <strong>Year : </strong> {{item.Year}}</v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-template>
  </v-row>
</div>
</template>

<script>
export default {

  data() {
    return {
      loading: false,
      searchInput: "",
      movieList: [],
      items: [],
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      modal: false,
      search: null,
    };
  },

  created() {
    /* Theme starts with dark, user can change it. Movie search starts with "way" because empty displays is not seems good. First request for searching "way". */
    this.$vuetify.theme.dark = true;
    this.searchInput = "way"
    this.fetchMovie()
  },

  watch: {
    /* Want to watch movie list situtation for error handling. */
    movieList() {
      console.log("movieList", this.movieList);
    },

    /* movieList:{
      deep: true,
      handle() {
        console.log("asd", this.movieList);
      }
    }, */
    /* Watching searchInput model for searching dynamically, and add Titles in items array for autocompletion. Used then because request should finish before the push operation. */
    searchInput() {
      console.log("search", this.searchInput)
      this.fetchMovie().then(() => {
        if (this.movieList.length !== 0) {
          for (var i = 0; i < this.movieList.length; i++) {
            this.items.push(this.movieList[i].Title)
          }
        } else this.items = []
      })
    },
  },

  methods: {
    /* theme selection*/
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    /* Where we send a request and filling the movieList array. */
    async fetchMovie() {
      this.loading = true
      fetch(
        `http://www.omdbapi.com/?apikey=c965c562&s=${this.searchInput}&y=2020&type=movie`).then((res) => res.json().then((response) =>
        this.movieList = response.Search,
        this.loading = false,
      )).catch((err) =>
        console.log("error", err),
      )
    },
    /* For better user exerience they can clear search input.*/
    clear() {
      this.items = []
      this.searchInput = ""
    }
  }
}
</script>

<style>
.image-height {
  min-height: 400px;
  max-height: 400px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.cards {
  height: 550px;
  width: 400px;
  margin: 1%;
}

.card-text {
  text-transform: capitalize;
  font-size: 18px;
}

.container::after {
  display: flex;
  flex-wrap: wrap;
}

.row {
  display: block !important;
}
</style>
