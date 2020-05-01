export const state = () => ({
  beers: []
})
export const mutations = {
  add (state, beer) {
    const beerAux = {
      title: beer.data().title,
      id: beer.id,
      ibu: beer.data().ibu,
      alcool: beer.data().alcool,
      description: beer.data().description,
      stock: beer.data().stock,
      image: beer.image,
      recipe: beer.recipe,
      recipeValid: beer.recipeValid
    }
    state.beers.push(beerAux)
  },
  delete (state, beerid) {
    const index = state.beers.findIndex(beer => beer.id === beerid)
    state.beers.splice(index, 1)
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
                .child(beer.data().title.toLowerCase())
                .getDownloadURL()
                .then((url) => {
                  const image = url
                  fire.collection('beers')
                    .doc(beer.id)
                    .collection('recipe')
                    .get()
                    .then((recipe) => {
                      if (recipe.docs.length) {
                        recipe.forEach((aux) => {
                          if (aux.exists) {
                            beer.recipe = aux.data()
                            beer.recipeValid = !(beer.recipe.title === beer.recipe.ingredient1 && beer.recipe.title === beer.recipe.ingredient2 && beer.recipe.title === beer.recipe.temperature && beer.recipe.title === beer.recipe.time && beer.recipe.title === beer.recipe.description)
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
                      beer.image = '/beer-bottle.svg'
                      beer.recipeValid = false
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
                      if (recipe.docs.length) {
                        recipe.forEach((aux) => {
                          if (aux.exists) {
                            beer.recipe = aux.data()
                            beer.image = '/beer-bottle.svg'
                            beer.recipeValid = !(beer.recipe.title === beer.recipe.ingredient1 && beer.recipe.title === beer.recipe.ingredient2 && beer.recipe.title === beer.recipe.temperature && beer.recipe.title === beer.recipe.time && beer.recipe.title === beer.recipe.description)
                            commit('add', beer)
                          }
                        })
                      } else {
                        commit('add', beer)
                      }
                    })
                    .catch((error) => {
                      console.log(error)
                      beer.recipeValid = false
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
  },
  deleteBeerServer ({ commit }, beer) {
    this.$fireStore.collection('beers').doc(beer.id).delete()
    commit('delete', beer.id)
  }
}
