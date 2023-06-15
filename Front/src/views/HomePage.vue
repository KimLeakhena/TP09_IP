<template>
  <header>លេខមួយ.com</header>
  <main>
    <div class="sidebar">
      
      <div class="category" v-for="category in categories" :key="category._id">
        <p>{{category.name}}</p>
        <ul>
          <li v-for="item in category?.item" :key="item._id">
            <span @click="onclick(item._id)">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="items">
      <div class="box" v-for="product in products" :key="product._id">
        <div>
          <img src="../assets/1.jpg" />
               {{product.imageUrl }}
        </div>
       
        <h3>{{ product.title }}</h3>
        <p>{{ product.desc }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "homepage",
  data() {
    return {
      categories: [],
      products: []
    };
  },
  methods: {
    async find_with_sub_category(item_id){
      let response_products = await axios.get("http://localhost:3000/item/all"+item_id)
      this.products = []
      response_products.data[0].products.forEach((data) => {
        this.products.push(data)
      })
    }
  },
  async mounted() {
    let response_products = await axios.get(
      "http://localhost:3000//product/all"
    );
    response_products.data.forEach((data) => {
      this.products.push(data);
    });

    let reponse_categories = await axios.get(
      "http://localhost:3000/category/categories-items"
    );
    reponse_categories.data.forEach((data) => {
      this.categories.push(data);
    });

  },
};
</script>



<style>
header {
  width: 100%;
  height: 60px;
  background: #cca0a0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  position: fixed;
  z-index: 999;
}
main {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  top: 80px;
}
main .sidebar {
  padding: 10px;
  height: calc(100vh - 80px);
  width: 200px;
  border: 1px solid black;
  position: fixed;
  top: 50px;
  left: 0;
}
main .sidebar .category {
  margin-bottom: 20px;
}
main .sidebar .category p {
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
main .sidebar .category ul {
  margin-left: 15px;
}
main .sidebar .category ul li {
  cursor: pointer;
}
main .items {
  position: relative;
  left: 180px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: calc(100% - 180px);
}
main .items .box {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 220px;
}
</style>

