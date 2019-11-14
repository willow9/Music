import { shallowMount, config, mount } from '@vue/test-utils';
import AddBand from './../../src/views/AddBand';
import Vue from 'vue';

config.silent = true;
Vue.config.silent = true;

describe('AddBand.vue', () => {
  it('test routes', () => {
    const $route = {
      path: '/some/path'
    };

    const wrapper = shallowMount(AddBand, {
      mocks: {
        $route
      }
    });
    const button = wrapper.find('router-link')
    button.trigger('click')
  
    // console.log( wrapper.vm.$route.path); // /some/path
    wrapper.vm.$nextTick();

    
    expect(window.location.href).toContain(wrapper.vm.$route.path)
  });

 
});
