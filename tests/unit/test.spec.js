import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";

import App from "./../../src/App.vue";
import AddBand from "./../../src/views/AddBand.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);

describe("App.vue", () => {
  it("renders a vue instance", () => {
    const wrapper = shallowMount(App, { localVue });
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});

describe("AddBand.vue", () => {
  it("renders a vue instance", () => {
    const wrapper = shallowMount(AddBand, { localVue });
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("AddBand component contains form", () => {
    const wrapper = shallowMount(AddBand, { localVue });
    expect(wrapper.contains("b-form-stub")).toBe(true);
  });

  it("submit button initialy is disabled", () => {
    const wrapper = shallowMount(AddBand, { localVue });
    expect(wrapper.vm.isFormValid).toBe(false);
  });

  it("when form is filled, submit button is enabled", () => {
    const wrapper = mount(AddBand, { localVue });

    wrapper.vm.form.name = "band name";
    wrapper.vm.form.genre = ["rock"];
    wrapper.vm.form.formed = 1989;

    expect(wrapper.vm.isFormValid).toBe(true);
  });

  it("name field in data properties are updated when user fills name field in form", () => {
    const wrapper = mount(AddBand, { localVue });

    const name = wrapper.find('input[type="text"]');
    name.element.value = "NiceName";
    name.trigger("input");

    const genre = wrapper.find('input[type="checkbox"]');
    genre.setChecked(true);

    const options = wrapper.find("select").findAll("option");
    options.at(1).setSelected();

    expect(wrapper.vm.form.name).toBe("NiceName");
    expect(wrapper.vm.form.genre).toHaveLength(1);
    expect(wrapper.vm.form.formed).toBeGreaterThan(0)
    expect(wrapper.vm.isFormValid).toBe(true);
  });

  // it("checkbox field in data properties are updated when user select band genre", () => {
  //   const wrapper = shallowMount(AddBand, { localVue });
  //   const genre = wrapper.find("b-form-checkbox-stub:nth-of-type(1)");
  //   name.element.value = "NiceName";
  //   // console.log(wrapper.html())
  //   name.trigger("input");
  //   // wrapper.vm.$nextTick();

  //   // expect(wrapper.vm.form.name).toBe("NiceName");
  // });
});
