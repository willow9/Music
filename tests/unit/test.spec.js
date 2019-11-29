/* eslint-disable no-debugger */
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";

import App from "./../../src/App.vue";
import AddBand from "./../../src/views/AddBand.vue";
import BandsList from "./../../src/views/BandsList.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(Vuex);

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

    const name = wrapper.find('input[type="text"]');
    name.element.value = "NiceName";
    name.trigger("input");

    const genre = wrapper.find('input[type="checkbox"]');
    genre.setChecked(true);

    const options = wrapper.find("select").findAll("option");
    options.at(1).setSelected();

    expect(wrapper.vm.form.name).toBe("NiceName");
    expect(wrapper.vm.form.genre).toHaveLength(1);
    expect(wrapper.vm.form.formed).toBeGreaterThan(0);
    expect(wrapper.vm.isFormValid).toBe(true);
  });

  it("preview button toggles preview", () => {
    const wrapper = mount(AddBand, { localVue });

    wrapper
      .findAll("button")
      .filter(node => node.text().match(/Preview/))
      .at(0)
      .trigger("click");

    expect(wrapper.vm.preview).toBe(true);
  });

  it("form has list of years for band creation year selection", () => {
    const wrapper = mount(AddBand, { localVue });
    const options = wrapper.find("select").findAll("option");
    expect(options.length).toBeGreaterThan(1);
  });

  it("vuex action addBand is called after submit button is clicked on filled form", () => {
    const actions = { addBand: jest.fn() };
    const store = new Vuex.Store({ actions });
    const wrapper = mount(AddBand, { store, localVue });

    wrapper.setData({ form: { name: "name", genre: ["some"], formed: 1898 } });
    wrapper
      .findAll("button")
      .filter(node => node.text().match(/Submit/))
      .at(0)
      .trigger("click");
    debugger;
    expect(actions.addBand).toHaveBeenCalled();
  });
});

describe("BandsList.vue", () => {
  it("renders a vue instance", () => {
    const actions = { fetchBands: jest.fn() };
    const getters = {
      allBands: jest.fn(() => {
        return [{ name: "band name" }];
      })
    };
    const store = new Vuex.Store({ actions, getters });
    const wrapper = shallowMount(BandsList, { store, localVue });
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("bands list from vuex store are fetched on component creation", () => {
    const actions = { fetchBands: jest.fn() };
    const getters = {
      allBands: jest.fn(() => {
        return [{ name: "name" }];
      })
    };
    const store = new Vuex.Store({ actions, getters });
    shallowMount(BandsList, { store, localVue });

    expect(getters.allBands).toBeCalled();
  });

  it("renders bands list acording to genre and search filters", () => {
    const actions = { fetchBands: jest.fn() };
    const getters = {
      allBands: jest.fn(() => {
        return [
          { name: "name", genre: ["rock"] },
          { name: "not", genre: ["rock"] },
          { name: "another name", genre: ["none"] }
        ];
      })
    };
    const store = new Vuex.Store({ actions, getters });
    const wrapper = mount(BandsList, { store, localVue });
    wrapper.vm.searchGenre = ["rock"];
    wrapper.vm.search = "name";

    const cards = wrapper.findAll(".card-text");
    const card = cards.at(0).text();

    expect(cards).toHaveLength(1);
    expect(card).toContain("name");
    expect(card).toContain("rock");
  });
});
