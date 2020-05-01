export const state = () => ({
  beers: []
})
export const mutations = {
  add (state, beer) {
    const beerAux = {
      title: beer.id,
      ibu: beer.data().ibu,
      alcool: beer.data().alcool,
      description: beer.data().description,
      stock: beer.data().stock,
      image: beer.image,
      recipe: beer.recipe
    }
    state.beers.push(beerAux)
  },
  reset (state) {
    state.beers = []
  }
}
export const getters = {
  get: (state) => {
    return state.beers
  }
}
export const actions = {
  getBeersFromServer ({ commit }) {
    const fire = this.$fireStore
    const storage = this.$fireStorage
    fire.collection('beers').get()
      .then(
        (beers) => {
          beers.docs.forEach((beer) => {
            if (beer.exists) {
              storage
                .ref()
                // .child(beer.data().title)
                .child('onca-bocejando.png')
                .getDownloadURL()
                .then((url) => {
                  const image = url
                  fire.collection('beers')
                    .doc(beer.id)
                    .collection('recipe')
                    .get()
                    .then((recipe) => {
                      if (recipe) {
                        recipe.forEach((aux) => {
                          if (aux.exists) {
                            beer.recipe = aux.data()
                            beer.image = image
                            commit('add', beer)
                          }
                        })
                      } else {
                        commit('add', beer)
                      }
                    }
                    ).catch((error) => {
                      console.log(error)
                      beer.recipe = { title: '', ingredient1: '', ingredient2: '', temperature: '', time: '', description: '' }
                      commit('add', beer)
                    })
                })
                .catch((error) => {
                  console.log(error)
                  fire.collection('beers')
                    .doc(beer.id)
                    .collection('recipe')
                    .get()
                    .then((recipe) => {
                      if (recipe) {
                        recipe.forEach((aux) => {
                          if (aux.exists) {
                            beer.recipe = aux.data()
                            commit('add', beer)
                          }
                        })
                      } else {
                        commit('add', beer)
                      }
                    })
                    .catch((error) => {
                      console.log(error)
                      beer.recipe = { title: '', ingredient1: '', ingredient2: '', temperature: '', time: '', description: '' }
                      commit('add', beer)
                    })
                })
            }
          })
        })
      .catch((error) => {
        console.log(error)
      })
  }
}
