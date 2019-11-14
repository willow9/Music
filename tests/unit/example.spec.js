import { shallowMount, mount, createLocalVue, config } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import AddBand from '@/views/AddBand.vue';
import BootstrapVue from 'bootstrap-vue';
// import About from '@/views/About.vue';
import FormSubmitter from '@/views/FormSubmitter.vue';
// import Vue from 'vue';

// config.silent = true;
// Vue.config.silent = true;

const localVue = createLocalVue();

// install plugins as normal
localVue.use(BootstrapVue);

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('AddBand.vue', () => {
  // it('page contains b-form', () => {
  //   const wrapper = mount(AddBand, { localVue });
  //   expect(wrapper.contains('b-form')).toBe(true);
  // });

  it('when user enters band name, it appears in preview', () => {
    const wrapper = mount(AddBand, {
      localVue
    });
    const n = wrapper.find('[name]');
    n.element.value = 'you';
    n.trigger('input');
    expect(wrapper.find('[bandName]').text()).toBe('Band name:you');
  });

  it('add band name to data', () => {
    const wrapper = mount(AddBand, {
      localVue
    });
    wrapper.setData({
      form: {
        name: 'Hello'
      }
    });
    expect(wrapper.find('[bandName]').text()).toBe('Band name:Hello');
  });
});

// describe('FormSubmitter', () => {
//   it('reveals a notification when submitted', async () => {
//     const wrapper = shallowMount(FormSubmitter);

//     wrapper.find('[data-username]').setValue('alice');
//     // wrapper.find('form').trigger('submit.prevent');
//     // await wrapper.vm.$nextTick();

//     // expect(wrapper.find('.message').text()).toBe('Thank you for your submission, alice.');
//   });
// });

// describe('About.vue', () => {
//   it('page contains h1', () => {
//     const wrapper = shallowMount(About);
//     expect(wrapper.contains('h1')).toBe(true);

//   });
// });
