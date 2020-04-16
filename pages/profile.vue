<template>
  <v-row>
    <v-row>
      <v-card
        tile
      >
        <v-img
          height="250"
          width="100%"
          src="/ufsc-aerea.jpg"
        >
          <v-row
            class="fill-height"
          >
            <v-col
              align-self="start"
              class="pa-0"
              cols="12"
            >
              <v-avatar
                class="profile"
                color="grey"
                size="164"
                tile
              >
                <v-img src="/mau-icon.jpg" />
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item
                color="rgba(0, 0, 0, 1)"
                dark
              >
                <v-list-item-title class="title">
                  Maurilio Atila
                </v-list-item-title>
                <v-list-item-subtitle>Informatics Engineer</v-list-item-subtitle>
                <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
              </v-list-item>
              <v-card-actions>
                <!--v-btn>Compartir tu pagina</v-btn-->
                <v-btn to="/recipe" color="purple">
                  Adicionar tu cerveza
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </v-row>
    <v-row class="mt-5">
      <v-col v-for="recipe in recipes" :key="recipe" cols="sm">
        <v-card class="mx-auto" max-width="250">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          />

          <v-card-title>{{ recipe.title }}</v-card-title>

          <v-card-subtitle class="pb-0">
            IBU: {{ recipe.ibu }}
            Alcool: {{ recipe.alcool }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{recipe.description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      recipes: []
    }
  },
  created () {
    this.$fireStore.collection('recipes').get()
      .then((recipes) => {
        recipes.forEach((recipe) => {
          this.recipes.push(recipe.data())
        })
        // console.log(doc.docs[0].exists)
      })
    if (this.$fireAuth.currentUser) {
      this.email = this.$fireAuth.currentUser.email
    }
  },
  methods: {}
}
</script>
