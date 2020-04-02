<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-10">
      <p class="display-3">
        CRUD receip
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          label="Title"
          placeholder="put some beautful name for your brew..."
          outlined
        />
        <v-text-field
          label="IBU"
          outlined
        />
        <v-text-field
          label="% of Alcool"
          outlined
        />
        <v-textarea
          outlined
          name="input-7-4"
          label="Receip"
        />
        <v-btn block color="success" dark>
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
