import Vue from "vue";
import { Environment } from "./Environment";

class AppConfiguration {
  env: Environment;
  constructor() {
    this.env = new Environment();
  }
}

export const appConfiguration = new AppConfiguration();
