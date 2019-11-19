<template>
  <div class="about">
    <div class="centered-content">
      <h1>This is an about page</h1>
      <p>
        tis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus
      </p>
    </div>
  </div>
</template>
<style scoped>
.about {
  height: 100vh;
  /* background: url("https://picsum.photos/1024/683?image=227") no-repeat center center fixed; */
  background: url("https://picsum.photos/4096/2722?image=452") no-repeat center
    center;
  background-size: cover;
}
.centered-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-weight: bold;
}
</style>
