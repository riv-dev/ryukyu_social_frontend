<template>
  <header class="header">
    <md-toolbar>
      <md-avatar class="md-avatar-icon">
        <router-link to="/"><md-icon>home</md-icon></router-link>
      </md-avatar>
      <h2 class="md-title" style="flex: 1;text-align:left">
        <router-link to="/">&nbsp; Tasks Microservice Spec</router-link>
      </h2>
      <md-menu md-size="4" md-direction="bottom left">
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <span>Send a message</span>
          <md-icon>message</md-icon>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    </md-toolbar>
  </header>
</template>
