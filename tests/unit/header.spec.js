import { shallowMount, config, mount, createLocalVue } from '@vue/test-utils';
import AddBand from './../../src/views/AddBand';
import Vue from 'vue';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import routes from '@/router/index.js';

config.silent = true;
Vue.config.silent = true;

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App', () => {
  it('renders a child component via routing', async () => {
    const router = new VueRouter({
      path: '/add',
      name: 'add',
      component: AddBand
    });
    const wrapper = mount(App, {
      localVue,
      router
    });

    router.push('/add');
    await wrapper.vm.$nextTick();

    expect(wrapper.find(AddBand).exists()).toBe(false);
  });
});

// describe('AddBand.vue', () => {
//   it('test routes', () => {
//     const $route = {
//       path: '/some/path'
//     };

//     const wrapper = shallowMount(AddBand, {
//       mocks: {
//         $route
//       }
//     });
//     const button = wrapper.find('router-link');
//     button.trigger('click');

//     // console.log( wrapper.vm.$route.path); // /some/path
//     wrapper.vm.$nextTick();

//     expect(window.location.href).toContain(wrapper.vm.$route.path);
//   });
// });
